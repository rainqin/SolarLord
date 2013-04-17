#pragma strict

var population : float;
var environment : int;
var overExhaust : int;
var tax : int;
var income : float;
var level : int;
var category : int;
var lifeForm : int;
var atmosphere : int;
var c : float;
var h : float;
var o : float;
var s : float;

//physic Info
var orbitSpeed : float = 5;
var rotateSpeed : float = 20;
var size : float;
var iniPosition : Vector3;
var target : GameObject;


var maxCategory : int = 2;
var minPopulation : float = 10000000;
var maxPopulation : float = 9999999999;

var minOrbitSpeed : float = 0.1;
var maxOrbitSpeed : float = 3;

var minRotateSpeed : float = 10;
var maxRotateSpeed : float = 40;

function Start () {
	
	category = Random.Range(1, 2);
	if (category == 1) {
		population = Random.Range(minPopulation, maxPopulation);
		environment = Random.Range(50, 100);
		overExhaust = 0;
		tax = 5;
		income = population * tax;
		level = Random.Range(3, 6);
	} else {
		population = 0;
		environment = 0;
		overExhaust = 0;
		tax = 0;
		income = 0;
		level = 0;
	}
	
	orbitSpeed = Random.Range(minOrbitSpeed, maxOrbitSpeed);
	rotateSpeed = Random.Range (minRotateSpeed, maxRotateSpeed);
	
	transform.position = iniPosition;
}

function FixedUpdate () {
	Orbit();
	SelfRotate();
}

function Orbit() {
	if (target) {
        transform.RotateAround(target.transform.position, target.transform.up, orbitSpeed * Time.deltaTime);
    }
}

function SelfRotate() {
	//transform.Rotate(transform.right * Time.deltaTime * rotateSpeed);
	transform.Rotate(Vector3.up, Time.deltaTime * rotateSpeed, Space.Self);

}