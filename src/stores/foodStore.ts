import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class Food {
    constructor(private name: string, private price: number, private image: string) {}

    getName = () => (this.name);
    getPrice = () => (this.price);
    getImage = () => (this.image);
}

const initialFoods = [
    new Food('Udon', 4, 'images/udon.jpg'),
    new Food('Soba', 3, 'images/soba.jpg'),
    new Food('Curried Rice', 5, 'images/curry.jpg')
];

export default class FoodStore {
    private foods: Array<Food> = initialFoods;
    private store: BehaviorSubject<Array<Food>> = new BehaviorSubject(this.foods);

    getFoodObservable = () => (this.store);

    addFood = (newFood: Food) => {
        this.foods.push(newFood);
        this.store.next(this.foods);
    }

    removeFood = () => {
        this.foods.pop();
        this.store.next(this.foods);
    }
}
