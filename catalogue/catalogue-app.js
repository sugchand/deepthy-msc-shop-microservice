var http = require('http'),
    fs = require('fs'),
    url = require('url');
var p = require('path');
var qs = require('querystring');
var mysql = require('mysql');
var root = __dirname;
var headers = [
    "Product Name", "Price", "Picture", "Buy Button"
];


var db = mysql.createConnection({
    host:     'mysql',
    port:     '3306',
    user:     'root',
    password: 'root',
    database: 'shop'
});
var cart = [];
var theuser=null;
var theuserid =null;
var server = http.createServer(function (request, response) {
    var path = url.parse(request.url).pathname;
    var url1 = url.parse(request.url);
    if (request.method == 'POST') {
        switch (path) {
            /* TODO */
            case "/newProduct":
                var body = '';
                console.log("New product");
                request.on('data', function (data) {
                    body += data;
                });

                request.on('end', function () {
                    var obj = JSON.parse(body);
                    console.log(JSON.stringify(obj, null, 2));
                    var query = "SELECT * FROM products where name='"+obj.name+"'";
                    response.writeHead(200, {
                        'Access-Control-Allow-Origin': '*'
                    });

                    db.query(
                        query,
                        [],
                        function(err, rows) {
                            if (err) {
                                response.end('{"error": "1"}');
                                throw err;
                            }
                            if (rows!=null && rows.length>0) {
                                console.log("product in database" );
                                productID = rows[0].productID;
                                var res = {
                                    id: productID
                                }
                                response.end(JSON.stringify(res));

                            }
                            else{
                                query = "INSERT INTO products (name, quantity, price, image)"+
                                        "VALUES(?, ?, ?, ?)";
                                db.query(
                                    query,
                                    [obj.name,obj.quantity,obj.price, "default.jpg"],
                                    function(err, result) {
                                        if (err) {
                                            // 2 response is an sql error
                                            response.end('{"error": "2"}');
                                            throw err;
                                        }
                                        productID = result.insertId;
                                        var obj = {
                                            id: productID
                                        }
                                        response.end(JSON.stringify(obj));

                                    }
                                );
                            }

                        }
                    );


                });

                break;
        } //switch
    }
    else {
        switch (path) {


            case "/getProducts"    :
                console.log("getProducts");
                response.writeHead(200, {
                    'Content-Type': 'text/html',
                    'Access-Control-Allow-Origin': '*'
                });
                var query = "SELECT * FROM products ";


                db.query(
                    query,
                    [],
                    function(err, rows) {
                        if (err) throw err;
                        console.log(JSON.stringify(rows, null, 2));
                        response.end(JSON.stringify(rows));
                        console.log("Products sent");
                    }
                );

                break;
            case "/getProduct"    :
                console.log("getProduct");
                var body="";
                request.on('data', function (data) {
                    body += data;
                });

                request.on('end', function () {
                    var product = JSON.parse(body);
                    response.writeHead(200, {
                        'Content-Type': 'text/html',
                        'Access-Control-Allow-Origin': '*'
                    });
                    console.log(JSON.stringify(product, null, 2));
                    var query = "SELECT * FROM products where productID="+
                        product.id;


                    db.query(
                        query,
                        [],
                        function(err, rows) {
                            if (err) throw err;
                            console.log(JSON.stringify(rows, null, 2));
                            response.end(JSON.stringify(rows[0]));
                            console.log("Products sent");
                        }
                    );

                });
                break;
        }
    }

});

server.listen(3002);
