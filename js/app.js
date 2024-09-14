class CalorieTracker {
    constructor() { 
        this._calorieLimit = 2000;
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
        this._displayNewMeal(meal);
        this._render();
    }

    addWorkout(workout) {
        this._workouts.push(workout);
        this._totalCalories -= workout.calories; // subtract calories
        this._displayNewWorkout(workout);
        this._render();
    }

    removeMeal(id) {
        const index = this._meals.findIndex((meal) => meal.id === id);

        if (index !== -1) {
            const meal = this._meals[index];
            this._totalCalories -= meal.calories;
            this._meals.splice(index, 1);
            this._render();
        }
    }

    removeWorkout(id) {
        const index = this._workouts.findIndex((workout) => workout.id === id);

        if (index !== -1) {
            const workout = this._workouts[index];
            this._totalCalories += workout.calories;
            this._workouts.splice(index, 1);
            this._render();
        }
    }

    resetDay() {
        this._totalCalories = 0; 
        this._meals = [];
        this._workouts = [];

        this._render();
    }

    setLimit(limit) {
        this._calorieLimit = limit;
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
    
    _displayNewMeal(meal) {
        const mealsElem = document.getElementById('meal-items');
        const mealElem = document.createElement('div');
        
        mealElem.classList.add('card', 'my-2');
        mealElem.setAttribute('data-id', meal.id);
        mealElem.innerHTML = `
            <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${meal.name}</h4>
                  <div
                    class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${meal.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
            </div>
        `;

        mealsElem.appendChild(mealElem);        
    }

    _displayNewWorkout(workout) {
        const workoutsElem = document.getElementById('workout-items');
        const workoutElem = document.createElement('div');

        workoutElem.classList.add('card', 'my-2');
        workoutElem.setAttribute('data-id', workout.id);
        workoutElem.innerHTML = `
            <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${workout.name}</h4>
                  <div
                    class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${workout.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
        `;

        workoutsElem.appendChild(workoutElem);
    }

    _render() {
        this._displayCaloriesLimit();
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
        this.id = Math.random().toString(16).slice(2);
        this.name = name;
        this.calories = calories;        
    }
}

class Storage {
    
}

class App {
    constructor() {
        this._tracker = new CalorieTracker();

        // event listeners //
        document.getElementById('meal-form').addEventListener('submit', this._newItem.bind(this, 'meal'));  
        document.getElementById('workout-form').addEventListener('submit', this._newItem.bind(this, 'workout'));
        document.getElementById('meal-items').addEventListener('click', this._removeItem.bind(this, 'meal'));
        document.getElementById('workout-items').addEventListener('click', this._removeItem.bind(this, 'workout'));
        document.getElementById('filter-meals').addEventListener('input', this._filterItems.bind(this, 'meal'));
        document.getElementById('filter-workouts').addEventListener('input', this._filterItems.bind(this, 'workout'));
        document.getElementById('reset').addEventListener('click', this._reset.bind(this));
        document.getElementById('limit-form').addEventListener('submit', this._setLimit.bind(this));
    }

    _newItem(type, e) {
        e.preventDefault();

        // these are the input fields
        const name = document.getElementById(`${type}-name`);
        const calories = document.getElementById(`${type}-calories`);

        // make sure both inputs are filled in
        if (name.value === '' || calories.value === '') {
            alert('Please fill in all fields')
            return;
        }

        if (type === 'meal') {
            const meal = new Meal(name.value, +calories.value) //the + sign will turn this into a number
            this._tracker.addMeal(meal);
        } else {
            const workout = new Workout(name.value, +calories.value) 
            this._tracker.addWorkout(workout)
        }

        name.value = '';
        calories.value = '';

        const collapseItem = document.getElementById(`collapse-${type}`);
        const bsCollapse = new bootstrap.Collapse(collapseItem, {toggle: true});
    }

    _removeItem(type, e) {
        if (e.target.classList.contains('delete') || e.target.classList.contains('fa-xmark')) {
            if(confirm('Are you sure?')) {
                const id = e.target.closest('.card').getAttribute('data-id');
                
                type === 'meal' 
                ? this._tracker.removeMeal(id) 
                : this._tracker.removeWorkout(id);

                e.target.closest('.card').remove();
            }
        }
    }

    _filterItems(type, e) {
        const text = e.target.value.toLowerCase();
        const items = document.querySelectorAll(`#${type}-items h4`);

        items.forEach(item => {
            const itemName = item.textContent.toLowerCase();
            
            if (itemName.indexOf(text) !== -1) {
                item.closest('.card').style.display = "block";
            } else {
                item.closest('.card').style.display = "none";
            }
        })
    }

    _reset() {
        if (confirm('Are you sure?')) {
            this._tracker.resetDay();

            document.getElementById('meal-items').innerHTML = '';
            document.getElementById('workout-items').innerHTML = '';
            document.getElementById('filter-meals').value = '';
            document.getElementById('filter-workouts').value = '';
        }
    }

    _setLimit(e) {
        e.preventDefault();
        const limit = document.getElementById('limit')
        
        if (limit.value === '') {
            alert('Please enter a value.');
            return;
        } 

         // passing data in a form comes as a string; convert it into a number
        this._tracker.setLimit(Number(limit.value));
        limit.value = '';

        const modalElem = document.getElementById('limit-modal');
        const modal = bootstrap.Modal.getInstance(modalElem);
        modal.hide();
    }
}

const app = new App();