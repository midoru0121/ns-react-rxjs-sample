import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class FoodForm {

    constructor(private name: string, private price: number, private image: string) {}

    getName = () => (this.name);
    getPrice = () => (this.price);
    getImage = () => (this.image);
}

export default class FoodFormStore {
    private observable = new BehaviorSubject<FoodForm>(
        new FoodForm(
            'katsudon',
            6,
            'images/katsudon.jpg')
    );
    getObservable = () => ( this.observable );

    mutateFoodForm = (name: string, price: number, image: string) => ( this.observable.next(new FoodForm(name, price, image)));

}
