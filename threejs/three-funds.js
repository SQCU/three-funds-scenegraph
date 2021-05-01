import * as THREE from './build/three.module.js';
console.log("three-funds-next");
//todo 4/20: write a color picker, write an object manager.

function main()	{
	//canvas block
	const canvas = document.querySelector('#canban');
	const renderer = new THREE.WebGLRenderer({canvas});

	//camera block
	const fov = 75;
	const aspect = 2;	//fuck you fundamentals
	const near = 0.1;
	const far = 1000;	//v v far away
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.set(0, 150, 0);
	camera.up.set(0, 0, 1);	//no joke, the camera has to be told which direction is "up", instead of the default pos-y axis
	camera.lookAt(0, 0, 0);	//using the look-at func, which uhh, does what you would think it would do I suppose
	
	//scene block
	const scene = new THREE.Scene();
	scene.background = new THREE.Color(0xAAAABB);
	
	const objectsman = [];	//this is where all of our geometry gets dumped

	//we spherein it
	const radius = 1;
	const widthsegs = 5;	//i like five :)
	const heightsegs = 5;
	const spheregeo = new THREE.SphereGeometry(
	radius, widthsegs, heightsegs);
	
	const solsys = new THREE.Object3D(); // empty scene graph node to contain both objects
	scene.add(solsys);
	objectsman.push(solsys);
	
	const sunmat = new THREE.MeshPhongMaterial({emissive: 0xFFEE00});
	const sunmesh = new THREE.Mesh(spheregeo, sunmat);
	//biggening
	sunmesh.scale.set(5,5,5);
	solsys.add(sunmesh);
	objectsman.push(sunmesh);

	const marsmat = new THREE.MeshPhongMaterial({color: 0xDD3322, emissive: 0x442211});
	const marsmesh = new THREE.Mesh(spheregeo, marsmat);
	marsmesh.position.x = 12;
	solsys.add(marsmesh);
	objectsman.push(marsmesh);

	{//single point light at scene center fo the sun
	const color = 0xFFFFFF
	const intensity = 17;
	const cenlight = new THREE.PointLight(color, intensity);
	scene.add(cenlight);
	}

	const licolor = 0xFFFFFF;
	const liintensity = 1;
	const light = new THREE.DirectionalLight(licolor, liintensity);
	light.position.set(-1,2,5);	//lights default to a target of 0,0,0; moving its position preserves its target
	//scene.add(light);
	
function render(time) {
	time *= 0.001;
	
	//checks if canvas size has changed; if so, update and pass true
	function resizerchecker(renderer) { //returns true if the canvas was resizered
	const canvas = renderer.domElement;
	const width = canvas.clientWidth;
	const height = canvas.clientHeight;
	const needresize = canvas.width !== width || canvas.height !== height;
	if (needresize) {
	renderer.setSize(width, height, false);	//sets internal resolution
	}
	return needresize;
	}	
	if(resizerchecker(renderer)){
	//allows for canvas resizey
	const canvas = renderer.domElement;
	camera.aspect = canvas.clientWidth / canvas.clientHeight;
	camera.updateProjectionMatrix();
	}
	
	objectsman.forEach((obj) => {
		obj.rotation.z = time;
		obj.rotation.y = time;
	});
	
	renderer.render(scene, camera);
	requestAnimationFrame(render);
}
	//render invocation
	requestAnimationFrame(render);
}
main();