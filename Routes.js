const express = require("express");
var router = express.Router();
const mongoose = require('mongoose')
const fileModel = require('./models/file.model');
const plagChecker = require("./plagChecker");
const fs = require('fs')

mongoose.connect("mongodb+srv://root:pOb65aiHpnDKH3so@cluster0.h85gf.mongodb.net/test?retryWrites=true&w=majority")

let db = mongoose.connection

// handle database connections
db.once('open', () => {
  console.log("Connected to Database")
})
db.on('error', (err) => {
  console.log(err)
})




router.get("", (req, res) => {
  res.render("index");
});


router.post("", async (req, res) => {

  var files = []
  let records = await fileModel.find({})

  req.files.forEach(async file => {

    let match = false
    let matchRecord = {}
    records.forEach(r => {
      if (r.dump.originalname === file.originalname && r.dump.size === file.size)
      {
        match = true
        matchRecord = r
        return
      }
    });

    if (!match)
    {

      let d = fs.readFileSync("./uploads/" + file.filename)

      let f = new fileModel()
      f.name = file.filename
      f.size = file.size
      f.dump = file
      files.push({
        id: f._id,
        file,
        data: d.toString("utf-8").split("\n")
      })
      let sims = await plagChecker(f)

      f.relations = sims[0]
      f.total = d.toString("utf-8").split("\n").length
      f.report = {
        report: sims[1]
      }
      f.plagiarised_lines = sims[2]

      f.unique = 100 - ((sims[2].length * 100) / d.toString("utf-8").split("\n").length)
      f.save((err) => {
        if (err)
          throw err
      })
    } else
    {
      let d = fs.readFileSync("./uploads/" + file.filename)

      fs.rmSync("./uploads/" + file.filename)

      let f = matchRecord

      files.push({
        id: f._id,
        file,
        data: d.toString("utf-8").split("\n")
      })

    }
  });
  let payload = {
    source_files: files
  }
  console.log("responded")
  res.render("plagShow", payload)

})


router.get("/fetch/:id", async (req, res) => {
  console.log(req.params.id)
  let file = await fileModel.findOne({
    _id: req.params.id
  }).populate("relations")
  if (file)
  {
    res.setHeader("Content-type", "application/json")
    res.send({ isError: false, message: "success", file: file })
  } else
  {
    res.setHeader("Content-type", "application/json")
    res.send({ isError: true, message: "processing, please wait", file: null })
  }
})


router.get("/compare/:target_file/:reference_file", async (req, res) => {
  let t_file = await fileModel.findOne({ _id: req.params.target_file }).populate("relations")
  let r_file = await fileModel.findOne({ _id: req.params.reference_file }).populate("relations")
  let payload = {
    target_file: t_file,
    reference_file: r_file
  }
  res.render("compare", payload)
})


router.get("/report/:target_file/:reference_file", async (req, res) => {
  let t_file = await fileModel.findOne({ _id: req.params.target_file }).populate("relations")
  let r_file = await fileModel.findOne({ _id: req.params.reference_file }).populate("relations")

  let reference_file_raw = fs.readFileSync("./uploads/" + r_file.name).toString("utf-8").split("\n")
  let target_file_raw = fs.readFileSync("./uploads/" + t_file.name).toString("utf-8").split("\n")

  t_file.report.report.forEach(report_ => {
    if (report_.file == req.params.reference_file)
    {
      console.log("found")
      res.send({ report: report_, target_file: t_file, reference_file: r_file, reference_file_raw, target_file_raw })
      return
    }
  });
})

module.exports = router;
