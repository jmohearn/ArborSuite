const form = document.querySelector('.form');
const inputType = document.querySelector('#form-type');
const inputSpecies = document.querySelector('#species');
const inputDbh = document.querySelector('#dbh');
const inputCondition = document.querySelector('#condition');
const inputTagNumber = document.querySelector('#tag');
const otherMarkerInfo = document.querySelector('#other-marker-info');


class Marker {
    date = new Date();
    id = (Date.now() + '').slice(-10);
    

    constructor(coords) {
        this.coords = coords; // [lat, lng]
    }

    _setDescription() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Auguts', 'September', 'October', 'November', 'December'];

        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
    }
}

class Tree extends Marker {
    type = 'Tree';

    constructor(coords, species, dbh, condition, tag) {
        super(coords);
        this.species = species;
        this.dbh = dbh;
        this.condition = condition;
        this.tag = tag;
        this._setDescription();
    }
}

class Other extends Marker {
    type = 'Other';

    constructor(coords, info) {
        super(coords);
        this.info = info;
        this._setDescription();
    }
}


//////////////////////////////////////////////////////
// APPLICATION ARCHITECTURE
class App {
    #map;
    #mapEvent;
    #inventory = [];
    inventoryItem;

    constructor() {
        this._getPosition();

        form.addEventListener('submit', this._newMarker.bind(this));
        
        // Toggle input fields
        inputType.addEventListener('change', this._toggleDescriptionField);
    }

    _getPosition() {
        if(navigator.geolocation) 
        navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function(){
            alert('could not get position');
        });
    }

    _loadMap(position) {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        
        //console.log(`https://www.google.com/maps/@${latitude},${longitude},15z?entry=ttu`)

        const coords = [latitude, longitude];

        this.#map = L.map('map').setView(coords, 13);

        L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        // Handling clicks on map
        this.#map.on('click', this._showForm.bind(this));
    }

    _showForm(mapE){
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputSpecies.focus();
    }

    _toggleDescriptionField() {
        otherMarkerInfo.closest('.form-input-row').classList.toggle('hidden');
        inputSpecies.closest('.form-input-row').classList.toggle('hidden');
        inputDbh.closest('.form-input-row').classList.toggle('hidden');
        inputCondition.closest('.form-input-row').classList.toggle('hidden');
        inputTagNumber.closest('.form-input-row').classList.toggle('hidden');
    }

    _newMarker(e) {
        const validInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp));
        const allPositive = (...inputs) => inputs.every(inp => inp > 0);

        e.preventDefault();

        // Get data from form
        const type = inputType.value;
        const { lat, lng } = this.#mapEvent.latlng
        let inventoryItem;

        // If tree, create tree object
        if(type === 'tree') {
            const species = inputSpecies.value;
            const dbh = +inputDbh.value;
            const condition = inputCondition.value;
            const tag = +inputTagNumber.value;

            //Check if data is valid
            if(!validInputs(dbh, tag) || !allPositive(dbh, tag))
            return alert('Inputs have to be positive numbers!');

            inventoryItem = new Tree([lat, lng], species, dbh, condition, tag)
            
        }

        // If other, create other object
        if(type === 'other') {
            const info = otherMarkerInfo.value;
            inventoryItem = new Other([lat, lng], info);
        }

        // Add new object to inventory array
        this.#inventory.push(inventoryItem);
        console.log(inventoryItem);

        // Render tree on map as marker
        
       this._renderWorkoutMarker(inventoryItem);

        //  Render inventroy item on list
            this._renderInventoryItem(inventoryItem);

        // Hide form + Clear input fields
        inputSpecies.value = inputDbh.value = inputCondition.value = inputTagNumber.value = ' ';
        form.classList.add('hidden');
            
    }

    _renderWorkoutMarker(inventoryItem) {
        L.marker(inventoryItem.coords)
        .addTo(this.#map)
        .bindPopup(
            L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: 'running-popup'
            })
        )
        .setPopupContent(inventoryItem.type)
        .openPopup();
    }
    _renderInventoryItem(inventoryItem) {

        let html;
        if(inventoryItem.type === 'Tree') {html =`
        <li class="inventory-item ${inventoryItem.type}" data-id="${inventoryItem.id}">
        <h2 class="item__title">${inventoryItem.description}</h2>
        <div class="item__details">
            <h2 class="icon">🌳</h2>
            <h2 class="value">${inventoryItem.species}</h2>
            <h2 class="unit"></h2>
        </div>
        <div class="item__details">
            <h2 class="icon">📏</h2>
            <h2 class="value">${inventoryItem.dbh}</h2>
            <h2 class="unit"></h2>
        </div>
        <div class="item__details">
            <h2 class="icon">⚕️</h2>
            <h2 class="value">${inventoryItem.condition}</h2>
            <h2 class="unit"></h2>
        </div>
        <div class="item__details">
            <h2 class="icon">🏷</h2>
            <h2 class="value">${inventoryItem.tag}</h2>
            <h2 class="unit"></h2>
        </div>
        </li>
        `} else {html =
            `<li class="inventory-item ${inventoryItem.type}" data-id="${inventoryItem.id}">
            <h2 class="item__title">${inventoryItem.description}</h2>
            <div class="item__details">
                <h2 class="icon">📄</h2>
                <h2 class="value">${inventoryItem.info}</h2>
                <h2 class="unit"></h2>`
        };

        form.insertAdjacentHTML('afterend', html);
        };
    
}

const app = new App;