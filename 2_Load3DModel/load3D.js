import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Initial
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);
// const axesHelper = new THREE.AxesHelper(5); scene.add(axesHelper);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
scene.background = new THREE.Color(0x1f1f1f);
document.body.appendChild(renderer.domElement)

// Loader
const loader = new OBJLoader();

let catObj;
loader.load('./assets/cat/12222_Cat_v1_l3.obj', function (object) {

  catObj = object;

  object.scale.set(0.15, 0.15, 0.15);

  object.rotation.y = 0;
  object.rotation.z = 0;
  object.rotation.x = 0;

  const textureLoader = new THREE.TextureLoader();
  textureLoader.load('./assets/cat/Cat_diffuse.jpg', function (texture) {

    const catTexture = new THREE.MeshBasicMaterial({ map: texture })
    // Traverse the object to apply the material to each mesh
    object.traverse(function (child) {
      if (child.isMesh) {
        child.material = catTexture; // Apply the texture material to the mesh
      }
    });

    scene.add(object)
  },
  );

}, undefined, function (error) {

  console.error(error);

});

// Camera Pos
// camera.position.x = 0.8;
camera.position.y = -10;
camera.position.z = 5;

// Rendering & rotation
function animate() {
  renderer.setAnimationLoop(animate);

  controls.update();

  if (catObj) {
    catObj.rotation.z -= 0.01;
  }

  renderer.render(scene, camera);
}

// Check Compat
if (WebGL.isWebGL2Available()) {
  animate();
} else {
  const warning = WebGL.getWebGL2ErrorMessage();
  document.getElementById('container').appendChild(warning);
}

