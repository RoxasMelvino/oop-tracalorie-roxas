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
        const progressElem = document.getElementById('calorie-progress')
        const remaining = this._calorieLimit - this._totalCalories;

        caloriesRemainingElem.innerHTML = remaining;

        if (remaining <= 0) {
            caloriesRemainingElem.parentElement.parentElement.classList.remove('bg-light');
            caloriesRemainingElem.parentElement.parentElement.classList.add('bg-danger');
            progressElem.classList.remove('bg-success');
            progressElem.classList.add('bg-danger');
        } else {
            caloriesRemainingElem.parentElement.parentElement.classList.remove('bg-danger');
            caloriesRemainingElem.parentElement.parentElement.classList.add('bg-light');
            progressElem.classList.remove('bg-danger');
            progressElem.classList.add('bg-sucess');
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

class App {
    constructor() {
        this._tracker = new CalorieTracker();

        // event listeners //
        document.getElementById('meal-form').addEventListener('submit', this._newMeal.bind(this));
        document.getElementById('workout-form').addEventListener('submit', this._newWorkout.bind(this));
    }

    _newMeal(e) {
        e.preventDefault();

        // these are the input fields
        const name = document.getElementById('meal-name');
        const calories = document.getElementById('meal-calories');

        // validate inputs
        if (name.value === '' || calories.value === '') {
            alert('Please fill in all fields')
            return;
        }

        const meal = new Meal(name.value, +calories.value) //the + sign will turn this into a number
        this._tracker.addMeal(meal)

        name.value = '';
        calories.value = '';
    }

    _newWorkout(e) {
        e.preventDefault();

        // these are the input fields
        const name = document.getElementById('workout-name');
        const calories = document.getElementById('workout-calories');

        // validate inputs
        if (name.value === '' || calories.value === '') {
            alert('Please fill in all fields')
            return;
        }

        const workout = new Workout(name.value, +calories.value) //the + sign will turn this into a number
        this._tracker.addWorkout(workout)

        name.value = '';
        calories.value = '';
    }
}

const app = new App();