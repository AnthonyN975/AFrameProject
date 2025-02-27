let Controlclick = false;
let Cameraclick = false;

let t = 360;
let c = 12;

let onVent = false;
let onMap = true;

let VentsError = false;
let AudiosError = false;

let mapCameraButtons = [];
let ventCameraButtons = [];

let cameraCounter = 0;
let ventCounter = 0;
let audioCounter = 0;
let ventUsed = 0;

let prevAudio = audioCounter;
let prevVent = ventUsed;
let prevMapCamera = {x: -10.55, y: 6, z: 8.01};
let prevVentCamera = {x: -9.61, y: 2.5, z: -13.10};

let springtrap;

let pos;
let timeoutTriggered = false;

let cameraSystem = document.querySelector("#cameraSystem");

let epsilon = 0.01

let whichWay1, whichWay2, whichWay3, whichWay4, whichWay5, whichWay6, whichWay7, whichWay8, whichWay9, whichWay10;

let move = true;


window.onload = function () {
    let scene = document.querySelector("a-scene");
    let camera = document.querySelector("#camera");
    let time = document.querySelector("#time");
    let clock = document.querySelector("#clock");

    if (!cameraSystem) {
        cameraSystem = document.createElement("a-entity");
        cameraSystem.setAttribute("id", "cameraSystem");
        scene.appendChild(cameraSystem);
    }
	
	springtrap  = new Springtrap(32.46, -55.91);
	springtrap.obj.setAttribute("animation-mixer", "clip: springtrap_v9_1_skeleton|idlepain");
    new Boxes();
    countdown();
	loop();

    //setInterval(() => {
    //    console.log(camera.getAttribute("position"));
    //}, 100);

    mapCameraButtons = [
        new Camera(-0.01375, -0.015, 0, -10.55, 6, 8.01, false),
        new Camera(0.01325, -0.005, 0, 30.61, 6, -3.09, false),
        new Camera(0.0215, -0.005, 0, 46.43, 6, -4.50, false),
        new Camera(0.0215, 0.0025, 0, 44.07, 6, -17.87, false),
        new Camera(0.005, 0.0005, 0, 18.25, 6, -23.20, false),
        new Camera(-0.016, 0.0005, 0, -17.57, 6, -19.02, false),
        new Camera(-0.016, 0.008, 0, -15.10, 6, -37.85, false),
        new Camera(-0.0075, 0.006, 0, -10.64, 6, -37.41, false),
        new Camera(0.004, 0.01125, 0, 11.33, 6, -55.28, false),
        new Camera(0.0165, 0.01125, 0, 32.46, 6, -51.91, false),
    ];

    ventCameraButtons = [
        new Camera(-0.0065, -0.002, 0, -9.61, 2.5, -13.10, false),
        new Camera(0.01325, -0.0135, 0, 30.37, 2.5, 4.48, false),
        new Camera(0.02725, 0.0025, 0, 54.48, 2.5, -39.62, false),
        new Camera(-0.02325, 0.005, 0, -30.29, 2.5, -31.81, false),
        new Camera(-0.0285, 0.01525, 0, -38.58, 2.5, -65, false),
    ];
	
	let Buttons = new Camera(1000, 1000, 1000, 1000, 1000, 1000, false)
	Buttons.createToggleButton();
	Buttons.createAudioButton();
	Buttons.createVentButton();
	

    setInterval(() => {
        x = onMap ? 1 : 0;
        y = onVent ? 1 : 0;
		
        if (onMap && Math.abs(camera.object3D.position.z - 4) > epsilon && Math.abs(camera.object3D.position.z) > epsilon) {
			//console.log(`vent onMap: ${prevVentCamera.x}`)
			//console.log(`map onMap: ${prevMapCamera.x}`);
            prevMapCamera = camera.getAttribute("position");
        }
        
        if (onVent && Math.abs(camera.object3D.position.z - 4) > epsilon && Math.abs(camera.object3D.position.z) > epsilon) {
			//console.log(`vent onVent: ${prevVentCamera.x}`)
			//console.log(`map onVent: ${prevMapCamera.x}`);
            prevVentCamera = camera.getAttribute("position");
        }

        mapCameraButtons.forEach(button => {
            button.button.setAttribute("visible", onMap);
        });
        ventCameraButtons.forEach(button => {
            button.button.setAttribute("visible", onVent);
        });
    }, 100);
		
	
}

