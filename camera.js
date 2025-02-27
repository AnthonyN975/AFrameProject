class Camera {
    constructor(bx, by, bz, cx, cy, cz, visible) {
        this.bx = bx;  
        this.by = by;
        this.bz = bz;
        this.cx = cx;  
        this.cy = cy;
        this.cz = cz;
        this.visible = visible;
        this.cam = null;
        this.button = null;
        this.toggle = null;
        this.audio = null;
		this.vent =  null;
		this.appear = true;
		
		this.createButton();
    }


    createButton() {
        this.button = document.createElement("a-box");
        this.button.setAttribute("position", `${this.bx} ${this.by} ${this.bz}`); 
        this.button.setAttribute("width", 0.0025);
        this.button.setAttribute("height", 0.0025);
        this.button.setAttribute("depth", 0.00025);
        this.button.setAttribute("color", "blue");
        this.button.setAttribute("class", "clickable");
        document.querySelector("#cameraSystem").append(this.button);

        this.button.addEventListener("click", () => {
            this.switchToCamera();
        });
    }
	
	
    createAudioButton() {
        this.audio = document.createElement("a-box");
        let audioText = document.createElement("a-text");

        audioText.setAttribute("value", "Audio");
        audioText.setAttribute("color", "white");
        audioText.setAttribute("align", "center");
        audioText.setAttribute("width", 0.075);  
        audioText.setAttribute("position", "-0.0025 0 0.002"); 
        audioText.setAttribute("baseline", "center");

        this.audio.setAttribute("position", "-0.035 -0.0175 0"); 
        this.audio.setAttribute("width", 0.01);
        this.audio.setAttribute("height", 0.005);
        this.audio.setAttribute("depth", 0.00025);
        this.audio.setAttribute("color", "green");
        this.audio.setAttribute("class", "clickable");
        this.audio.setAttribute("sound", "src:AudioLure.mp3");

        this.audio.append(audioText);
	    document.querySelector("#cameraSystem").append(this.audio);

		
        this.audio.addEventListener("click", () => {
            if (audioCounter <= 5) {
                this.audioLure();
				this.audio.setAttribute("position", "10000 -0.0175 0"); 
				this.toggle.setAttribute("position", "10000 -0.0175 0"); 
				setTimeout(() => {
					this.audio.setAttribute("position", "-0.035 -0.0175 0"); 
					this.toggle.setAttribute("position", "-0.035 -0.01 0"); 
				}, 7500)
            } 
        })
    }
	
    createVentButton() {
        this.vent = document.createElement("a-box");
        let ventText = document.createElement("a-text");

        ventText.setAttribute("value", "Vent");
        ventText.setAttribute("color", "white");
        ventText.setAttribute("align", "center");
        ventText.setAttribute("width", 0.075);  
        ventText.setAttribute("position", "-0.0025 0 0.002"); 
        ventText.setAttribute("baseline", "center");

        this.vent.setAttribute("position", "1000 -0.0175 0"); 
        this.vent.setAttribute("width", 0.01);
        this.vent.setAttribute("height", 0.005);
        this.vent.setAttribute("depth", 0.00025);
        this.vent.setAttribute("color", "green");
        this.vent.setAttribute("class", "clickable");

        this.vent.append(ventText);
	    document.querySelector("#cameraSystem").append(this.vent);
		
        this.vent.addEventListener("click", () => {
            if (ventCounter <= 12) {
                this.closeVent();
				this.vent.setAttribute("position", "10000 -0.0175 0"); 
				this.toggle.setAttribute("position", "10000 -0.0175 0"); 
				setTimeout(() => {
					this.vent.setAttribute("position", "-0.035 -0.0175 0"); 
					this.toggle.setAttribute("position", "-0.035 -0.01 0"); 
				}, 7500)
            } 
        })
    }
	

    createToggleButton() {
        this.toggle = document.createElement("a-box");
        let toggleText = document.createElement("a-text");

        toggleText.setAttribute("value", "Toggle");
        toggleText.setAttribute("color", "white");
        toggleText.setAttribute("align", "center");
        toggleText.setAttribute("width", 0.07);  
        toggleText.setAttribute("position", "-0.0025 0 0.002"); 
        toggleText.setAttribute("baseline", "center");

        this.toggle.setAttribute("position", "-0.035 -0.01 0"); 
        this.toggle.setAttribute("width", 0.01);
        this.toggle.setAttribute("height", 0.005);
        this.toggle.setAttribute("depth", 0.00025);
        this.toggle.setAttribute("color", "gray");
        this.toggle.setAttribute("class", "clickable");

        this.toggle.append(toggleText);
        document.querySelector("#cameraSystem").append(this.toggle);

        this.toggle.addEventListener("click", () => {
			if(this.appear){
				this.audio.setAttribute("position", "1000 0 0");
				this.vent.setAttribute("position", "-0.035 -0.0175 0");
			} 
			if(!this.appear){
				this.audio.setAttribute("position", "-0.035 -0.0175 0");
				this.vent.setAttribute("position", "1000 0 0");
			}
            this.switchSection();
			this.appear = !this.appear;
        })
    }

    switchToCamera() {
		cameraCounter += 0.2;
        document.querySelectorAll("a-camera").forEach(cam => {
            cam.setAttribute("active", false); 
            cam.removeAttribute("wasd-controls"); 
        });
		
		if (onMap) {
    		prevMapCamera = camera.getAttribute("position");
		}

		if (onVent) {
    		prevVentCamera = camera.getAttribute("position");
		}
		
        document.querySelector("#camera").setAttribute("position", `${this.cx} ${this.cy} ${this.cz}`);
    }

	switchSection(){
    if (onMap) {
        // Switching from map to vent
        prevMapCamera = camera.getAttribute("position"); // Save the current map camera position
        onMap = false;
        onVent = true;
        camera.setAttribute("position", prevVentCamera); // Switch to the last vent camera position
    } else if (onVent) {
        // Switching from vent to map
        prevVentCamera = camera.getAttribute("position"); // Save the current vent camera position
        onMap = true;
        onVent = false;
        camera.setAttribute("position", prevMapCamera); // Switch to the last map camera position
    }
	}
    
		
    audioLure() {
        audioCounter++;
		let goto_x = this.cx;
		let goto_z = this.cz;
        if (audioCounter >= 5) {
            AudiosError = true;
        }
        let lure = document.querySelector("#AudioLure"); 
        lure.components.sound.playSound(); 
    }
	
	closeVent(){
		ventCounter++;
		ventUsed++;
		let seal = document.querySelector("#reboot"); 
        seal.components.sound.playSound(); 
	}

}