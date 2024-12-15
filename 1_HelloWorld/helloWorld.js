import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

// Initial
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
scene.background = new THREE.Color(0x1f1f1f);
document.body.appendChild(renderer.domElement)


// Text geometries
let textMesh;
const fontLoader = new FontLoader();
fontLoader.load(
  './assets/fonts/Roboto_Regular.json',
  function (font) {

    // Text shape
    const textGeometry = new TextGeometry("Hello World!", {
      font: font,
      size: 0.5,
      height: 0.1,
      curveSegments: 12,
      bevelEnabled: false
    })

    // Calculate the bounding box of the text geometry
    textGeometry.computeBoundingBox();
    const boundingBox = textGeometry.boundingBox;

    // Calculate the center offset
    const centerOffset = -0.5 * (boundingBox.max.x - boundingBox.min.x);

    // Text Texture
    const textMaterial = new THREE.MeshBasicMaterial({
      color: 0xfabd2f
    })

    // Text Mesh
    textMesh = new THREE.Mesh(textGeometry, textMaterial)

    // Set the position of the text mesh to center it
    textMesh.position.x = centerOffset;
    textMesh.position.y = 0;
    textMesh.position.z = 0;

    scene.add(textMesh)
  },

  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },

  function (err) {
    console.log('Could not load font!');
  }
)

// Camera Pos
camera.position.z = 6;

// Function to handle window resize
function onWindowResize() {
  // Update camera aspect ratio
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // Update renderer size
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

// Rendering & rotation
function animate() {
  renderer.setAnimationLoop(animate);

  if (textMesh) {
    textMesh.rotation.x += 0.02;
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
