const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const levelCord = new Schema({
    name: {
        type: String
    },
    course: {
        type: String
    }
});

const studentSchema = new Schema({
    mat_num: {
        type: String
    },
    fullname: {
        type: String
    },
    department: {
        type: String
    },
    level: {
        type: String
    },
    age: {
        type: String
    },
    sex: {
        type: String
    },
    advisor: [levelCord]
});

const students = mongoose.model('Students', studentSchema);
const level_cord = mongoose.model('Level_Coord', levelCord);

module.exports = students, level_cord;