function countdown() {
    if (t > 0) {
        setTimeout(() => {
            t--;
            let timeElement = document.querySelector("#time");
            if (timeElement) timeElement.setAttribute("value", `Time: ${t}`);

            if (t % 60 === 0) {
                c = c === 12 ? 1 : c + 1;
                let clockElement = document.querySelector("#clock");
                if (clockElement) clockElement.setAttribute("value", `Clock: ${c}AM`);
            }

            if (c === 6) {
                victory();
                return;
            }

            if (t % 12 == 0) {
                ventCounter++;

                if (ventCounter >= 12) {
                    VentsError = true;
                    console.log(VentsError);
                }
            }
            countdown();
        }, 1000);
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key == '1') {
        BBjumpscare();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key == '2') {
        STjumpscare();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key == '3') {
        victory();
    }
});


function victory() {
	console.log("hi");
	let win = document.querySelector("#win");
	let winSound = document.querySelector("#winSound");
	winSound.components.sound.playSound(); 
	win.setAttribute("opacity", "1");
}

function BBjumpscare(){
	let BBJS = document.querySelector("#BB");
	let jumpscare = document.querySelector("#jumpscare");
	jumpscare.components.sound.playSound(); 
	BBJS.setAttribute("opacity", "1");
}

function STjumpscare(){
	let STJS = document.querySelector("#ST");
	let jumpscare = document.querySelector("#jumpscare");
	jumpscare.components.sound.playSound(); 
	STJS.setAttribute("opacity", "1");
}


function loop(){
	let cameraPos = camera.getAttribute("position");
	
	let anim = springtrap.obj.getAttribute("animation-mixer");
	let currentAnimation = anim ? anim.clip : null;
	pos = springtrap.object3D.position;
	
	if (
        (Math.abs(pos.x - 32.46) < epsilon &&
        Math.abs(pos.z - (-55.91)) < epsilon)
    ) {
        springtrap.idle();
    }
	
	//springtrap.walk();
	if(currentAnimation == "springtrap_v9_1_skeleton|idlepain" && (Math.abs(pos.x - 32.46) < epsilon && Math.abs(pos.z - (-55.91)) < epsilon)){
		if(t%4 === 0 && !timeoutTriggered && t <= 350){
			timeoutTriggered = true;
			setTimeout(()=>{
				whichWay1 = Math.floor(Math.random() * 2)
				timeoutTriggered = false;
			},100)
		}
	}
	
	
	if(whichWay1 == 1){
		springtrap.turn(90);
		springtrap.crouchX(1);
		if((Math.abs(pos.x - 48.15) < epsilon &&
        Math.abs(pos.z - (-55.91)) < epsilon)){
			whichWay1 = -1;
			whichWay3 = 1;
		}
	} 
	
	if(whichWay1 == 0){
		springtrap.turn(-90);
		springtrap.walkX(-1);
		if((Math.abs(pos.x - 15.33) < epsilon &&
        Math.abs(pos.z - (-55.91)) < epsilon)){
			whichWay1 = -1;
			springtrap.idle();
			whichWay2 = Math.floor(Math.random() * 2)
			console.log(whichWay2);
		}
	}
	
	if(whichWay2 == 1){
		springtrap.turn(180);
		if(move){
			springtrap.placement(18.14, -54.44);
			move = false;
		}
		springtrap.crouchZ(-1);
	} 
	
	if(whichWay2 == 0){
		springtrap.turn(0);
		springtrap.walkZ(1);
	} 
	
	if(whichWay3 == 1){
		springtrap.turn(0)
		if(move){
			springtrap.placement(54.70, -55.287);
			move = false;
		}
		springtrap.crouchZ(1);
	}
	
	
	if((cameraPos.x == 32.46 && cameraPos.y == 6 && cameraPos.z == -51.91) && (prevAudio < audioCounter) && (Math.abs(pos.x - 15.33) < 10 && Math.abs(pos.z - (-55.91)) < 10)){
		prevAudio = audioCounter;
		console.log("hi");
		springtrap.placement(32.46, -55.91);
		springtrap.idle();
	}

	if((cameraPos.x == 54.48 && cameraPos.y == 2.5 && cameraPos.z == -39.62) && (prevVent < ventUsed) && (Math.abs(pos.x - 54.48) < 10 && Math.abs(pos.z - (-39.62)) < 10)){
		prevVent = ventUsed;
		springtrap.placement(32.46, -55.91);
		springtrap.idle();
	}
	
	if(prevVent < ventUsed){
		prevVent = ventUsed;
	}
	
	
	//springtrap.crouchIdle();
	//springtrap.run();
	//springtrap.runFast();
	
	window.requestAnimationFrame(loop);
}