class CalorieTracker {
    constructor() { 
        this._calorieLimit = 2100;
        this._totalCalories = 0; 
        this._meals = [];
        this._workouts = [];

        this._displayCaloriesLimit();
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();
    }

    // Public Methods / API//
    addMeal(meal) {
        this._meals.push(meal);
        this._totalCalories += meal.calories; // add calories
        this._render();
    }

    addWorkout(workout) {
        this._workouts.push(workout);
        this._totalCalories -= workout.calories; // subtract calories
        this._render();
    }

    // Private Methods //
    _displayCaloriesTotal() {
        const totalCaloriesElem = document.getElementById('calories-total') // this is the gain/loss card
        totalCaloriesElem.innerHTML = this._totalCalories;
    }

    _displayCaloriesLimit() {
        const calorieLimitElem = document.getElementById('calories-limit') // this is the gain/loss card
        calorieLimitElem.innerHTML = this._calorieLimit;
    }

    _displayCaloriesConsumed() {
        const caloriesConsumedElem = document.getElementById('calories-consumed');

        // add calories consumed from meals array
        const consumed = this._meals.reduce((total, meal) => total + meal.calories, 0) 

        caloriesConsumedElem.innerHTML = consumed;
    }

    _displayCaloriesBurned() {
        const caloriesBurnedElem = document.getElementById('calories-burned');

        // add calories Burned from meals array
        const burned = this._workouts.reduce((total, workout) => total + workout.calories, 0) 

        caloriesBurnedElem.innerHTML = burned;
    }

    _displayCaloriesRemaining() {
        const caloriesRemainingElem = document.getElementById('calories-remaining');
        const remaining = this._calorieLimit - this._totalCalories;

        caloriesRemainingElem.innerHTML = remaining;

        if (remaining <= 0) {
            caloriesRemainingElem
        }
    }

    _displayCaloriesProgress() {
        const progressElem = document.getElementById('calorie-progress');
        const percentage = (this._totalCalories / this._calorieLimit) * 100;
        const width = Math.min(percentage, 100);

        progressElem.style.width = `${width}%`
    }

    _render() {
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();
    }
}

class Meal {
    constructor(name, calories) {
        this.id = Math.random().toString(16).slice(2); // generate a random id
        this.name = name;
        this.calories = calories;        
    }
}

class Workout {
    constructor(name, calories) {
        this.id = Math.random().toString(16).slice(2); // generate a random id
        this.name = name;
        this.calories = calories;        
    }
}

const tracker = new CalorieTracker();

const breakfast = new Meal('Breakfast', 400);
const lunch = new Meal('lunch', 350);
const dinner = new Meal('dinner', 600);
const run = new Workout('Morning Run', 300);
const run2 = new Workout('Evening Run', 450);
const weights = new Workout('Evening Lift', 80);

tracker.addMeal(breakfast);
tracker.addMeal(lunch);
tracker.addMeal(dinner);
tracker.addWorkout(run);
tracker.addWorkout(weights);
tracker.addWorkout(run2);

console.log(tracker._meals);
console.log(tracker._workouts);
console.log(tracker._totalCalories);