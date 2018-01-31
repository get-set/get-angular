import * as express from 'express'
import {Server} from "ws";
import * as path from "path";

const app = express();

app.use('/', express.static(path.join(__dirname, '..', 'client')));

app.get('/api', (request, response) => {
    response.send('client 用到的 API')
});

app.get('/api/stock', (request, response) => {
    let result = stocks;
    let queryParams = request.query;
    if (queryParams.name) {
        result = result.filter(stock => stock.name.indexOf(queryParams.name) !== -1)
    }
    response.json(result);
});

app.get('/api/stock/:id', (request, response) => {
    response.json(stocks.find(stock => stock.id == request.params.id));
});

const server = app.listen(8080, 'localhost', () => {
    console.log('Http 服务已经启动，地址是 http://localhost:8080')
});
const subscriptions = new Set<any>();

const wsServer = new Server({port: 8085});

console.log('Websocket 服务已经启动，地址是 ws://localhost:8085');

wsServer.on("connection", websocket => {
    subscriptions.add(websocket);
});
let messageCount = 0;

setInterval(() => {
    subscriptions.forEach(ws => {
        if (ws.readyState === 1) {
            ws.send(JSON.stringify({messageCount: messageCount++}))
        }
    })
}, 2000);

export class Stock {
    constructor(public id: number,
                public name: string,
                public price: number,
                public rating: number,
                public desc: string,
                public categories: Array<string>) {

    }
}

const stocks: Stock[] = [
    new Stock(1, '股票1', 1.23, 3.5, '第1支股票', ['IT', '互联网']),
    new Stock(2, '股票2', 1.24, 3, '第2支股票', ['金融', '互联网']),
    new Stock(3, '股票3', 1.33, 4.5, '第3支股票', ['互联网']),
    new Stock(4, '股票4', 1.63, 3.5, '第4支股票', ['金融']),
    new Stock(5, '股票5', 2.23, 4.5, '第5支股票', ['IT']),
    new Stock(6, '股票6', 1.73, 4, '第6支股票', ['金融', '互联网']),
    new Stock(7, '股票7', 1.29, 5, '第7支股票', ['IT', '金融', '互联网'])
];