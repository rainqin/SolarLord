#pragma strict

var dest : Vector3;
var minResponseDist : float = 0.1;
var minResponseAngle : float = 1;
var rotateSpeed : float;
var emitSpeed : float = 0;
var emitAcc : float;
var maxSpeed : float;
var slowDownAcc : float;
var rotateFactor : float = 0.2;
private var slowDownDistance : float;
private var tempAngle : float = 0;
private var rotateDirect : boolean = true;

function Start () {
	dest = transform.position;
	
}

function Update () {
	//Debug.Log("Forward: " + transform.forward);
	var deltaVector = dest - transform.position;
	var distance = Vector3.Distance(transform.position, dest);
	var angle = Vector3.Angle(-transform.up, deltaVector);
	var t = emitSpeed / slowDownAcc;
	slowDownDistance = slowDownAcc * t * t / 2;
	
	Debug.DrawRay(transform.position, -transform.up);
	Debug.DrawLine(transform.position, dest);
	if (distance > minResponseDist) {
		if (angle > minResponseAngle) {
			if (angle > tempAngle) {
				rotateDirect = !rotateDirect;
			}
			tempAngle = angle;
			Debug.Log("Min Angle: " + minResponseAngle);
			Debug.Log("Angle: " + angle);
			if (rotateDirect) {
				transform.RotateAroundLocal(Vector3(0, 1, 0), -rotateSpeed * Time.deltaTime * rotateFactor);
			} else {
				transform.RotateAroundLocal(Vector3(0, 1, 0), rotateSpeed * Time.deltaTime * rotateFactor);
			}
		} else {
			transform.position += deltaVector.normalized * emitSpeed * Time.deltaTime;
			if (distance > slowDownDistance) {
				if (emitSpeed < maxSpeed) {
					emitSpeed += emitAcc * Time.deltaTime;
				}
			} else {
				emitSpeed -= slowDownAcc * Time.deltaTime;
			}				
		}
		//transform.rotation = Quaternion.LookRotation(dest);
	} else {
		emitSpeed = 0;
		rigidbody.velocity = Vector3.zero;
	}
	//Debug.Log("Dest: " + dest);
}
