import * as THREE from 'three';
import { GLTFLoader } from 'https://unpkg.com/three@0.144.0/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const loader = new GLTFLoader();

camera.position.set(10, 100, -10);
camera.rotation.set(-8, 0, 0);

scene.background = new THREE.Color(0xffffff);

var light = new THREE.PointLight(0x404040, 0.5, 500, 0.5);
light.position.set(0, 150, 0)
scene.add(light);

var dog = false;
loader.load('/assets/models/dog_cutout.glb', function(gltf) {
    dog = gltf.scene;
    dog.scale.set(0.5, 0.5, 0.5);
    dog.position.set(0, -30, 10);
    scene.add(dog);
}, undefined, function(error) {
	console.error(error);
});

var x = 0
document.addEventListener('mousemove', function(e) {
    x = e.pageX;
}, false);

function animate() {
    if (dog) {
        dog.rotateZ(x/5000);
        dog.translateX(0.1);
    }
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

setTimeout(function() {
    alert('There is no puzzle.');
    setTimeout(function() {
        alert('There is NO puzzle.');
        setTimeout(function() {
            alert('Seriously! There isn\'t a puzzle');
            setTimeout(function() {
                alert('Okay. Fine. Since you seem so impatient, I\'ll let you through. Just don\'t tell them I sent you.');
                let code;
                while (code != '0x0d0g') {
                    code = prompt('[[ERROR]] Please input *your [Hyperlink Blocked]:').toLowerCase().replace(/o/g, '0');
                }
                window.location.href = 'gog';
            }, 20000);
        }, 15000);
    }, 10000);
}, 30000);