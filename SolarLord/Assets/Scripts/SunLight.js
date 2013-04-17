#pragma strict

var sunLightDist : float = 0.75;
function Start () {

}

function Update () {
	var vector = (Camera.main.transform.position - GameObject.FindGameObjectWithTag("Sun").transform.position).normalized;
	transform.position = sunLightDist * vector;
	
}