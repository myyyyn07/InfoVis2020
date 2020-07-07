class Vec3
{
    constructor( x, y, z ){
	this.x = x;
	this.y = y;
	this.z = z;
    }

    add( v ){
	this.x += v.x;
	this.y += v.y;
	this.z += v.z;
	return this;
    }

    sum(){
	return this.x + this.y + this.z;
    }

    min(){
	var min = this.x;
	if(min > this.y){
	    min = this.y;
	}
	if(min > this.z){
	    min = this.z;
	}
	return min;
    }

    max(){
	var max = this.x;
	if(max < this.y){
            max = this.y;
	}
	if(max < this.z){
            max = this.z;
	}
	return max;
    }
    
    mid(){
	var min = this.min();
	var max = this.max();
	var mid = x + y + z - min - max;
	return mid;
    }
    
    sub( v ){
	this.x -= v.x;
	this.y -= v.y;
	this.z -= v.z;
	return this;
    }
    
    dot( v ){
	var dot = this.x * v.x + this.y * v.y + this.z * v.z;
	return dot;
    }
    
    magnitude(){
	var mag = this.x**2 + this.y**2 + this.z**2;
	return mag;
    }
    
    static  AreaOfTriangle( x, y, z )
    {
	var ab = y.sub( x );
	var ac = z.sub( x );
	var S = 1/2 * Math.sqrt( ab.magnitude() * ac.magnitude() - (ab.dot( ac ))**2 );
	return S;	
    }
}
