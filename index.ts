import express, { Request, Response, NextFunction } from 'express';
import menu from './menu.json';
import { TakeOrders } from './pizzaOrder';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.json(menu);
});

app.post("/orders", (req, res) => {
    const userOrder = new TakeOrders();
    res.json(userOrder.userInput(req.body));
});

app.listen(3000, () => {
    console.log('Started server with 3000');
});​