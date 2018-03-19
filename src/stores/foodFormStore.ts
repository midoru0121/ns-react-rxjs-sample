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
            'https://cdn.pixabay.com/photo/2015/10/24/13/25/japanese-1004450_1280.jpg')
    );
    getObservable = () => ( this.observable );

    mutateFoodForm = (name: string, price: number, image: string) => ( this.observable.next(new FoodForm(name, price, image)));

}
