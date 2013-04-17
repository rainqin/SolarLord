#pragma strict
var planet : GameObject;
var minRange : float = 0.5;
var maxRange : float = 2.0;


function Start () {
	var planetNum : int;
	var iniX : float = transform.position.x + 1;
	var iniZ : float = transform.position.z + 1;
	planetNum = Random.Range(3, 10);
	
	for (var i : int = 0; i < planetNum; i++) {
		iniX += Random.Range(minRange, maxRange);
		iniZ += Random.Range(minRange, maxRange);
		Instantiate(planet, Vector3(iniX, 0, iniZ), Quaternion.identity);
		planet.GetComponent(PlanetData).iniPosition = Vector3(iniX, 0, iniZ);
		planet.GetComponent(PlanetData).target = gameObject;
	}
}

function Update () {

}