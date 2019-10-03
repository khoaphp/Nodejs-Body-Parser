var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.set("views", "./views");

//body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000);

var mang = [];

app.get("/dangky", function(req, res){
    var nghe = ["Hoc sinh", "Sinh Vien", "Khac"];
    res.render("dangky", {job:nghe});
});

app.post("/dangky", function(req, res){
    var kq = true;

    if( req.body.hoten && req.body.nghenghiep && req.body.gender ){

        var dongy = 0;
        if(req.body.dongy){
            dongy = 1;
        }

        mang.push(
            new SinhVien(
                req.body.hoten,
                req.body.nghenghiep,
                req.body.gender,
                dongy
            )
        );

    }else{
        kq = false;
    }

    var kq = new KQ(kq, mang);
    res.json(kq);
});

function KQ(add, list){
    this.ADD = add;
    this.LIST = list;
}

function SinhVien(hoten, nghenghiep, gioitinh, dongy){
    this.HOTEN = hoten;
    this.NGHENGHIEP = nghenghiep;
    this.GIOITINH = gioitinh;
    this.DONGY = dongy;
}





app.get("/", function(req, res){
    res.render("trangchu");
});

app.post("/", function(req, res){
   var un = req.body.username;
   var job = req.body.job;
   var it = req.body.intro;
   var hid = req.body.chayngaydi;

   var ok = true;
   if(req.body.OK){
    ok = true;
   }else{
    ok = false;
   }

   res.send(un + " " + job + " " + it + " " + ok + " " + hid);
});
