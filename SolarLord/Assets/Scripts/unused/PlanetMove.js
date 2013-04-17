#pragma strict

private var x : float = 0;
private var y : float = 0;
private var G : double = 6.67428e-4;

var deviationSpeed : double;
var target : GameObject;
var iniDistance : double;

function Start () {
	rigidbody.AddForce(transform.right * deviationSpeed * rigidbody.mass);
	transform.position = target.transform.position + iniDistance * Vector3(0, 0, -1.0);
	//rigidbody.AddForce(transform.forward * deviationSpeed * rigidbody.mass);
}

function Update () {
	var gravityObjs : GameObject[];
	gravityObjs = GameObject.FindGameObjectsWithTag("gravitySystem");
	for (var gravityObj in gravityObjs) {
		ApplyGravity(gravityObj);
		ApplyDeviation(gravityObj);
	}
	
}

function ApplyGravity(other : GameObject) {
	var vector : Vector3 = other.transform.position - transform.position;
	var direction : Vector3 = vector.normalized;
	var distanceSquare : double = vector.magnitude;
	
	var force : Vector3 = G * rigidbody.mass * other.rigidbody.mass / distanceSquare * direction;
	//Debug.Log("Gravity: " + force);
	rigidbody.AddForce(force);
}

function ApplyDeviation(target : GameObject) {
	var deviationDirect : Vector3;
	var vector: Vector3 = target.transform.position - transform.position;
	deviationDirect = Vector3.Cross(vector, target.transform.up).normalized;
	deviationSpeed = Vector3.Dot(rigidbody.velocity, deviationDirect);
	//Debug.Log("Speed: " + deviationSpeed);
	var force: Vector3;
	force = rigidbody.mass * deviationSpeed * deviationSpeed / vector.sqrMagnitude * (- vector.normalized);	
	//Debug.Log("Deviation: " + force);
}