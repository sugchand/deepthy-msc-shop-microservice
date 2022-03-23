var express = require("express")
    , morgan = require("morgan")
    , path = require("path")
    , bodyParser = require("body-parser")

    , app = express();


app.use(morgan('combined'));
app.use(morgan("dev", {}));
app.use(bodyParser.json());

//app.use(morgan("dev", {}));
var cart = [];

app.post("/add", function (req, res, next) {
    var obj = req.body;
    console.log("add ");
    console.log("Attempting to add to cart: " + JSON.stringify(req.body));


    //  var obj = JSON.parse(body);

    //       console.log('addToCart id '+id)
    var max = 0;
    var ind = 0;
    //if (cart["" + obj.custId] === undefined)
      //  cart["" + obj.custId] = [];
    //var c = cart["" + obj.custId];
    for (ind = 0; ind < cart.length; ind++)
        if (max < cart[ind].cartid)
            max = cart[ind].cartid;
    var cartid = max + 1;
    var data = {
        "cartid": cartid,
        "productID": obj.productID,
        "name": obj.name,
        "price": obj.price,
        "image": obj.image,
        "quantity": obj.quantity
    };
    console.log(JSON.stringify(data));
    cart.push(data);

    res.status(201);

    res.send("");


});

/* toDO */
app.delete("/cart/items/:id", function (req, res, next) {
    var body = '';
    console.log("Delete item from cart: for custId " + req.url + ' ' +
        req.params.id.toString());
    console.log("delete ");





    res.send(' ');


});


app.get("/cart", function (req, res, next) {


    //var custId = req.params.custId;
    //console.log("getCart" + custId);


    //console.log('custID ' + custId);


    console.log(JSON.stringify(cart, null, 2));

    res.send(JSON.stringify(cart));
    console.log("cart sent");

});


var server = app.listen(process.env.PORT || 3003, function () {
    var port = server.address().port;
    console.log("App now running in %s mode on port %d", app.get("env"), port);
});
