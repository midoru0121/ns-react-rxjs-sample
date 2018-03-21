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
    private store: BehaviorSubject<Array<Food>> = new BehaviorSubject(initialFoods);

    getFoodObservable = () => (this.store);

    addFood = (newFood: Food) => {
        const currentFoods = this.store.getValue();
        this.store.next(currentFoods.concat(newFood));
    }

    removeFood = () => {
        const currentFoods = this.store.getValue();
        this.store.next(currentFoods.slice(0, currentFoods.length - 1));
    }
}
