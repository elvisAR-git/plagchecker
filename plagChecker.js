const fs = require("fs")
var stringSimilarity = require("string-similarity");
let fileModel = require("./models/file.model")
const util = require('util');

// this value represents the minimum similarity the algorithim is allowed to sample a given line at, lower is worse this is about 90% accuracy
const minimum_similarity = 0.90



module.exports = async function plagchecker(fileIn) {
    const readFile = util.promisify(fs.readFile)
    let analysis = []
    let result = await readFile("./uploads/" + fileIn.name)
    let someArray = []
    let uploaded_file = result.toString('utf-8');

    let existing_files = await fileModel.find({})
    // find all existing files to compare! planning to reduce this for performance issues


    var regExp = /[a-zA-Z]/g;
    // above: regex for alphabetics
    // why you ask? so that the lagorithm makes sure that each line it compares has at least one letter :-)


    let plagiarised_lines = []
    let total_lines = uploaded_file.length

    // loop through all existing files
    for (const file of existing_files)
    {
        // ooops! gotta make sure we aren't comparing the file to itself :-)
        if (file._id != fileIn._id)
        {
            let result = await readFile("./uploads/" + file.name)

            // read the target file and reference file from memory :-) and parse them into an array of lines

            let uploaded_file_lines = uploaded_file.split("\n");

            let file_lines = result.toString('utf-8').split("\n");

            let sourceLine = 1

            // loop through each of the target lines comparing them to the refrence lines atr diffrent legths
            uploaded_file_lines.forEach(line1 => {
                let palgLine = 1
                file_lines.forEach(line2 => {
                    // check if neither of the lines are null and that the target line has alphabets
                    if (line2 != '' && line1 != '' && regExp.test(line1))
                    {
                        let similarity = stringSimilarity.compareTwoStrings(line1, line2);
                        if (similarity >= minimum_similarity)
                        {
                            // some jargon to sample the text

                            if (!someArray.includes(file._id))
                            {
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
                            if (!plagiarised_lines.some(el => el.number === plag_line.number))
                            {
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