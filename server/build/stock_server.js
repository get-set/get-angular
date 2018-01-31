"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var ws_1 = require("ws");
var path = require("path");
var app = express();
app.use('/', express.static(path.join(__dirname, '..', 'client')));
app.get('/api', function (request, response) {
    response.send('client 用到的 API');
});
app.get('/api/stock', function (request, response) {
    var result = stocks;
    var queryParams = request.query;
    if (queryParams.name) {
        result = result.filter(function (stock) { return stock.name.indexOf(queryParams.name) !== -1; });
    }
    response.json(result);
});
app.get('/api/stock/:id', function (request, response) {
    response.json(stocks.find(function (stock) { return stock.id == request.params.id; }));
});
var server = app.listen(8080, 'localhost', function () {
    console.log('Http 服务已经启动，地址是 http://localhost:8080');
});
var subscriptions = new Set();
var wsServer = new ws_1.Server({ port: 8085 });
console.log('Websocket 服务已经启动，地址是 ws://localhost:8085');
wsServer.on("connection", function (websocket) {
    subscriptions.add(websocket);
});
var messageCount = 0;
setInterval(function () {
    subscriptions.forEach(function (ws) {
        if (ws.readyState === 1) {
            ws.send(JSON.stringify({ messageCount: messageCount++ }));
        }
    });
}, 2000);
var Stock = /** @class */ (function () {
    function Stock(id, name, price, rating, desc, categories) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
        this.categories = categories;
    }
    return Stock;
}());
exports.Stock = Stock;
var stocks = [
    new Stock(1, '股票1', 1.23, 3.5, '第1支股票', ['IT', '互联网']),
    new Stock(2, '股票2', 1.24, 3, '第2支股票', ['金融', '互联网']),
    new Stock(3, '股票3', 1.33, 4.5, '第3支股票', ['互联网']),
    new Stock(4, '股票4', 1.63, 3.5, '第4支股票', ['金融']),
    new Stock(5, '股票5', 2.23, 4.5, '第5支股票', ['IT']),
    new Stock(6, '股票6', 1.73, 4, '第6支股票', ['金融', '互联网']),
    new Stock(7, '股票7', 1.29, 5, '第7支股票', ['IT', '金融', '互联网'])
];
