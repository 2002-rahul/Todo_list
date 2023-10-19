const express = require("express");
const bodyparser = require("body-parser")

var app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/todo');

const trySchema = new mongoose.Schema({
    name: String
});

const item = mongoose.model("task", trySchema);

app.get("/", function (req, res) {
   /* item.find(({}),function(err,foundItems){
            res.render("list",{ejes : foundItems});
        })*/
    
        item.find({}).then(function (foundItems) {
            res.render("list", { ejes: foundItems});
        })

        .catch(function (err) {
            console.log(err);
        });

});

app.post("/", function (req, res) {
    const itemName = req.body.ele1;
        todo = new item({
            name: itemName
        });
        todo.save();
    res.redirect("/");
});

app.post("/delete",function(req,res){
    const checked = req.body.checkbox1;
    /*item.findByIdAndRemove(checked,function(err){
        if(!err){
            console.log("Deleted")
            res.redirect("/");
        }
    })*/

    item.findByIdAndRemove(checked).then( () => {
            console.log("Deleted");
            res.redirect("/");
    })
    .catch(err => {
        console.log(err);
    })
})

app.listen("8000", function () {
    console.log("Server is Started..!!");
});