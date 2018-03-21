import * as React from 'react';
import FoodStore, { Food } from './stores/foodStore';
import FoodFormStore, { FoodForm } from './stores/foodFormStore';
import { combineLatest } from 'rxjs/observable/combineLatest';

interface IState {
    foods: Array<Food>;
    foodName: string;
    foodPrice: number;
    foodImage: string;
}

export default class RxComponent extends React.Component<{}, IState> {
    private foodStore = new FoodStore();
    private foodObservable = this.foodStore.getFoodObservable();
    private foodFormStore = new FoodFormStore();
    private foodFormObservable = this.foodFormStore.getObservable();

    constructor(props: {}) {
        super(props);
        this.subscribeState();
    }

    setState(newState: IState) {
        super.setState(newState);
    }

    subscribeState = () => {
        combineLatest(
            this.foodObservable,
            this.foodFormObservable,
            (foods, foodForm) => ({foods: foods, foodForm: foodForm})
        ).subscribe((combined) => {
            this.state ? this.updateState(combined) : this.setInitialState(combined);
        });
    }

    setInitialState = (combined: {foods: Food[], foodForm: FoodForm}) => {
        this.state = this.buildStateVal(combined);
    }

    updateState = (combined: {foods: Food[], foodForm: FoodForm}) => {
        this.setState(this.buildStateVal(combined));
    }

    buildStateVal = (combined: {foods: Food[], foodForm: FoodForm}) => (
        {
            foods: combined.foods,
            foodName: combined.foodForm.getName(),
            foodPrice: combined.foodForm.getPrice(),
            foodImage: combined.foodForm.getImage()
        }
    )

    renderLoading = () => (<span>Loading...</span>);

    renderFoodList = (foods: Array<Food>) => (
        foods.map((food, index) => (
            <li key={food.getName() + index}>
                <img src={food.getImage()} style={{height: '60px', margin: '0 5px'}} />
                <span style={{margin: '0 5px'}}>{food.getName()}</span>
                <span style={{margin: '0 5px'}}>${food.getPrice()}</span>
            </li>)
        )
    )

    renderForm = () => (
        <div>
            <label>Food Name</label>
            <input
                type="text"
                value={this.state.foodName}
                onChange={(e) => {this.foodFormStore.mutateFoodForm(e.currentTarget.value, this.state.foodPrice, this.state.foodImage); }}
            />

            <label>Food Price</label>
            <input
                type="number"
                value={this.state.foodPrice}
                onChange={(e) => {this.foodFormStore.mutateFoodForm(this.state.foodName, Number(e.currentTarget.value), this.state.foodImage); }}
            />

            <label>Food Image</label>
            <input
                type="text"
                value={this.state.foodImage}
                onChange={(e) => {this.foodFormStore.mutateFoodForm(this.state.foodName, this.state.foodPrice, e.currentTarget.value); }}
            />
            <button onClick={() => {this.foodStore.addFood(new Food(this.state.foodName, this.state.foodPrice, this.state.foodImage)); }}>
                Add Food
            </button>
            <button onClick={() => {this.foodStore.removeFood(); }}>
                Remove Food
            </button>
            <ul>
                {this.renderFoodList(this.state.foods)}
            </ul>
        </div>
    )

    render() {
        return this.state ? this.renderForm() : this.renderLoading();
    }

}