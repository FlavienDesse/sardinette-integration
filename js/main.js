import {STLLoader} from "./lib/three.js-dev/examples/jsm/loaders/STLLoader.js";
import {OrbitControls} from "./lib/three.js-dev/examples/jsm/controls/OrbitControls.js";


const loader = new STLLoader()






const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.outputEncoding = THREE.sRGBEncoding;

renderer.shadowMap.enabled = true;

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
scene.background = new THREE.Color( 0x72645b );
scene.fog = new THREE.Fog( 0x72645b, 1, 15 );
var mesh
loader.load( '../model/sardinette.stl', function ( geometry ) {
    geometry.center()
    const material = new THREE.MeshPhongMaterial( { color: 0xa0a0a0, specular: 0x111111, shininess: 200,side:THREE.DoubleSide } );
    mesh = new THREE.Mesh( geometry, material );
    mesh.scale.set( 0.1, 0.1, 0.1);
    mesh.rotation.x = -Math.PI/2

    mesh.position.set( 0, 0, 0);
    scene.add( mesh );
} )

camera.position.z = 2;
camera.position.y = 1;


scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );

addShadowedLight( 1, 1, 1, 0xffffff, 1.35 );
addShadowedLight( 0.5, 1, - 1, 0xffaa00, 1 );



const animate = function () {
    requestAnimationFrame( animate );
    const timer = Date.now() * 0.0005;
    if(mesh){
        mesh.rotation.z = timer
    }


    camera.lookAt(  new THREE.Vector3( 0, 0, 0 ) );
    renderer.render( scene, camera );
};

animate();

function addShadowedLight( x, y, z, color, intensity ) {

    const directionalLight = new THREE.DirectionalLight( color, intensity );
    directionalLight.position.set( x, y, z );
    scene.add( directionalLight );

    directionalLight.castShadow = true;

    const d = 1;
    directionalLight.shadow.camera.left = - d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = - d;

    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 4;

    directionalLight.shadow.bias = - 0.002;

}

window.addEventListener("resize", function () {
    var height = window.innerHeight;
    var width = window.innerWidth;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

