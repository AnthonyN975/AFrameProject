let currentBlinkingElement = null;
let currentInterval = null;
let isBlinking = false;

class Boxes {
    constructor() {
        let camera = document.querySelector("#camera");
        let button1 = document.querySelector("#button1").parentElement;
        let button2 = document.querySelector("#button2").parentElement;
        let controlpanel = document.querySelector("#controlPanel");
        let camerapanel = document.querySelector("#cameraSystem");
		
	    let cameraErrorText = document.querySelector("#cameraError");
	    let ventilationErrorText = document.querySelector("#ventilationError");
	    let audioErrorText = document.querySelector("#audioError");

	    let cameraErrorMessage = document.querySelector("#cameraErrorMessage");
	    let ventilationErrorMessage = document.querySelector("#ventilationErrorMessage");
	    let audioErrorMessage = document.querySelector("#audioErrorMessage");
	

        button1.setAttribute("clickable", "");
        button2.setAttribute("clickable", "");
		
		Errors();
		

        button1.addEventListener("click", () => {
		    if(isBlinking == false){
                Cameraclick = false;
                setTimeout(() => {
                    Controlclick = !Controlclick;
                    controlpanel.setAttribute('visible', Controlclick);
                    camerapanel.setAttribute('visible', Cameraclick);
                    camera.setAttribute("position", "5 2.5 4");
                }, 300);
            }
		})

        button2.addEventListener("click", () => {
            if(cameraCounter <= 6 && isBlinking == false){
                Controlclick = false;
                Cameraclick = !Cameraclick;
                camerapanel.setAttribute('visible', Cameraclick);
                controlpanel.setAttribute('visible', Controlclick);
        if (!Cameraclick) {
            // Exiting camera system: Save the current camera position
            if (onMap) {
                prevMapCamera = JSON.parse(JSON.stringify(camera.getAttribute("position")));
            } else if (onVent) {
                prevVentCamera = JSON.parse(JSON.stringify(camera.getAttribute("position")));
            }
            camera.setAttribute("position", "5 2.5 4"); // Return to the player's default position
        } else {
            // Entering camera system: Switch to the last used camera
            if (onMap) {
                camera.setAttribute("position", prevMapCamera);
            } else if (onVent) {
                camera.setAttribute("position", prevVentCamera);
            }
        }
                cameraCounter += 1;
            } else {
				camerapanel.setAttribute('visible', false);
                cameraErrorMessage.setAttribute("color", "red"); 
                cameraErrorText.setAttribute("color", "red"); 
            }
        });

        let audioError = document.querySelector("#audioError").parentElement;
        let ventilationError = document.querySelector("#ventilationError").parentElement;
        let cameraError = document.querySelector("#cameraError").parentElement;

        function blinkText(element,text) {
			
			let fix = document.querySelector("#reboot"); 
        	fix.components.sound.playSound(); 
			
            if (isBlinking) return;

            if (currentBlinkingElement) {
                clearInterval(currentInterval);
                currentBlinkingElement.querySelector("a-text").setAttribute("color", "green");
            }

            isBlinking = true;
            currentBlinkingElement = element;
            let textElement = element.querySelector("a-text");
            let isGreen = true;
            currentInterval = setInterval(() => {
                if (isGreen) {
                    textElement.setAttribute("color", "white");
                } else {
                    textElement.setAttribute("color", "green");
                }
                isGreen = !isGreen;
            }, 500);

            setTimeout(() => {
                clearInterval(currentInterval);
                textElement.setAttribute("color", "green");
				text.setAttribute("color", "cyan");
                currentBlinkingElement = null;
                isBlinking = false;
            }, 5000);
        }
		
        function Errors(){
	        setTimeout(() => {
		        if(VentsError){
                    ventilationErrorMessage.setAttribute("color", "red"); 
                    ventilationErrorText.setAttribute("color", "red"); 
					VentsError = !VentsError;
		        }
				if(AudiosError){
					audioErrorMessage.setAttribute("color", "red"); 
					audioErrorText.setAttribute("color", "red"); 
					AudiosError = !AudiosError;
				}
		        Errors();
	        }, 1)
        }


        audioError.addEventListener("click", () => {
			if(Controlclick){
				blinkText(audioError, audioErrorMessage);
				audioCounter = 0;
				prevAudio = audioCounter
			}
		})
        ventilationError.addEventListener("click", () => {
			if(Controlclick){
		    	blinkText(ventilationError, ventilationErrorMessage);	
				ventCounter = 0;
				ventUsed = ventCounter;
				prevVent = ventUsed;
			}
		})
        cameraError.addEventListener("click", () => {
			if(Controlclick){
		    	blinkText(cameraError, cameraErrorMessage);	
				audioCounter = 0;
			}
        })
    }
}