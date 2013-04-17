#pragma strict

//game Info
	var population : float;
	var environment : int;
	var overExhaust : int;
	var tax : int;
	var income : float;
	var level : int;
	var category : int;
	var lifeForm : int;
	var automosphere : int;
	var c : float;
	var h : float;
	var o : float;
	var s : float;
	
	//physic Info
	var orbitSpeed : float = 5;
	var rotateSpeed : float = 20;
	var mass : float;
	var distance : float = 3;
	var target : GameObject;
	
	function Start () {
		target = GameObject.FindGameObjectWithTag("Sun");
		transform.position = Vector3(0, 0, -distance) + target.transform.position;
	}
	
	function Update () {
		Orbit();
		SelfRotate();
	}
	
	function Orbit() {
		if (target) {
	        /*x +=  orbitSpeed * Time.deltaTime;
	        var rotation = Quaternion.Euler(0, x, 0);
	        var position = rotation * (target.transform.position - transform.position) + target.transform.position;
	        transform.position = position;*/
	        transform.RotateAround(target.transform.position, target.transform.up, orbitSpeed * Time.deltaTime);
	    }
	}
	
	function SelfRotate() {
		//transform.Rotate(transform.right * Time.deltaTime * rotateSpeed);
		transform.Rotate(Vector3.up, Time.deltaTime * rotateSpeed, Space.Self);
	}