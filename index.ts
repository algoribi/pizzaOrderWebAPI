import express, { Request, Response, NextFunction } from 'express';
import menu from './menu.json';
import { TakeOrders } from './pizzaOrder';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.send(menu);
});

app.post("/orders", (req, res) => {
    try {
        const userOrder = new TakeOrders();
        const result = userOrder.userInput(req.body);
        if(result === "error") throw "잘못된 주문입니다!";
        res.send(result);
    } catch(err) {
        res.status(415).send({ error : `415 error : ${err}` }); // 415 : 지원되지 않는 유형
    }
});

app.listen(3000, () => {
    console.log('Started server with 3000...');
});​