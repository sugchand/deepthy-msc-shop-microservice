var express = require("express")
    , morgan = require("morgan")
    , path = require("path")
    , bodyParser = require("body-parser")

    , app = express();


app.use(morgan('combined'));
app.use(morgan("dev", {}));
app.use(bodyParser.json());

var productCart = {}

app.post("/add", function (req, res, next) {
    var obj = req.body;
    console.log("add ");
    console.log("Attempting to add to cart: " + JSON.stringify(req.body));


    if (obj.custId == null) {
        console.log('empty customer id, cannot add to a cart');
        res.status(401);
        res.end();
        return
    }
    var cProductCart = productCart[obj.custId];
    if (cProductCart == null) {
        // the cart is not created before
        cProductCart = {};
    }

    var data = cProductCart[obj.productID];
    if (data == null) {
        data = {
            "productID": obj.productID,
            "name": obj.name,
            "price": obj.price,
            "image": obj.image,
            "quantity": parseInt(obj.quantity)
        };
    } else {
        data['quantity'] = parseInt(data['quantity']) + 1;
    }
    cProductCart[obj.productID.toString()] = data;
    productCart[obj.custId.toString()] = cProductCart;

    console.log(JSON.stringify(productCart));
    res.status(201);
    res.send("");

});

/* toDO */
app.delete("/cart/items/:id", function (req, res, next) {
    var body = '';
    var obj = req.body;
    console.log("Delete item from cart: for custId " + req.url + ' ' +
    req.params.id.toString());
    console.log("customer id :" + obj.custId);
    if (obj.custId == null) {
        console.log('empty customer id, cannot delete from the cart');
        res.status(401);
        res.send("");
        return
    }
    var cProductCart = productCart[obj.custId.toString()];
    delete(cProductCart[req.params.id.toString()])
    productCart[obj.custId.toString()] = cProductCart;
    console.log("deleted " + req.params.id.toString() + "for customer" + obj.custId.toString());
    res.send(' ');
});

app.get("/cart", function (req, res, next) {
    var obj = req.body;
    console.log("list");
    console.log("list cart: " + JSON.stringify(req.body));
    if (obj.custId == null) {
        console.log('empty customer id, cannot list the cart');
        res.status(401);
        res.send("");
        return
    }

    var cProductCart = productCart[obj.custId.toString()];
    console.log(JSON.stringify(Object.values(cProductCart), null, 2));

    res.send(JSON.stringify(Object.values(cProductCart), null, 2));
    console.log("cart sent");

});


var server = app.listen(process.env.PORT || 3003, function () {
    var port = server.address().port;
    console.log("App now running in %s mode on port %d", app.get("env"), port);
});
