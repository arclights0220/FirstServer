var express = require("express")
var mongoose = require("mongoose")
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    console.log("DB접근 성공적")
})
mongoose.connect("mongodb://localhost/student")

var Schema = mongoose.Schema;
var studentSchema = new Schema({
    name: String,
    num: String,
    depart: String
})
var Student = mongoose.model('student', studentSchema)
var tm = new Student({
    name: "염태민",
    num: "10414",
    depart: "소프트웨어과"
})
var cw = new Student({
    name: "박창우",
    num: "10609",
    depart: "소프트웨어과"
})
tm.save()
cw.save()


var app = express();

app.listen(80, () => {
    console.log("서버가 열렸습니다.")
})

app.get('/', (req, res) => {
    Student.find((err, students) => {
        var out = ""
        students.forEach(x => {
            out += `이름 : ${x.name}, 학과: ${x.depart}, 학번: ${x.num} </br>`
        })
        res.send(out)
    })
})