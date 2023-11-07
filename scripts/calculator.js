//Define variables
let diameter = document.getElementById ('diameterInput');
let crz = document.getElementById ('crz');
let srp = document.getElementById ('srp');
let crzsqft = document.getElementById ('crzsqft');
let srpsqft = document.getElementById ('srpsqft');
let calcSrpBtn = document.getElementById ('calcSrp');
let srpBtn = document.getElementById ('srp-btn');
let impactBtn = document.getElementById ('impact-btn');
let recompenseBtn = document.getElementById ('recompense-btn');
let mapBtn = document.getElementById('map-btn');
let srpCalc = document.getElementById ('wrapper--srp')
let impactCalc = document.getElementById ('wrapper--impact')
let recompenseCalc = document.getElementById ('wrapper--recompense')
let treeMap = document.getElementById('wrapper--map');
let cards = document.querySelectorAll('.card');
let btnCloseApp = document.querySelectorAll('.close-app-btn')
let app = document.querySelectorAll('.app');

let overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

//Event Listeners

calcSrpBtn.addEventListener('click', calculate);

console.log(cards);

for (i = 0; i <= cards.length - 1; i++) {
    cards[i].addEventListener("click", function() {
            let content = this.nextElementSibling;
            if (content.classList.contains('off')){
              content.classList.remove('off');
              overlay.classList.remove('off');
            } else {
                return;
            }
          });
}


for (i = 0; i <= btnCloseApp.length - 1; i++) {
    btnCloseApp[i].addEventListener("click", function() {
        let content = this.parentElement;
        content.classList.add("off");      
        overlay.classList.add("off");      
    })
};

overlay.addEventListener('click', function(){
    for (i = 0; i <= app.length - 1; i++) {
        if(!app[i].classList.contains('off')){
            app[i].classList.add('off');
        };
        overlay.classList.add('off');
    };
    
});



//functions

function calculate () {
    let dbh = diameter.value;
    let calc = (0.00137 * (dbh**3)) + (-0.15469 * (dbh**2)) + ((6.85 * dbh)+20.4);
    let feet = Math.round(calc / 12);
    let csf = Math.round(3.14 * (dbh * dbh));
    let ssf = Math.round(3.14 * (feet * feet));

    crz.innerHTML = `${dbh}' radius`
    srp.innerHTML = `${feet}' radius`
    crzsqft.innerHTML = `${csf} sqft`
    srpsqft.innerHTML = `${ssf} sqft`

    console.log(feet)
}



console.log("Code by Jeremy O'Hearn");
console.log("Updated Oct 27, 2023");

//segment area formula
let crzInput = document.getElementById("crzInput");
let distanceInput = document.getElementById("height");
let areaCrz = document.getElementById("areaCrz");
let areaImpact = document.getElementById("areaImpact");
let percentImpact = document.getElementById("percentImpact");
let calcImpactBtn = document.getElementById ('calcImpact');
let segAreaResult;
let areaResult;

calcImpactBtn.addEventListener('click', segArea)

function segArea () {
    let r = crzInput.value
    let d = distanceInput.value
    let h = r - d;
    let segAreaEq = ((Math.pow(r,2))*(Math.acos((r-h)/r))) - (r-h)*(Math.sqrt((2*(r*h))-(Math.pow(h,2))));
    segAreaResult = segAreaEq;
    let segAreaRound = segAreaResult.toFixed(2);
    areaImpact.innerHTML = `${segAreaRound} sqft`
    console.log(segAreaEq);
    area(r);
}

function area (r){
    let area = 3.14 * (Math.pow(r, 2));
    areaResult = area;
    areaCrz.innerHTML = `${areaResult} sqft`
    console.log(area);
    impactPer(segAreaResult,areaResult);
}

function impactPer (a,b) {
    let result = (a/b) * 100;
    let round_result = result.toFixed(2);
    percentImpact.innerHTML = `${round_result} %`
    console.log(round_result);
}

/*segArea(10,6);
area(10);
impactPer(segAreaResult, areaResult);*/

function CircleRegionArea(radius,distH,distV){
	if(radius == "" || distH == "" || distV == "")
		return "Invalid value";
	let r = Number(radius);
	let H = Number(distH);
	let V = Number(distV);
	let chord = Math.sqrt(H*H+V*V);

	if(chord - radius*2 > 0)
	{
		if(chord == radius*2)
			return 0;
		else
			return "Invalid value";
	}
	let alpha = 2*Math.asin(chord/(2*r));

	let areaTriangle = H*V*0.5;
	let areaChord = r*r*0.5*(alpha - Math.sin(alpha));
	let area = areaTriangle+areaChord;
    let area_round = area.toFixed(2);
	console.log(area_round);
}

CircleRegionArea(4,5,1);

function darkMode () {
    let element = document.body;
    element.classList.toggle("dark-mode");
    diameter.classList.toggle("dark-mode");
    calcSrpBtn.classList.toggle("dark-mode");
    changeModeBtn.classList.toggle("dark-mode");
    crzInput.classList.toggle("dark-mode");
    distanceInput.classList.toggle("dark-mode");
    calcImpactBtn.classList.toggle("dark-mode");
}

//recompense formula
let numTrees = document.getElementById ('treesRemoved');
let dbhRemoved = document.getElementById ('dbhRemoved');
let recomp = document.getElementById ('recompense');
let fine = document.getElementById ('fine');
let calcRecompenseBtn = document.getElementById ('calcRecompense');
let total = document.getElementById ('total');

calcRecompenseBtn.addEventListener('click', recompense);

function recompense () {
    let numTreesInput = numTrees.value
    let dbhRemovedInput = dbhRemoved.value

    let recompenseForm = (100 * numTreesInput) + (30 * dbhRemovedInput);
    let fineForm = 500 + (1000 * (numTreesInput - 1));
    let totalCalc = recompenseForm + fineForm;

    recomp.innerHTML = `$${recompenseForm}`;
    fine.innerHTML = `$${fineForm}`;
    total.innerHTML = `$${totalCalc}`;
}