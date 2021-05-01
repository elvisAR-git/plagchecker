const {
    ObjectId
} = require("bson")
let mongoose = require("mongoose")

let fileSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    unique: {
        type: Number,
        required: true
    },
    relations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
        required: false
    }],
    dump: {
        type: Object,
        required: true
    },
    report: {
        type: Object,
        required: false,
        default: {}
    },
    plagiarised_lines: [{
        type: Object,
        required: false
    }],
    total: {
        type: Number,
        require: false,
        default: 0
    }

})

module.exports = mongoose.model('File', fileSchema)