function main()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );

    var light = new THREE.PointLight();
    light.position.set( 5, 5, 5 );
    scene.add( light );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var vertices = [
        [ -1,  1, 0 ], // 0
        [ -1, -1, 0 ], // 1
        [  1, -1, 0 ],  // 2
	[  1,  1, 0 ]  //3
    ];

    var faces = [
        [ 0, 1, 2 ], // f0
	[ 0, 2, 3 ]  // f1
    ];

    var scalars = [
        0.1,   // S0
        0.2, // S1
        0.8,  // S2
	0.5  //S3
    ];

    // Create color map
    var cmap = [];
    for ( var i = 0; i < 9; i++ )
    {
        var S = i*0.1 / 0.8; // [0,1]
        var R = Math.max( Math.cos( ( S - 1.0 ) * Math.PI ), 0.0 );
        var G = Math.max( Math.cos( ( S - 0.5 ) * Math.PI ), 0.0 );
        var B = Math.max( Math.cos( S * Math.PI ), 0.0 );
        var color = new THREE.Color( R, G, B );
        cmap.push( [ S, '0x' + color.getHexString() ] );
    }

    // Draw color map
    var lut = new THREE.Lut( 'rainbow', cmap.length );
    lut.addColorMap( 'mycolormap', cmap );
    lut.changeColorMap( 'mycolormap' );
    scene.add( lut.setLegendOn( {
        'layout':'horizontal',
        'position': { 'x': 0.6, 'y': -1.1, 'z': 2 },
        'dimensions': { 'width': 0.15, 'height': 1.2 }
    } ) );

    var geometry = new THREE.Geometry();
    var material = new THREE.MeshBasicMaterial();

    var nvertices = vertices.length;
    for ( var i = 0; i < nvertices; i++ )
    {
        var vertex = new THREE.Vector3().fromArray( vertices[i] );
        geometry.vertices.push( vertex );
    }

    var nfaces = faces.length;
    for ( var i = 0; i < nfaces; i++ )
    {
        var id = faces[i];
        var face = new THREE.Face3( id[0], id[1], id[2] );
        geometry.faces.push( face );
    }

    // Assign colors for each vertex
    material.vertexColors = THREE.VertexColors;
    var id1 = faces[0];
    var C01 = new THREE.Color().setHex( cmap[ 1 ][1] );
    var C11 = new THREE.Color().setHex( cmap[ 2 ][1] );
    var C21 = new THREE.Color().setHex( cmap[ 7 ][1] );
    geometry.faces[0].vertexColors.push( C01 );
    geometry.faces[0].vertexColors.push( C11 );
    geometry.faces[0].vertexColors.push( C21 );

    var id2 = faces[1];
    var C02 = new THREE.Color().setHex( cmap[ 1 ][1] );
    var C12 = new THREE.Color().setHex( cmap[ 7 ][1] );
    var C22 = new THREE.Color().setHex( cmap[ 4 ][1] );
    geometry.faces[1].vertexColors.push( C02 );
    geometry.faces[1].vertexColors.push( C12 );
    geometry.faces[1].vertexColors.push( C22 );
    
    var triangle = new THREE.Mesh( geometry, material );
    scene.add( triangle );

    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        renderer.render( scene, camera );
    }
}
