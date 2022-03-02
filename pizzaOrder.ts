import menuJson from './menu.json';

class TakeOrders {
    private orders = new Order();

    userInput(userOrder: {name : string, orders : string[]}) {
        const regexr = /^[가-힣|0-9]{1,}$/;
        const regexr2 = /^[가-힣|0-9]{1,}[(](\s*[가-힣|0-9]{1,}\s*,)*\s*[가-힣|0-9]{1,}\s*[)]$/;
        
        for (let idx in userOrder.orders) {
            if ((!regexr.test(userOrder.orders[idx]) && !regexr2.test(userOrder.orders[idx]))) { // 정규식에 위배되는 입력
                return this.inputGuidePrint();
            } else {
                let reg = userOrder.orders[idx].match(/[가-힣|0-9]{1,}/g);
                if (reg === null) {
                    return this.inputGuidePrint();
                } else {
                    if (!this.orders.addOrder(reg)) {
                        return this.inputGuidePrint();
                    }
                }
            }
        }
        
        return JSON.stringify(this.orders);
    }

    inputGuidePrint() {
        return "error";
    }

    checkFalse(inputData: string) {
        return inputData.toLowerCase() === "false";
    }
}

class Order {
    userPizzaOrders: PizzaMenu[] = [];
    userDrinkOrders: Menu[] = [];
    totalPrice: number = 0;

    addOrder(userInput: RegExpMatchArray) {
        let pizzaCategory: boolean = false;
        let pizza = new PizzaMenu("", 0, 0);

        for (let idx in userInput) {
            if (idx === "0") {
                let pizzaMenu = this.IsPizza(userInput[idx]);
                let drinkMenu = this.IsDrink(userInput[idx]);
                if (!this.IsNotFound(pizzaMenu.name)) {
                    pizzaCategory = true;
                    pizza = new PizzaMenu(pizzaMenu.name, pizzaMenu.productCode, pizzaMenu.price);
                } else if (!this.IsNotFound(drinkMenu.name)) {
                    this.userDrinkOrders.push(new Menu(drinkMenu.name, drinkMenu.productCode, drinkMenu.price));
                } else {
                    return false;
                }
            } else {
                let toppingMenu = this.IsTopping(userInput[idx]);
                if (!pizzaCategory || this.IsNotFound(toppingMenu.name) || !pizza.IsSameTopping(toppingMenu)) {
                    return false;
                } else {
                    pizza.toppings.push(new Menu(toppingMenu.name, toppingMenu.productCode, toppingMenu.price));
                    pizza.price += toppingMenu.price;
                }
            }
        }

        if (pizzaCategory) {
            this.userPizzaOrders.push(pizza);
            this.totalPrice += pizza.price;
        } else {
            this.totalPrice += this.userDrinkOrders[this.userDrinkOrders.length - 1].price;
        }

        return true;
    }

    IsPizza(input: string) {
        for (let pizza of menuJson.pizza) {
            if (pizza.name === input || pizza.productCode.toString() === input) {
                return pizza;
            }
        }
        return { name: "not found", productCode: 0, price: 0 };
    }
    
    IsDrink(input: string) {
        for (let drink of menuJson.drink) {
            if (drink.name === input || drink.productCode.toString() === input) {
                return drink;
            }
        }
        return { name: "not found", productCode: 0, price: 0 };
    }
    
    IsTopping(input: string) {
        for (let topping of menuJson.topping) {
            if (topping.name === input || topping.productCode.toString() === input) {
                return topping;
            }
        }
        return { name: "not found", productCode: 0, price: 0 };
    }
    
    IsNotFound(input: string) {
        return input === "not found";
    }
}

class Menu {
    name : string;
    productCode : number;
    price: number;

    constructor(name: string, productCode: number, price: number) {
        this.name = name;
        this.productCode = productCode;
        this.price = price;
    }
}

class PizzaMenu extends Menu {
    toppings: Menu[] = [];
    
    constructor(name: string, productCode: number, price: number) {
        super(name, productCode, price);
    }

    IsSameTopping(topping : { name: string, productCode: number, price: number }) { 
        for (let tp of this.toppings) {
            if (tp.name === topping.name) {
                return false;
            }
        }
        
        return true;
    }
}

export {
    TakeOrders
}