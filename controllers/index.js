const Students = require('../models/Student');
const textValidator = require('password-validator');
const validators = require('validator');

let errors = [];

exports.getIndex = (req, res)=>{
    res.render('index',{
        contentTitle: 'Insert new student'
    });
}

exports.postAddStudent = (req, res)=>{
    const {mat_num, fullname, department, level, age, sex} = req.body;

    if(!mat_num || !fullname || !department || !level || !age || !sex){
        errors.push({msg: 'All fields are required'});
    }

    const mat_numSchema = new textValidator();
    mat_numSchema
        .has('/');

    if(mat_numSchema.validate(mat_num) != true){
        errors.push({msg: "Matriculation number must be separated with '/'"})
    }

    // if(validators.isInt(age) != true){
    //     errors.push({msg: 'Age must be a number'});
    // }

    // if(validators.isInt(level) != true){
    //     errors.push({msg: 'Level must be a number'});
    // }

    if(req.body._id == null){
        if(errors.length>0){
            res.render('index',{
                errors,
                mat_num,
                fullname,
                department,
                level,
                age,
                contentTitle: 'Insert new student'
            });
        }else{
            Students.findOne({'mat_num':mat_num})
                .then(student =>{
                    if(student){
                        errors.push({msg: 'Matriculation number already exist!!'});
                        res.render('index',{
                            errors,
                            mat_num,
                            fullname,
                            department,
                            level,
                            age,
                            contentTitle: 'Insert new student'
                        });
                    }else{
                        const newStudent = new Students({
                            mat_num,
                            fullname,
                            department,
                            level,
                            age,
                            sex
                        });
                        newStudent.advisor.push({name: 'Dr. Mary Jane Sule', course: 'CSC 204'});
                        // saving data
                        newStudent.save()
                            .then(student =>{
                                res.redirect('/students');
                            })
                            .catch(err =>{
                                console.log('Error while saving student ',err);
                            })
                    }
                })
                .catch(err =>{
                    console.log('Error finding matnumber in dbase',err);
                })
        }
    }else{
        updateStudent(req, res);
    }
}

function updateStudent(req, res){
    const id = req.body._id;
    Students.findByIdAndUpdate({_id: id}, req.body, {new: true, useFindAndModify: false}, (err, student)=>{
        if(err){
            console.log('An error occured while updating student  ', err);
        }else{
            res.redirect('/students');
        }
    })
}

exports.getStudents = (req, res)=>{
    Students.find()
        .then(student =>{
            res.render('students',{
                student,
                contentTitle: 'Students'
            });
        })
        .catch(err =>{
            console.log('An error occured while finding all students  ', err);
        });
}

exports.getStudentById = (req, res)=>{
    Students.findById(req.params.id, (err, student)=>{
        if(err){
            errors.push({msg:'Error fetching student data', err});
            res.render('students',{
                errors,
                contentTitle: 'Students'
            });
        }else{
            res.render('studentById',{
                student,
                contentTitle: 'update'
            });
        }
    });
}


exports.deleteStudent = (req, res)=>{
    Students.findByIdAndRemove(req.params.id, (err, student)=>{
        if(err){
            console.log('Error occured while deleting student  ', err);
        }else{
            res.redirect('/students');
        }
    })
}