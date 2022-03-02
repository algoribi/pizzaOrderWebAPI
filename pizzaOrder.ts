import menuJson from './menu.json';

type MenuItem = { name: string, productCode: number, price: number, category: "pizza" | "drink" | "topping"};
function buildMenu() {
    const menu: { [key: string]: MenuItem} = {};
    const addItem = (item: {name: string, price: number, productCode: number}, category: "pizza" | "drink" | "topping") => {
        
        const menuItem: MenuItem = { name: item.name, price: item.price, productCode: item.productCode, category }
        menu[item.name] = menuItem;
        menu[item.productCode.toString()] = menuItem;
    }

    for(const category in menuJson) {
        if(category === "pizza") {
            for(const item of menuJson[category]) {
                addItem(item, category);
            }
        } else if(category === "drink") {
            for(const item of menuJson[category]) {
                addItem(item, category);
            }
        } else if(category === "topping") {
            for(const item of menuJson[category]) {
                addItem(item, category);
            }
        } else {
            throw new Error("invalid menu")
        }
    }
    
    return menu;
}

const pizzaMenu = buildMenu();


class PizzaOrder {
    makeOrder(userOrder: { orders : string[]}): IMenu[] {
        const regexr = /^([가-힣0-9]+)(?:\(\s*([가-힣0-9\s,]+)\s*\))?$/;
        const orders: IMenu[] = [];
        
        for (const order of userOrder.orders) {
            const regResult = regexr.exec(order);
            if (regResult) {
                const primary = regResult["1"];
                const secondary = regResult["2"];

                const primaryMenu = pizzaMenu[primary];
                if (!primaryMenu) {
                    throw new Error(`${primary} is not menu words`);
                }

                const toppings = secondary 
                    ? secondary.split(",").map(s => s.trim())
                    : undefined;
                
                const menuInstance = this.toMenuInstance(primaryMenu, toppings);
                orders.push(menuInstance);
            }
        }
        return orders;
    }

    toMenuInstance(src: MenuItem, toppings?: string[]): IMenu {
        if (src.category === "pizza") {
            return new Pizza(src.name, src.productCode, src.price, toppings);
        } else if (src.category === "drink") {
            if (toppings) {
                throw new Error("invalid topping");
            }
            return new Drink(src.name, src.productCode, src.price);
        } else if (src.category === "topping") {
            if (toppings) {
                throw new Error("invalid topping");
            }
            return new Topping(src.name, src.productCode, src.price);
        } else {
            throw new Error(`${src.category} is invalid category`);
        }
    }

    calcPrice(menu: IMenu[]) {
        return menu.reduce((prev, cur) => prev + cur.getPrice(), 0);
    }
}


interface IMenu {
    name : string;
    productCode : number;
    price: number;

    getPrice(): number;
}

class Drink implements IMenu {
    readonly name : string;
    readonly productCode : number;
    readonly price: number;

    constructor(name: string, productCode: number, price: number) {
        this.name = name;
        this.productCode = productCode;
        this.price = price;
    }

    getPrice() {
        return this.price;
    }
}

class Topping implements IMenu {
    readonly name : string;
    readonly productCode : number;
    readonly price: number;

    constructor(name: string, productCode: number, price: number) {
        this.name = name;
        this.productCode = productCode;
        this.price = price;
    }

    getPrice(): number {
        throw new Error("invalid");
    }
}


class Pizza implements IMenu {
    readonly name : string;
    readonly productCode : number;
    readonly price: number;
    readonly toppings: Topping[];
    
    constructor(name: string, productCode: number, price: number, toppings?: string[]) {
        this.name = name;
        this.productCode = productCode;
        this.price = price;
        this.toppings = toppings ? toppings.map((t) => {
            const tp = pizzaMenu[t];
            if (!tp) { throw new Error(`invalid topping ${t}`); }
            return new Topping(tp.name, tp.productCode, tp.price);
        }) : [];
    }

    getPrice() {
        return this.price + this.toppings.reduce((prev, cur) => (prev + cur.price), 0);
    }
}

export {
    PizzaOrder as TakeOrders
}