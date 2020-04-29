//-----Variables-----
var express = require('express');
var path = require('path');
var app = express();
var NodeCouchDB = require("node-couchdb")
var couch = new NodeCouchDB({auth:{user:"Teahands", password:"123"}});
var dbname = "zoodata";
var viewGet = "_design/getAllZoo/_view/allZoo";


console.log("Initial Startup...");

app.set ('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));




app.get('/', function(req,res) {
    couch.get(dbname, viewGet).then(function (zooView, headers, status) {
            res.render("home", {zooView: zooView.data.rows});
            }, function (err) {
            res.send(err);
        });
});

app.get('/', function(req,res) {
    couch.get(dbname, viewCount).then(function (zooView2, headers, status) {
        res.render("home", {zooView2: zooView2.data.rows});
    }, function (err) {
        res.send(err);
    });
});

app.get("/zoo/get/:id", function(req,res) {
    var id = req.params.id;
    couch.get(dbname,id).then(function (zooSingle, headers, status) {
    res.render("home", {zooSingle: zooSingle.data.rows});
            }, function (err) {
            res.send(err);
        });
});

app.post("/animal/insert", function(req,res){
    var name = req.body.name;
    var species = req.body.species;
    var diet1 = req.body.diet1;
    var diet2 = req.body.diet2;
    var diet3 = req.body.diet3;
    var avgWeight = req.body.avgWeight;
    var pathToImage = req.body.pathToImage;
    var climate = req.body.climate;
    var area1 = req.body.area1;
    var area2 = req.body.area2;
    var area3 = req.body.area3;

    couch.uniqid().then(function(ids){
        var id = ids[0];

        couch.insert(dbname,{
            _id:id,
            name:name,
            species:species,
            diet:[diet1,diet2,diet3],
            avgWeight:avgWeight,
            pathToImage:pathToImage,
            habitat:{climate,areas:[area1,area2,area3]}
        }).then(
            function (zoo,headers,status) {
                res.redirect("/");
            },
            function (err) {
                res.send(err);
            });
    });
});

app.post("/animal/delete", function(req,res){
    var id = req.body.id;
    var rev = req.body.rev;

   couch.del(dbname,id,rev).then(
         function(zoo,headers,status){
             res.redirect("/");
         },function(err){
             res.send(err);
        });
});

app.post("/animal/update", function(req,res){
    var id = req.body.id;
    var rev = req.body.rev;
    var name = req.body.name;
    var species = req.body.species;
    var diet1 = req.body.diet1;
    var diet2 = req.body.diet2;
    var diet3 = req.body.diet3;
    var avgWeight = req.body.avgWeight;
    var pathToImage = req.body.pathToImage;
    var climate = req.body.climate;
    var area1 = req.body.area1;
    var area2 = req.body.area2;
    var area3 = req.body.area3;

    couch.update(dbname, {
        _id:id,
        _rev:rev,
        name:name,
        species:species,
        diet:[diet1,diet2,diet3],
        avgWeight:avgWeight,
        pathToImage:pathToImage,
        habitat:{climate,areas:[area1,area2,area3]}

}).then(function(zoo,headers,status){
            res.redirect("/");
},function(err){
        res.send(err);
    });

});


app.listen("3000");