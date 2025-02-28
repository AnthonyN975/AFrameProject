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

let moving = true;

let cameraSystem = document.querySelector("#cameraSystem");
let controlPanel = document.querySelector("#controlPanel");

let epsilon = 0.02;

let whichWay1 = -1, whichWay2 = -1, whichWay3 = -1, whichWay4 = -1, whichWay5 = -1, whichWay6 = -1, whichWay7 = -1, whichWay8 = -1, whichWay9 = -1, whichWay10 = -1, whichWay11 = -1, whichWay12 = -1, whichWay13 = -1, whichWay14 = -1, whichWay15 = -1, whichWay16 = -1, whichWay17 = -1, whichWay18 = -1

let move = true;

let loss = false;


window.onload = function () {
    let scene = document.querySelector("a-scene");
    let camera = document.querySelector("#camera");
    let time = document.querySelector("#time");
    let clock = document.querySelector("#clock");
	
	camera.removeAttribute("wasd-controls"); 

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

    setInterval(() => {
        console.log(camera.getAttribute("position"));
    }, 100);

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

function defeat() {
	let lose = document.createElement("a-image")
	lose.setAttribute("position", "0 0 -2");
	lose.setAttribute("height", "6");
	lose.setAttribute("width", "12");
	lose.setAttribute("src", "lose.jpg");
	camera.append(lose);
	let gameOver = document.querySelector("#gameOver");
	gameOver.components.sound.playSound();
}

function victory() {
	let win = document.createElement("a-image")
	win.setAttribute("position", "0 0 -2");
	win.setAttribute("height", "6");
	win.setAttribute("width", "12");
	win.setAttribute("src", "win.jpg");
	camera.append(win);
	let winSound = document.querySelector("#winSound");
	winSound.components.sound.playSound(); 
	
}

function BBjumpscare(){
	ventCounter+=2;
	let BBJS = document.createElement("a-image")
	BBJS.setAttribute("position", "0 0 -2");
	BBJS.setAttribute("height", "5");
	BBJS.setAttribute("width", "8");
	BBJS.setAttribute("src" , "bbjumpScare.jpg");
	camera.append(BBJS);
	let jumpscare = document.querySelector("#jumpscare");
	jumpscare.components.sound.playSound(); 
	cameraSystem.setAttribute("visible", false);
	controlPanel.setAttribute("visible", false);
	
	setTimeout(() => {
		BBJS.remove();
	}, 3000)
}

function STjumpscare(){
	let STJS = document.createElement("a-image")
	STJS.setAttribute("position", "0 0 -2");
	STJS.setAttribute("height", "6");
	STJS.setAttribute("width", "12");
	STJS.setAttribute("src" , "STjumpscare.jpg");
	camera.append(STJS);
	let jumpscare = document.querySelector("#jumpscare");
	jumpscare.components.sound.playSound(); 
	cameraSystem.setAttribute("visible", false);
	controlPanel.setAttribute("visible", false);
	
	setTimeout(() => {
		STJS.remove();
		defeat();
	}, 3000)
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

            if (t % 12 == 0) {
                ventCounter++;

                if (ventCounter >= 12) {
                    VentsError = true;
                    console.log(VentsError);
                }
            }
            countdown();
        }, 1000);
		
		if(t % 50 == 0 && t < 350 && loss == false){
			camera.setAttribute("position", "5 2.5 4");
			BBjumpscare();
		}
    }
	if (c == 6 && loss == false) {
        victory();
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
		move = true;
    }
	
	//springtrap.walk();
	if(currentAnimation == "springtrap_v9_1_skeleton|idlepain" && (Math.abs(pos.x - 32.46) < epsilon && Math.abs(pos.z - (-55.91)) < epsilon)){
		if(t%4 == 0 && t <= 350 && moving){
			moving = false;
			setTimeout(()=>{
				whichWay1 = Math.floor(Math.random() * 2)
				moving = true;
			},2000)
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
		if((Math.abs(pos.x - 18.14) < epsilon &&
        Math.abs(pos.z - (-65.01)) < epsilon)){
			whichWay2 = -1;
			whichWay14 = 1;
			move = true;
		}
	} 
	
	if(whichWay14 == 1){
		springtrap.turn(-90);
		springtrap.crouchX(-1);
		if(move){
			springtrap.placement(-14.25, -64.71)
			move = false;
		}
		if((Math.abs(pos.x - -35.64) < epsilon &&
        Math.abs(pos.z - (-64.71)) < epsilon)){
			whichWay14 = -1;
			whichWay15 = 1;
			move = true;
		}
	}
	
	if(whichWay15 == 1){
		springtrap.turn(0);
		springtrap.crouchZ(1)
		if(move){
			springtrap.placement(-38.53, -61.26)
			move = false;
		}
		if((Math.abs(pos.x - -38.53) < epsilon &&
        Math.abs(pos.z - (-26.74)) < epsilon)){
			whichWay15 = -1;
			whichWay17 = 1;
			move = true;
		}
	}
	
	
	
	if(whichWay2 == 0){
		springtrap.turn(0);
		springtrap.walkZ(1);
		if((Math.abs(pos.x - 15.33) < epsilon &&
        Math.abs(pos.z - (-40.24)) < epsilon)){
			whichWay2 = -1;
			whichWay6 = 1;
			move = true;
		}
	} 
	
	if(whichWay6 == 1){
		springtrap.turn(-90)
		springtrap.walkX(-1);
		if((Math.abs(pos.x - -7.318) < epsilon &&
        Math.abs(pos.z - (-40.24)) < epsilon)){
			whichWay6 = -1;
			whichWay7 = Math.floor(Math.random() * 2);
			move = true;
		}
	}
	
	if(whichWay7 == 0){
		springtrap.turn(0);
		springtrap.walkZ(1);
		if((Math.abs(pos.x - -7.318) < epsilon &&
        Math.abs(pos.z - (-23.81)) < epsilon)){
			whichWay7 = -1;
			whichWay8 = Math.floor(Math.random() * 2);
			move = true;
		}
	}
	
	if(whichWay7 == 1){
		springtrap.walkX(-1);
		if((Math.abs(pos.x - -17.23) < epsilon &&
        Math.abs(pos.z - (-40.24)) < epsilon)){
			whichWay7 = -1;
			whichWay12 = Math.floor(Math.random() * 2);
			move = true;
		}
	}
	
	if(whichWay12 == 0){
		springtrap.turn(0);
		springtrap.walkZ(1);
		if((Math.abs(pos.x - -17.23) < epsilon &&
        Math.abs(pos.z - (-23.81)) < epsilon)){
			whichWay12 = -1;
			whichWay13 = 0;
		}
	}
	
	if(whichWay12 == 1){
		springtrap.crouchX(-1)
		if(move){
			springtrap.placement(-19.69, -45.45);
			move = false;
		}
		if((Math.abs(pos.x - -27.70) < epsilon &&
        Math.abs(pos.z - (-45.45)) < epsilon)){
			whichWay12 = -1;
			whichWay16 = 1
			move = true;
		}
	}	
	
	if(whichWay16 == 1){
		springtrap.turn(0);
		springtrap.crouchZ(1);
		if(move){
			springtrap.placement(-30.25, -42.18);
			move = false;
		}
		if((Math.abs(pos.x - -30.25) < epsilon &&
        Math.abs(pos.z - (-8.73)) < epsilon)){
			whichWay16 = -1;
			whichWay17 = 1;
			move = true;
		}
	}
	
	if(whichWay17 == 1){
		springtrap.turn(90)
		springtrap.crouchX(1)
		if(move){
			springtrap.placement(-26.54, -8.28);
			move = false;
		}
		if((Math.abs(pos.x - -15.20) < epsilon &&
        Math.abs(pos.z - (-8.28)) < epsilon)){
			whichWay17 = -1;
			whichWay11 = 1;
			move = true;
		}	
	}
	
	
	if(whichWay13 == 0){
		springtrap.turn(90);
		springtrap.walkX(1);
		if((Math.abs(pos.x - -9.40) < epsilon &&
        Math.abs(pos.z - (-23.81)) < epsilon)){
			whichWay13 = -1;
			whichWay8 = Math.floor(Math.random() * 2);
			move = true;
		}
	}
	
	
	if(whichWay8 == 0){
		springtrap.turn(90);
		springtrap.walkX(1);
		if((Math.abs(pos.x - 30.52) < epsilon &&
        Math.abs(pos.z - (-23.81)) < epsilon)){
			whichWay8 = -1;
			whichWay9 = Math.floor(Math.random() * 2);
			move = true;
		}
	}
	
	if(whichWay8 == 1){
		springtrap.turn(0)
		springtrap.crouchZ(1)
		if(move){
			springtrap.placement(-9.62, -23.02);
			move = false;
		}
		if((Math.abs(pos.x - -9.62) < epsilon &&
        Math.abs(pos.z - (-6.83)) < epsilon)){
			whichWay8 = -1;
			whichWay11 = 1;
			move = true;
		}
	}
	
	if(whichWay9 == 0){
		springtrap.turn(0);
		springtrap.walkZ(1);
		if((Math.abs(pos.x - 30.52) < epsilon &&
        Math.abs(pos.z - (-6.83)) < epsilon)){
			whichWay9 = -1;
			whichWay10 = Math.floor(Math.random() * 2);
			move = true;
		}
	}
	
	if(whichWay10 == 0){
		springtrap.turn(-90)
		springtrap.walkX(-1);
		if((Math.abs(pos.x - -9.62) < epsilon &&
        Math.abs(pos.z - (-6.83)) < epsilon)){
			whichWay10 = -1;
			whichWay11 = 1;
			move = true;
		}
	}
	
	if(whichWay11 == 1){
		springtrap.turn(0);
		springtrap.walkZ(1);
		if(move){
			springtrap.placement(-9.62, -6.83);		
			move = false;
		}
		if((Math.abs(pos.x - -9.62) < epsilon &&
        Math.abs(pos.z - (-2.2)) < epsilon)){
			whichWay11 = -1
			whichWay5 = 1
			move = true;
		}
	}
	
	if(whichWay3 == 1){
		springtrap.turn(0)
		if(move){
			springtrap.placement(54.70, -55.287);
			move = false;
		}
		springtrap.crouchZ(1);
		if((Math.abs(pos.x - 54.71) < epsilon &&
        Math.abs(pos.z - (-15.45)) < epsilon)){
			whichWay3 = -1;
			whichWay4 = 1;
			move = true;
		}
	}
	
	if(whichWay4 == 1){
		springtrap.turn(-90);
		springtrap.crouchX(-1)
		if(move){
			springtrap.placement(47.73, 4.91);
			move = false;
		}
		if((Math.abs(pos.x - 18.24) < epsilon &&
        Math.abs(pos.z - (4.91)) < epsilon)){
			console.log("hi");
			whichWay4 = -1;
			whichWay5 = 1;
			move = true;
		}
	}
	
	if(whichWay5 == 1){
		springtrap.turn(0);
		springtrap.locked();
		if(move){
			springtrap.placement(4.93, -1);
			camera.setAttribute("position", "5 2.5 4");
			move = false;
			setTimeout(() => {
				STjumpscare();
				loss = true;
			},4000)
		}
	}
	
	console.log(pos.x);
	console.log(pos.z);

	if((cameraPos.x == 32.46 && cameraPos.y == 6 && cameraPos.z == -51.91) && (prevAudio < audioCounter) && (Math.abs(pos.x - 15.33) < 5 && Math.abs(pos.z - (-55.91)) < 5)){
		whichWay1 = -1;
		springtrap.idle();
		prevAudio = audioCounter;
		springtrap.placement(32.46, -55.91);
	}

	if((cameraPos.x == 54.48 && cameraPos.y == 2.5 && cameraPos.z == -39.62) && (prevVent < ventUsed) && (Math.abs(pos.x - 54.48) < 5 && Math.abs(pos.z - (-39.62)) < 5)){
		whichWay3 = -1;
		springtrap.idle();
		prevVent = ventUsed;
		springtrap.placement(32.46, -55.91);
	}
	
	
	window.requestAnimationFrame(loop);
}