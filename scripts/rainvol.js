// Define Elements

let areaInputTitle = document.getElementById ('area--title');
let areaInput = document.getElementById('area--sqft');
let rainInputTitle = document.getElementById ('rain--title');
let rainInput = document.getElementById('rainfall--in');
let rainOutput = document.getElementById('rainfall--volume');
let buttonStatus = true;


const calcBtn = document.getElementById('calculate--btn');
const convertBtn = document.getElementById('convert--btn');

// Event Listeners

calcBtn.addEventListener('click', calcVol);
convertBtn.addEventListener('click', changeUnit);

// Functions

function convertArea () {
    if (buttonStatus === true) {
        let areaSqFt = areaInput.value;
        let areaSqIn = areaSqFt * 144;
        return areaSqIn;
    }else if (buttonStatus === false) {
        let areaSqm = areaInput.value;
        let areaSqCm = areaSqm * 10000;
        return areaSqCm;
    }
}

function calcVol () {
    if (isNaN(areaInput.value) || isNaN(rainInput.value)) {
        alert('Please enter a number');
        return;
    }else if (buttonStatus === true) {
        let area = convertArea();
        let rainFall = rainInput.value;
        let rainVolCuIn = (area * rainFall);
        let rainGal = Math.round(rainVolCuIn / 231);
        console.log(rainGal);
        rainOutput.innerHTML = `${rainGal} gals`;
    }else if (buttonStatus === false) {
        let area = convertArea();
        let rainFall = rainInput.value;
        let rainVolCuCm = (area * rainFall);
        let rainLiter = Math.round(rainVolCuCm * 0.001);
        console.log(rainLiter);
        rainOutput.innerHTML = `${rainLiter} L`;
    }
}

function changeUnit () { 
    if (buttonStatus === true) {
        convertBtn.innerHTML = 'change to imperial';
        areaInputTitle.innerHTML = 'Area sq m:';
        rainInputTitle.innerHTML = 'Rainfall cm:';
        rainOutput.innerHTML = '0 L'
        buttonStatus = false;
    } else if (buttonStatus === false){
        convertBtn.innerHTML = 'change to metric'
        areaInputTitle.innerHTML = 'Area sqft';
        rainInputTitle.innerHTML = 'Rainfall inches';
        rainOutput.innerHTML = '0 gal'
        buttonStatus = true;
    }
}

const faqs = document.querySelectorAll('.faq');

faqs.forEach((faq) => {
    faq.addEventListener('click', () => {
        removeActiveClasses()
        faq.classList.add('active');
    })
})

function removeActiveClasses() {
    faqs.forEach(faq => {
        faq.classList.remove('active');
    })
}