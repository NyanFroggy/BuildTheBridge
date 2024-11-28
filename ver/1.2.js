const scene = new THREE.Scene();
const b=document.body;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x7fffff, 1);
document.body.appendChild(renderer.domElement);

const texl=new THREE.TextureLoader()
texl.setPath("https://9b7b7c97-b8f5-4f59-9e53-31931c7079c4-00-16i9pwelwgym6.picard.replit.dev/textures/game/blocks/")

const dirt=texl.load("dirt")
const grtex_side=texl.load("grass-block-side")
const grtex_top=texl.load("grass-block-top")
const grmat=[
	new THREE.MeshBasicMaterial({map:grtex_top}),
	new THREE.MeshBasicMaterial({map:grtex_side}),
	new THREE.MeshBasicMaterial({map:grtex_top}),
	new THREE.MeshBasicMaterial({map:dirt}),
	new THREE.MeshBasicMaterial({map:grtex_side}),
	new THREE.MeshBasicMaterial({map:grtex_top})
]

const pl = {
	geo: new THREE.BoxGeometry(0.7,0.7,0.7),
	mat: new THREE.MeshBasicMaterial({color:0x800000})
};

const bl = {
	geo: new THREE.BoxGeometry(1,1,1),
	mat: new THREE.MeshFaceMaterial(grmat)
};

var posz=-1;
var posx=-1;
var block;
while (posz<2){
	while (posx<2){
		block=new THREE.Mesh(bl.geo,bl.mat)
		block.position.z=posz;
		block.position.x=posx;
		scene.add(block);

		posx++;
	}
	posx=-1;
	posz++;
}

const player=new THREE.Mesh(pl.geo,pl.mat);
player.position.y=1
scene.add(player)

const camera = new THREE.PerspectiveCamera(
	60,
	window.innerWidth / window.innerHeight,
	1,
	20
);

camera.position.z=5;
camera.position.x=5;
camera.position.y=3;
camera.rotation.x=THREE.Math.degToRad(-20);
camera.rotation.y=THREE.Math.degToRad(20);
camera.rotation.z=THREE.Math.degToRad(10);
var p=0;
var up=0;
var ch=0;

var start=false;

var keny = "";
var lastx = 1;
var speed = 0.1;
var keys=["W","A","S","D"];
var cols=[0xFF7276,0x90EE90,0x7289DA,0xFFFF00]

function random(list){
	return Math.floor(Math.random()* list.length);
}

document.addEventListener('keypress', (e)=>{
	var c=e.key;
console.log(key)
	if (start){
		if (c==keny.toLowerCase() && player.position.x > lastx-0.5){
			var block=new THREE.Mesh(bl.geo,bl.mat)
			lastx++;
			block.position.x = lastx;
			scene.add(block);
			keny=keys[random(keys)];
			document.getElementById('k').innerText = keny;
			p+=10;
		}
	}
	else{
		if (c='Enter'){
			start = true;
			keny=keys[random(keys)];
			document.getElementById('k').innerText = keny;
		}
	}
	
	var key=document.getElementById('k');
})

speed=0.001;
setInterval(()=>{
	if (start){
		player.position.x+=speed;
		player.position.x+=speed;
	}
	renderer.render(scene,camera);

},10)
