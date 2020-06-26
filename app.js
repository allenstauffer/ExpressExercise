const express = require('express')
const { response } = require('express')
const { request } = require('http')
const app = express()
const port = 300

//Would generally use a databse, but as this is an app just for learning I am going to just have a basic 
var students = [{id:1,name: "Bruce Banner", grades:[1,2,3,4]},{id:2,name: "Clinton Barton", grades:[5,6,7,8]},{id:3,name: "Steve Rogers", grades:[9,10,11,12]},{id:4,name: "Thor Odinson", grades:[13,14,15,16]},{id:5,name: "Tony Stark", grades:[17,18,19,20]}]


app.get('/student', (req, res) => {
    res.send(students)
})


app.get('/student/:studentId', (req, res) => {
    var curId = parseInt(req.params.studentId.trim());
    if(!isNaN(curId))
    {
        for(var i =0; i <students.length; i ++)
        {
            if(curId == students[i].id)
            {
                res.send(students[i]);
                return
            }
        }
    }
    res.send("No Student Found");
})

app.get('/grades/:studentId', (req, res) => {
    var curId = parseInt(req.params.studentId.trim());
    if(!isNaN(curId))
    {
        for(var i =0; i <students.length; i ++)
        {
            if(curId == students[i].id)
            {
                res.send(students[i].grades);
                return
            }
        }
    }
    res.send("No Student Found");
})

app.post('/grades/:studentId', (req, res) => {
    var curId = parseInt(req.params.studentId.trim());
    if(!isNaN(curId))
    {
        for(var i =0; i <students.length; i ++)
        {
            if(curId == students[i].id)
            {
                res.send(students[i].grades);
                return
            }
        }
    }
    res.send("No Student Found");
})

app.post('/grades', (req, res) => {
    if(req.query.studentId == undefined && req.query.grade == undefined)
    {
        res.send("No Student Id or Grade Sent");
    }
    else if(req.query.studentId == undefined)
    {
        res.send("No Student Id Sent");
    }
    else if(req.query.grade == undefined)
    {
        res.send("No Grade Sent");
    }
    //this is where is where it would update the database
    res.send("Success")
})

app.post('/register', (req, res) => {
    if(req.query.username == undefined && req.query.email == undefined)
    {
        res.send("No Username and Email Sent");
    }
    else if(req.query.studentId == undefined)
    {
         res.send("No Student Id Sent");
    }
    else if(req.query.grade == undefined)
    {
        res.send("No Grade Sent");
    }
    //would normally add in an email check to make sure the email is valid.
    //this is where it would write to the database
    res.send("Success")
})






// app.post('/student', (req, res) => {
//     res.send('Student')
// })

var server = app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

module.exports = server