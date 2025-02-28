class Springtrap {
    constructor(x, z) {
        let scene = document.querySelector("a-scene");
        this.dx = 0.02;
        this.x = x;
        this.dz = 0.02;
        this.z = z;
		
		this.ry = 0;

        this.obj = document.createElement("a-gltf-model");
        this.obj.setAttribute("src", "#springtrap");
        this.obj.setAttribute("animation-mixer", {timeScale: 2.0 });
        this.obj.setAttribute("position", `${this.x} 0 ${this.z}`);
        this.obj.setAttribute("scale", "0.065 0.065 0.065");
		this.object3D = this.obj.object3D; 
        scene.append(this.obj);
		
		this.direction = 1;
	}
	
	turn(angle){
		this.ry = angle;
		this.obj.setAttribute("rotation", `0 ${this.ry} 0`)
	}
	
	walkX(direction){
		this.direction = direction;
		this.x += this.dx*this.direction
        this.obj.setAttribute("position", `${this.x} 0 ${this.z}`);
		this.obj.setAttribute("animation-mixer", "clip: springtrap_v9_1_skeleton|walkpain");
	}
	
	walkZ(direction){
		this.direction = direction;
		this.z += this.dz*this.direction
        this.obj.setAttribute("position", `${this.x} 0 ${this.z}`);
		this.obj.setAttribute("animation-mixer", "clip: springtrap_v9_1_skeleton|walkpain");
	}
	
	crouchX(direction){
		this.direction = direction;
		this.x += this.dx*this.direction
        this.obj.setAttribute("position", `${this.x} 0 ${this.z}`);
		this.obj.setAttribute("animation-mixer", "clip: springtrap_v9_1_skeleton|crouchwalk");
	}
	
	crouchZ(direction){
		this.direction = direction;
		this.z += this.dz*this.direction
        this.obj.setAttribute("position", `${this.x} 0 ${this.z}`);
		this.obj.setAttribute("animation-mixer", "clip: springtrap_v9_1_skeleton|crouchwalk");
	}
	
	idle(){
		this.obj.setAttribute("animation-mixer", "clip: springtrap_v9_1_skeleton|idlepain");
	}
	
	locked(){
		this.obj.setAttribute("animation-mixer", "clip: springtrap_v9_1_skeleton|locked");
	}
	
	placement(placex, placez){
		this.x = placex
		this.z = placez
        this.obj.setAttribute("position", `${this.x} 0 ${this.z}`);
		
	}
	
}
