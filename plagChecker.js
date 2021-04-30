const fs = require("fs")
var stringSimilarity = require("string-similarity");
let fileModel = require("./models/file.model")
const util = require('util');

const limit = 0.80

module.exports = async function plagchecker(fileIn) {
    const readFile = util.promisify(fs.readFile)
    let analysis = []
    let result = await readFile("./uploads/" + fileIn.name)
    let someArray = []
    let uploaded_file = result.toString('utf-8');

    let existing_files = await fileModel.find({})
    var regExp = /[a-zA-Z]/g;
    // console.log(existing_files)
    let plagiarised_lines = []
    let total_lines = uploaded_file.length
    for (const file of existing_files) {
        if (file._id != fileIn._id) {
            let result = await readFile("./uploads/" + file.name)
            let uploaded_file_lines = uploaded_file.split("\n");

            let file_lines = result.toString('utf-8').split("\n");

            let sourceLine = 1

            uploaded_file_lines.forEach(line1 => {
                let palgLine = 1
                file_lines.forEach(line2 => {
                    if (line2 != '' && line1 != '' && regExp.test(line1)) {
                        let similarity = stringSimilarity.compareTwoStrings(line1, line2);
                        if (similarity >= limit) {

                            if (!someArray.includes(file._id)) {
                                let simObj = {};
                                simObj.file = file._id
                                simObj.similarities = []
                                analysis.push(simObj)
                                someArray.push(file._id);
                            }

                            index = analysis.findIndex((obj => obj.file == file._id))
                            analysis[index].similarities.push({
                                line1,
                                line2,
                                similarity,
                                sourceLine,
                                palgLine
                            })
                            var plag_line = {
                                number: sourceLine,
                                line: line1
                            }
                            if (!plagiarised_lines.some(el => el.number === plag_line.number)) {
                                plagiarised_lines.push(plag_line)
                            }

                        }
                    }
                    palgLine += 1
                });
                sourceLine += 1

            });
        }

    }
    return [someArray, analysis, plagiarised_lines]

}