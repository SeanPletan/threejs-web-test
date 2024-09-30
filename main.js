import * as THREE from 'three';

/*const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material); scene.add(cube);

camera.position.z = 5;*/

///////////////////////////////////////////////////////////////////////
//                        END FIRST ITERATION                        //
///////////////////////////////////////////////////////////////////////


/*function main() {

    const canvas = document.querySelector( '#c' );
    const renderer = new THREE.WebGLRenderer( { antialias: true, canvas, alpha: true } );
    renderer.setAnimationLoop(animate);

    const fov = 75;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.z = 2;

    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry( 1,1,1 );
    const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } ); // greenish blue
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    renderer.render( scene, camera );

    function animate() {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01; renderer.render(scene, camera);
    }

}

main();*/

////////////////////////////////////////////////////////////////////////
//                        END SECOND ITERATION                        //
////////////////////////////////////////////////////////////////////////


function main() {

	const canvas = document.querySelector( '#c' );
	const renderer = new THREE.WebGLRenderer( { antialias: true, canvas, alpha: true } );

	function makeScene( elem ) {

		const scene = new THREE.Scene();

		const fov = 45;
		const aspect = 2; // the canvas default
		const near = 0.1;
		const far = 5;
		const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
		camera.position.set( 0, 1, 2 );
		camera.lookAt( 0, 0, 0 );

		{

			const color = 0xFFFFFF;
			const intensity = 3;
			const light = new THREE.DirectionalLight( color, intensity );
			light.position.set( - 1, 2, 4 );
			scene.add( light );

		}

		return { scene, camera, elem };

	}

	function setupScene1() {

		const sceneInfo = makeScene( document.querySelector( '#box' ) );
		const geometry = new THREE.BoxGeometry( 1, 1, 1 );
		const material = new THREE.MeshPhongMaterial( { color: 'blue' } );
		const mesh = new THREE.Mesh( geometry, material );
		sceneInfo.scene.add( mesh );
		sceneInfo.mesh = mesh;
		return sceneInfo;
	}

	function setupScene2() {

		const sceneInfo = makeScene( document.querySelector( '#pyramid' ) );
		const radius = .8;
		const widthSegments = 4;
		const heightSegments = 2;
		const geometry = new THREE.SphereGeometry( radius, widthSegments, heightSegments );
		const material = new THREE.MeshPhongMaterial( {
			color: 'red',
			flatShading: true,
		} );
		const mesh = new THREE.Mesh( geometry, material );
		sceneInfo.scene.add( mesh );
		sceneInfo.mesh = mesh;
		return sceneInfo;
		

	}

	function setupScene3() {
		const sceneInfo = makeScene(document.querySelector('#skull'));
		const geometry = new THREE.BoxGeometry( .8,.8, .8 );
		const material = new THREE.MeshPhongMaterial( { color: 'yellow' } );
		const mesh = new THREE.Mesh( geometry, material );
		sceneInfo.scene.add( mesh );
		sceneInfo.mesh = mesh;

		return sceneInfo;
	}

	const sceneInfo1 = setupScene1();
	const sceneInfo2 = setupScene2();
	const sceneInfo3 = setupScene3();

	function resizeRendererToDisplaySize( renderer ) {

		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if ( needResize ) {

			renderer.setSize( width, height, false );

		}

		return needResize;

	}

	function renderSceneInfo( sceneInfo ) {

		const { scene, camera, elem } = sceneInfo;

		// get the viewport relative position of this element
		const { left, right, top, bottom, width, height } =
        elem.getBoundingClientRect();

		const isOffscreen =
        bottom < 0 ||
        top > renderer.domElement.clientHeight ||
        right < 0 ||
        left > renderer.domElement.clientWidth;

		if ( isOffscreen ) {

			return;

		}

		camera.aspect = width / height;
		camera.updateProjectionMatrix();

		const positiveYUpBottom = renderer.domElement.clientHeight - bottom;
		renderer.setScissor( left, positiveYUpBottom, width, height );
		renderer.setViewport( left, positiveYUpBottom, width, height );

		renderer.render( scene, camera );

	}

	function render( time ) {

		time *= 0.001;

		resizeRendererToDisplaySize( renderer );

		renderer.setScissorTest( false );
		renderer.clear( true, true );
		renderer.setScissorTest( true );

		sceneInfo1.mesh.rotation.y = time;
        sceneInfo1.mesh.rotation.x = time;
		sceneInfo2.mesh.rotation.y = time;
        sceneInfo2.mesh.rotation.x = time;
		sceneInfo3.mesh.rotation.y = time;
        sceneInfo3.mesh.rotation.x = time;

		renderSceneInfo( sceneInfo1 );
		renderSceneInfo( sceneInfo2 );
		renderSceneInfo( sceneInfo3 );

		requestAnimationFrame( render );

	}

	requestAnimationFrame( render );

}

main();