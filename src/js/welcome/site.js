$(document).ready(function(){


    /*var swiper3 = new Swiper('.swiper-container.swiper-3', {
     //pagination: '.swiper-pagination-3',
     //direction: 'vertical',
     /!*nextButton: '.swiper-button-next',
     prevButton: '.swiper-button-prev',*!/
     //direction: 'vertical',
     //autoplay: 6000,
     speed: 800,
     slidesPerView: 1,
     paginationClickable: true,
     spaceBetween: 30,
     //mousewheelControl: true,
     //keyboardControl: true,
     parallax: true,
     effect: 'fade',
     onProgress: function (swiper, progress) {
     //canvasSlider(progress);
     }
     });*/



    var mouseX = 0, mouseY = 0, descX = 0, descY = 0, descZ = 20,descRX= 0,descRY= 0,descRZ= 0,

        windowHalfX = window.innerWidth / 2,
        windowHalfY = window.innerHeight / 2,

        camera, scene, renderer, particleSystem;

    var PI2 = Math.PI * 2;

    init();
    animate();
    /*setTimeout(function(){
     init();
     animate();
     },10)*/

    function resetCanvas(){
        descX = 0;
        descY = 0;
        descZ = 20;
        descRX = 0;
        descRY = 0;
        descRZ = 0;
    }
    function canvasSlider(flag){
        if(flag == 0){
            resetCanvas();
        } else if (flag == (1/3)){
            descX = -10;
            descY = 2;
            descZ = 10;
            descRZ = -0.16*Math.PI;
            descRY = 0;
            descRX = Math.PI/6
        } /*else if (flag == (2/5)){
         descX = -22;
         descY = 1.2;
         descZ = 0;
         descRX = -Math.PI/10;
         descRY = 0;
         descRZ = 0;
         } else if (flag == (3/5)){
         descX = -22;
         descY = 2;
         descZ = 0;
         descRX = -Math.PI/10;
         descRY = 0;
         descRZ = 0;
         } else if (flag == (2/3)){
         descX = 0;
         descY = 2;
         descZ = 10;
         descRZ = 0.08*Math.PI;
         descRY = 0;
         descRX = 0;
         } */
        else if (flag == (2/3)){
            descX = 10;
            descY = 2;
            descZ = 10;
            descRZ = 0.16*Math.PI;
            descRY = 0;
            descRX = Math.PI/6
        } else if (flag == 1){
            descX = 0;
            descY = 6;
            descZ = 20;
            descRZ = 0;
            descRY = 0;
            descRX = -Math.PI/32;
        }
    }
    function init() {

        var container, galaxy ;

        container = document.createElement('div');
        document.querySelector("#canvas").appendChild(container);

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
        camera.position.x = 0;
        camera.position.z = 10;
        camera.position.y = 0;
        //camera.lookAt(new THREE.Vector3(0, 0, 0 ))
        /*controls = new THREE.OrbitControls( camera );
         controls.addEventListener( 'change', render );*/

        scene = new THREE.Scene();

        renderer = Detector.webgl? new THREE.WebGLRenderer(): document.getElementById("message").textContent = "Your browser does not support WebGL.";
        renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( renderer.domElement );

        // Generate the circle texture
        var circleTexture = new THREE.Texture(generateCircleTexture());
        circleTexture.needsUpdate = true;

        // Set up the shaders
        attributes = {
            size: {	type: 'f', value: [] },
            ca:   {	type: 'c', value: [] }
        };

        uniforms = {
            amplitude: { type: "f", value: 1.0 },
            color:     { type: "c", value: new THREE.Color( 0xe0e0e0 ) },
            texture:   { type: "t", value: circleTexture },
        };

        uniforms.texture.value.wrapS = uniforms.texture.value.wrapT = THREE.RepeatWrapping;

        var shaderMaterial = new THREE.ShaderMaterial( {
            uniforms: 		uniforms,
            attributes:     attributes,
            vertexShader:   document.getElementById( 'vertexshader' ).textContent,
            fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
            transparent:	true
        });

        // Galaxy properties
        var galaxy = new THREE.Geometry();
        var starsPerArm = 900;
        var arms = 5;
        var armAngle = 270 / arms;

        // Create the galaxy structure
        for (arm = 0; arm < arms; arm++) {
            for (i = 0; i <= starsPerArm; i++) {

                radius = i / 40;
                angle = i / 100 + (armAngle * (arm + 1));

                x = radius * Math.cos(angle) + rand();
                y = rand() / 5;
                z = radius * Math.sin(angle) + rand();

                // Add stars
                randResult = Math.random() * (starsPerArm);
                if(randResult < i*i) {
                    galaxy.vertices.push(new THREE.Vector3(x + rand(), y + rand(), z + rand()));
                }

                // Add about 50% more stars with some position variation for a better result
                galaxy.vertices.push(new THREE.Vector3(x, y, z));
                if(rand() >= 0) {
                    galaxy.vertices.push(new THREE.Vector3(x + rand(), y + rand(), z + rand()));
                }
            }
        }

        // Create the particle system
        particleSystem = new THREE.ParticleSystem(galaxy, shaderMaterial);
        particleSystem.sortParticles = true;
        // Data to send to the shader
        var vertices = particleSystem.geometry.vertices;
        var values_size = attributes.size.value;
        var values_color = attributes.ca.value;
        console.log("vertices = " + vertices.length);

        // Color variation
        for( var v = 0; v < vertices.length; v++ ) {

            values_size[ v ] = 0.2 + rand();

            /*var symbol = document.createElement( 'div' );
             symbol.className = 'star';
             var object = new THREE.CSS3DObject( symbol );
             object.position.x = Math.random() * 4000 - 2000;
             object.position.y = Math.random() * 4000 - 2000;
             object.position.z = Math.random() * 4000 - 2000;
             scene.add( object );*/

            values_color[ v ] = new THREE.Color( 0xffffff );
            var starType = Math.random();
            //values_color[ v ].setRGB(255, 255, 255)
            //v%100?values_color[ v ].setRGB(255, 255, 255):values_color[ v ].setRGB(75/255, 165/255, 117/255);
        }

        /*renderer1 = new THREE.CSS3DRenderer();
         renderer1.setSize( window.innerWidth/2, window.innerHeight/2 );
         renderer1.domElement.style.position = 'absolute';
         renderer1.domElement.style.top = 0;
         document.getElementById( 'canvas' ).appendChild( renderer1.domElement );*/

        // Add the particle system to the scene
        scene.add(particleSystem);

        // Resize listener
        window.addEventListener( 'resize', onWindowResize, false );
        //document.addEventListener( 'mousemove', onMouseMove, false );
        renderer.setClearColor( 0x22222c, 0);
    }

    function generateCircleTexture() {

        // draw a circle in the center of the canvas
        var size = 64;

        // create canvas
        var canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;

        // get context
        var context = canvas.getContext('2d');

        // draw circle
        var centerX = size / 2;
        var centerY = size / 2;
        var radius = size / 2;

        for(var i = 1; i < 33; i++) {
            context.beginPath();
            context.arc(centerX, centerY, (radius / 2) + (i / 2), 0, 2 * Math.PI, false);
            context.fillStyle = "rgba(224, 224, 224, " + (1 / i) + ")";
            context.fill();
        }

        return canvas;
    }

    function onWindowResize() {

        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function animate() {

        particleSystem.rotation.y += 0.0001;
        //controls.update();
        requestAnimationFrame( animate );
        render();
    }

    function render() {
        // camera.lookAt(scene.position);
        /*camera.position.x += ( descX - camera.position.x ) * 0.0005;
         camera.position.y += ( descY - camera.position.y ) * 0.0005;
         camera.position.y += ( descY - camera.position.y ) * 0.0005;*/

        camera.position.x += ( descX - camera.position.x ) * 0.05;
        camera.position.y += ( descY - camera.position.y ) * 0.05;
        camera.position.z += ( descZ - camera.position.z ) * 0.05;
        camera.rotation.x += ( descRX - camera.rotation.x ) * 0.05;
        camera.rotation.y += ( descRY - camera.rotation.y ) * 0.05;
        camera.rotation.z += ( descRZ - camera.rotation.z ) * 0.05;
        renderer.render( scene, camera );

    }

    function rand() {
        return Math.random() - 0.5;
    }

    function onMouseMove(e) {

        mouseX = e.clientX - windowHalfX;
        mouseY = e.clientY - windowHalfY;
    }

    /*    (function() {
     'use strict';
     /!* 	'To actually be able to display anything with Three.js, we need three things:
     A scene, a camera, and a renderer so we can render the scene with the camera.'

     - http://threejs.org/docs/#Manual/Introduction/Creating_a_scene 		*!/

     var scene, camera, renderer;

     /!* We need this stuff too *!/
     var container, aspectRatio,
     HEIGHT, WIDTH, fieldOfView,
     nearPlane, farPlane,
     mouseX, mouseY, windowHalfX,
     windowHalfY, stats, geometry,
     starStuff, materialOptions, stars;

     init();
     animate();

     function init() {
     container = document.createElement('div');
     document.querySelector('#canvas').appendChild( container );
     //document.body.style.overflow = 'hidden';

     HEIGHT = window.innerHeight;
     WIDTH = window.innerWidth;
     aspectRatio = WIDTH / HEIGHT;
     fieldOfView = 75;
     nearPlane = 1;
     farPlane = 2000;
     mouseX = 0;
     mouseY = 0;

     windowHalfX = WIDTH / 2;
     windowHalfY = HEIGHT / 2;

     /!* 	fieldOfView — Camera frustum vertical field of view.
     aspectRatio — Camera frustum aspect ratio.
     nearPlane — Camera frustum near plane.
     farPlane — Camera frustum far plane.

     - http://threejs.org/docs/#Reference/Cameras/PerspectiveCamera

     In geometry, a frustum (plural: frusta or frustums)
     is the portion of a solid (normally a cone or pyramid)
     that lies between two parallel planes cutting it. - wikipedia.		*!/

     camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

     //Z positioning of camera

     camera.position.z = farPlane / 2;

     scene = new THREE.Scene({antialias:true});
     scene.fog = new THREE.FogExp2( 0x000000, 0.0003 );

     // The wizard's about to get busy.
     starForge();

     //check for browser Support
     if (webGLSupport()) {
     //yeah?  Right on...
     renderer = new THREE.WebGLRenderer({alpha: true});

     } else {
     //No?  Well that's okay.
     renderer = new THREE.CanvasRenderer();
     }

     renderer.setClearColor(0x000011, 1);
     renderer.setPixelRatio(window.devicePixelRatio);
     renderer.setSize( WIDTH, HEIGHT);
     container.appendChild(renderer.domElement);

     /!*stats = new Stats();
     stats.domElement.style.position = 'absolute';
     stats.domElement.style.top = '0px';
     stats.domElement.style.right = '0px';
     container.appendChild( stats.domElement );*!/

     window.addEventListener( 'resize', onWindowResize, false );
     document.addEventListener( 'mousemove', onMouseMove, false );

     }

     function animate() {
     requestAnimationFrame(animate);
     render();
     //stats.update();
     }


     function render() {
     camera.position.x += ( mouseX - camera.position.x ) * 0.005;
     camera.position.y += ( - mouseY - camera.position.y ) * 0.005;
     camera.lookAt( scene.position );
     renderer.render(scene, camera);
     }

     function webGLSupport() {
     /!* 	The wizard of webGL only bestows his gifts of power
     to the worthy.  In this case, users with browsers who 'get it'.		*!/

     try {
     var canvas = document.createElement('canvas');
     return !!(window.WebGLRenderingContext && (
     canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
     );
     } catch(e) {
     // console.warn('Hey bro, for some reason we\'re not able to use webGL for this.  No biggie, we\'ll use canvas.');
     return false;
     }
     }

     function onWindowResize() {

     // Everything should resize nicely if it needs to!
     var WIDTH = window.innerWidth,
     HEIGHT = window.innerHeight;

     camera.aspect = aspectRatio;
     camera.updateProjectionMatrix();
     renderer.setSize(WIDTH, HEIGHT);
     }

     function starForge() {
     /!* 	Yep, it's a Star Wars: Knights of the Old Republic reference,
     are you really surprised at this point?
     *!/
     var starQty = 45000;
     geometry = new THREE.SphereGeometry(500, 100, 50);

     materialOptions = {
     size: 1.0, //I know this is the default, it's for you.  Play with it if you want.
     transparency: true,
     opacity: 0.7
     };

     starStuff = new THREE.PointCloudMaterial(materialOptions);

     // The wizard gaze became stern, his jaw set, he creates the cosmos with a wave of his arms

     for (var i = 0; i < starQty; i++) {

     var starVertex = new THREE.Vector3();
     starVertex.x = Math.random() * 1000 - 500;
     starVertex.y = Math.random() * 63 - 30;
     starVertex.z = Math.random() * 1000 - 500;

     geometry.vertices.push(starVertex);

     }


     stars = new THREE.PointCloud(geometry, starStuff);
     scene.add(stars);
     }

     function onMouseMove(e) {

     mouseX = e.clientX - windowHalfX;
     mouseY = e.clientY - windowHalfY;
     }

     })();*/


    var cardsRender = function(){
        var table = [
            ["0", "Hadoop", "1.00794", 1, 1 ],
            ["0", "Hadoop", "4.002602", 18, 1 ],
            ["0", "Hadoop", "6.941", 1, 2 ],
            ["0", "Hadoop", "9.012182", 2, 2 ],
            ["0", "Hadoop", "10.811", 13, 2 ],
            ["0", "Hadoop", "12.0107", 14, 2 ],
            ["0", "Hadoop", "14.0067", 15, 2 ],
            ["0", "Hadoop", "15.9994", 16, 2 ],
            ["0", "Hadoop", "18.9984032", 17, 2 ],
            ["0", "Hadoop", "20.1797", 18, 2 ],
            ["0", "Hadoop", "22.98976...", 1, 3 ],
            ["0", "Hadoop", "24.305", 2, 3 ],
            ["0", "Spark", "26.9815386", 13, 3 ],
            ["0", "Spark", "28.0855", 14, 3 ],
            ["0", "Spark", "30.973762", 15, 3 ],
            ["0", "Spark", "32.065", 16, 3 ],
            ["0", "Spark", "35.453", 17, 3 ],
            ["0", "Spark", "39.948", 18, 3 ],
            ["0", "Spark", "39.948", 1, 4 ],
            ["0", "Spark", "40.078", 2, 4 ],
            ["0", "Spark", "44.955912", 3, 4 ],
            ["0", "Spark", "47.867", 4, 4 ],
            ["1", "Spark", "50.9415", 5, 4 ],
            ["1", "Spark", "51.9961", 6, 4 ],
            ["1", "Spark", "54.938045", 7, 4 ],
            ["1", "Spark", "55.845", 8, 4 ],
            ["1", "Spark", "58.933195", 9, 4 ],
            ["1", "Spark", "58.6934", 10, 4 ],
            ["1", "Hive", "63.546", 11, 4 ],
            ["1", "Hive", "65.38", 12, 4 ],
            ["1", "Hive", "69.723", 13, 4 ],
            ["1", "Hive", "72.63", 14, 4 ],
            ["1", "Hive", "74.9216", 15, 4 ],
            ["1", "Hive", "78.96", 16, 4 ],
            ["1", "Hive", "79.904", 17, 4 ],
            ["1", "Hive", "83.798", 18, 4 ],
            ["1", "Hive", "85.4678", 1, 5 ],
            ["1", "Hive", "87.62", 2, 5 ],
            ["1", "Hive", "88.90585", 3, 5 ],
            ["1", "Hive", "91.224", 4, 5 ],
            ["1", "Pig", "92.90628", 5, 5 ],
            ["1", "Pig", "95.96", 6, 5 ],
            ["1", "Pig", "(98)", 7, 5 ],
            ["1", "Pig", "101.07", 8, 5 ],
            ["0", "Pig", "102.9055", 9, 5 ],
            ["0", "Pig", "106.42", 10, 5 ],
            ["0", "Pig", "107.8682", 11, 5 ],
            ["0", "Pig", "112.411", 12, 5 ],
            ["0", "HBase", "114.818", 13, 5 ],
            ["0", "HBase", "118.71", 14, 5 ],
            ["0", "HBase", "121.76", 15, 5 ],
            ["0", "HBase", "127.6", 16, 5 ],
            ["0", "HBase", "126.90447", 17, 5 ],
            ["0", "HBase", "131.293", 18, 5 ],
            ["0", "HBase", "132.9054", 1, 6 ],
            ["0", "HBase", "132.9054", 2, 6 ],
            ["0", "HBase", "138.90547", 4, 9 ],
            ["0", "HBase", "140.116", 5, 9 ],
            ["0", "HBase", "140.90765", 6, 9 ],
            ["0", "HBase", "144.242", 7, 9 ],
            ["0", "HBase", "(145)", 8, 9 ],
            ["0", "MapReduce", "150.36", 9, 9 ],
            ["0", "MapReduce", "151.964", 10, 9 ],
            ["0", "MapReduce", "157.25", 11, 9 ],
            ["0", "MapReduce", "158.92535", 12, 9 ],
            ["0", "MapReduce", "162.5", 13, 9 ],
            ["0", "MapReduce", "164.93032", 14, 9 ],
            ["0", "MapReduce", "167.259", 15, 9 ],
            ["0", "MapReduce", "168.93421", 16, 9 ],
            ["0", "MapReduce", "173.054", 17, 9 ],
            ["1", "MapReduce", "174.9668", 18, 9 ],
            ["1", "MapReduce", "178.49", 4, 6 ],
            ["1", "MapReduce", "180.94788", 5, 6 ],
            ["1", "MapReduce", "183.84", 6, 6 ],
            ["1", "JAVA", "186.207", 7, 6 ],
            ["1", "JAVA", "190.23", 8, 6 ],
            ["1", "JAVA", "192.217", 9, 6 ],
            ["1", "JAVA", "195.084", 10, 6 ],
            ["1", "JAVA", "196.966569", 11, 6 ],
            ["1", "JAVA", "200.59", 12, 6 ],
            ["1", "JAVA", "204.3833", 13, 6 ],
            ["1", "JAVA", "207.2", 14, 6 ],
            ["1", "JAVA", "208.9804", 15, 6 ],
            ["1", "JAVA", "(209)", 16, 6 ],
            ["1", "Python", "(210)", 17, 6 ],
            ["1", "Python", "(222)", 18, 6 ],
            ["1", "Python", "(223)", 1, 7 ],
            ["1", "Python", "(226)", 2, 7 ],
            ["1", "Python", "(227)", 4, 10 ],
            ["1", "Python", "232.03806", 5, 10 ],
            ["1", "Python", "231.0588", 6, 10 ],
            ["1", "Python", "238.02891", 7, 10 ],
            ["0", "Python", "(237)", 8, 10 ],
            ["0", "Python", "(244)", 9, 10 ],
            ["0", "Python", "(243)", 10, 10 ],
            ["0", "Python", "(247)", 11, 10 ],
            ["0", "Python", "(247)", 12, 10 ],
            ["0", "Python", "(251)", 13, 10 ],
            ["0", "Scala", "(252)", 14, 10 ],
            ["0", "Scala", "(257)", 15, 10 ],
            ["0", "Scala", "(258)", 16, 10 ],
            ["0", "Scala", "(259)", 17, 10 ],
            ["0", "Scala", "(262)", 18, 10 ],
            ["0", "Scala", "(267)", 4, 7 ],
            ["0", "Scala", "(268)", 5, 7 ],
            ["0", "Scala", "(271)", 6, 7 ],
            ["0", "Scala", "(272)", 7, 7 ],
            ["0", "Scala", "(270)", 8, 7 ],
            ["0", "Scala", "(276)", 9, 7 ],
            ["0", "Scala", "(281)", 10, 7 ],
            ["0", "Scala", "(280)", 11, 7 ],
            ["0", "Scala", "(285)", 12, 7 ],
            ["0", "Scala", "(284)", 13, 7 ],
            ["0", "R", "(289)", 14, 7 ],
            ["1", "R", "(288)", 15, 7 ],
            ["1", "R", "(293)", 16, 7 ],
            ["1", "R", "(294)", 17, 7 ],
            ["1", "R", "(294)", 18, 7 ]
        ];

        var camera, renderer;
        var geometry, material, mesh;

        var controls;

        var objects = [];
        var targets = { table: [], sphere: [], helix: [], grid: [] };

        init();
        animate();

        function init() {

            camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 5000 );
            /*camera.position.x = 1669.724366368262;
             camera.position.y = -1096.3282553804638;
             camera.position.z = -3959.260481186094;
             camera.rotation.x = 2.8714587679990573;
             camera.rotation.y = 0.38603929227754435;
             camera.rotation.z = 1.3487607278856675;*/
            //camera.position.z = 1800;
            //camera.position.x = 1800;
            camera.position.z = 2800;
            //camera.position.y = 500;

            /*scene = new THREE.Scene();
             window.cardScene = scene;*/
            for ( var i = 0; i < table.length; i ++ ) {

                var item = table[ i ];

                var element = document.createElement( 'div' );
                element.className = 'element';
                element.style.backgroundColor = 'rgba(35,170,124,' + ( Math.random() * 0.5 + 0.25 ) + ')';

                var number = document.createElement( 'div' );
                number.className = 'number';
                number.textContent = i + 1;
                element.appendChild( number );

                var symbol = document.createElement( 'div' );
                symbol.className = 'symbol';
                symbol.textContent = item[ 0 ];
                element.appendChild( symbol );

                var details = document.createElement( 'div' );
                details.className = 'details';
                details.innerHTML = item[ 1 ] + '<br>' + item[ 2 ];
                element.appendChild( details );

                var object = new THREE.CSS3DObject( element );
                object.position.x = Math.random() * 4000 - 2000;
                object.position.y = Math.random() * 4000 - 2000;
                object.position.z = Math.random() * 4000 - 2000;
                scene.add( object );

                objects.push( object );

            }

            // table

            for ( var i = 0; i < objects.length; i ++ ) {

                var item = table[ i ];
                var object = objects[ i ];

                var object = new THREE.Object3D();
                object.position.x = ( item[ 3 ] * 160 ) - 1540;
                object.position.y = - ( item[ 4 ] * 200 ) + 1100;

                targets.table.push( object );

            }

            // sphere

            var vector = new THREE.Vector3();

            for ( var i = 0, l = objects.length; i < l; i ++ ) {

                var object = objects[ i ];

                var phi = Math.acos( -1 + ( 2 * i ) / l );
                var theta = Math.sqrt( l * Math.PI ) * phi;

                var object = new THREE.Object3D();

                object.position.x = 1000 * Math.cos( theta ) * Math.sin( phi );
                object.position.y = 1000 * Math.sin( theta ) * Math.sin( phi );
                object.position.z = 1000 * Math.cos( phi );

                vector.copy( object.position ).multiplyScalar( 2 );

                object.lookAt( vector );

                targets.sphere.push( object );

            }

            // helix

            var vector = new THREE.Vector3();

            for ( var i = 0, l = objects.length; i < l; i ++ ) {

                var object = objects[ i ];

                var phi = i * 0.175 + Math.PI;

                var object = new THREE.Object3D();

                object.position.x = 1100 * Math.sin( phi );
                object.position.y = - ( i * 8 ) + 450;
                object.position.z = 1100 * Math.cos( phi );

                vector.copy( object.position );
                vector.x *= 2;
                vector.z *= 2;

                object.lookAt( vector );

                targets.helix.push( object );

            }

            // grid

            for ( var i = 0; i < objects.length; i ++ ) {

                var object = objects[ i ];

                var object = new THREE.Object3D();

                object.position.x = ( ( i % 5 ) * 400 ) - 800;
                object.position.y = ( - ( Math.floor( i / 5 ) % 5 ) * 400 ) + 800;
                object.position.z = -( Math.floor( i / 25 ) ) * 1000 + 1000;

                targets.grid.push( object );

            }

            //

            renderer = new THREE.CSS3DRenderer();
            renderer.setSize( window.innerWidth*0.4, window.innerHeight );
            renderer.domElement.style.position = 'absolute';
            renderer.domElement.style.top = 0;
            document.getElementById( 'cards' ).appendChild( renderer.domElement );

            //

            /*controls = new THREE.TrackballControls( camera, renderer.domElement );
             controls.rotateSpeed = 0.5;
             controls.addEventListener( 'change', render );*/

            /*var button = document.getElementById( 'table' );
             button.addEventListener( 'click', function ( event ) {

             transform( targets.table, 2000 );

             }, false );*/

            var button = document.getElementById( 'sphere' );
            button.addEventListener( 'click', function ( event ) {

                transform( targets.sphere, 2000 );

            }, false );

            var button = document.getElementById( 'helix' );
            button.addEventListener( 'click', function ( event ) {

                transform( targets.helix, 2000 );

            }, false );

            var button = document.getElementById( 'grid' );
            button.addEventListener( 'click', function ( event ) {

                transform( targets.grid, 2000 );

            }, false );

            window.cardsKickoff = function(){
                transform( targets.grid, 0 );
            }

            //

            window.addEventListener( 'resize', onWindowResize, false );

        }

        function transform( targets, duration ) {

            TWEEN.removeAll();

            for ( var i = 0; i < objects.length; i ++ ) {

                var object = objects[ i ];
                var target = targets[ i ];

                new TWEEN.Tween( object.position )
                    .to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
                    .easing( TWEEN.Easing.Exponential.InOut )
                    .start();

                new TWEEN.Tween( object.rotation )
                    .to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
                    .easing( TWEEN.Easing.Exponential.InOut )
                    .start();

            }

            new TWEEN.Tween( this )
                .to( {}, duration * 2 )
                .onUpdate( render )
                .start();

        }

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth*0.4, window.innerHeight );

        }

        function animate() {

            requestAnimationFrame( animate );

            TWEEN.update();
            //controls.update();

        }

        function render() {

            renderer.render( scene, camera );

        }

        return transform.bind(this)
    };

    !window.cardScene && cardsRender();

    var swiper = new Swiper('.swiper-container.swiper-1', {
        pagination: '.swiper-pagination-1',
        direction: 'vertical',
        /*nextButton: '.swiper-button-next',
         prevButton: '.swiper-button-prev',*/
        //direction: 'vertical',
        //autoplay: 6000,
        speed: 800,
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 30,
        mousewheelControl: true,
        keyboardControl: true,
        parallax: true,
        effect: 'fade',
        onProgress: function (swiper, progress) {
            $(".cards").removeClass("active");
            $('.connect-wrapper',swiper.slides[1]).removeClass("active");
            if(progress == 0){

            } else if (progress == (1/3)){
                switchInnerSlider(0,swiper.slides[1]);
            } else if (progress == (2/3)){
                $(".cards").addClass("active");
                window.cardsKickoff();
                switchInnerSlider(0,swiper.slides[2]);
            } else if (progress == 1){

            }
            canvasSlider(progress);
        }
    });

    $('.wrapper a.subtitle',swiper.slides[1]).each(function(i,r){
        $(r).on("click", function(){
            switchInnerSlider(i,swiper.slides[1]);
            if(i == 1){
                $('.connect-wrapper',swiper.slides[1]).addClass("active");
            } else {
                $('.connect-wrapper',swiper.slides[1]).removeClass("active");
            }
        })
    });
    $('.first',swiper.slides[1]).click(function(){
        /*$('.connect-wrapper',swiper.slides[1]).removeClass("active");
         setTimeout(function(){
         $('.connect-wrapper',swiper.slides[1]).addClass("active");
         });*/
    })
    $('.wrapper a.subtitle',swiper.slides[2]).each(function(i,r){
        $(r).on("click", function(){
            switchInnerSlider(i,swiper.slides[2]);
        })
    });

//var navigatorSlider = $(".navigator>.icon");
    $(".navigator>.icon").on("click", function(e){
        e.stopPropagation();
        if($(".navigator").hasClass("toggle")){
            $(".navigator").removeClass("toggle");
            $(".swiper-container .swiper-pagination").addClass("dynamic").removeClass("toggle");
        } else {
            $(".navigator").addClass("toggle");
            $(".swiper-container .swiper-pagination").addClass("dynamic").addClass("toggle");
        }
    })
    $(".navigator").on("click", function(e){
        e.stopPropagation();
    })
    $(document.body).on("click", function(e){
        $(".navigator").removeClass("toggle");
        $(".swiper-container .swiper-pagination").addClass("dynamic").removeClass("toggle");
    })



    var switchInnerSlider = function(index,scopeDOM){
        $(".text-wrapper",scopeDOM).removeClass("active");
        $(".text-wrapper",scopeDOM).eq(index).addClass("active");

    }
});