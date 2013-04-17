#pragma strict
var space : float = 10;
var buttonHeight : float = 50;

var rayLength : float =  100;
var info : GameObject;
var mySkin : GUISkin;
static var guienable : boolean = false;
private var hitObj : GameObject;

function Start () {

}

function Update () {
	if (Input.GetButtonUp("Fire1")) {
		ResetSelect();
	}
	
	GUI.enabled = false;
}

function OnMouseOver() {
	//Debug.Log("Enter");
	guienable = true;
	//GameObject.FindGameObjectWithTag("Sun").
}

function OnMouseExit() {
	//guienable = false;
}

function OnMouseDown() {
	gameObject.GetComponent(PlanetData).population++;
}

function ResetSelect() {
	var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	var hit : RaycastHit;
	if ( !(Physics.Raycast (ray, hit, rayLength) && hit.collider.gameObject == gameObject)) {
		guienable = false;
	}
}

function OnGUI() {
	GUI.skin = mySkin;
	GUILayout.BeginArea(Rect(0, 0, Screen.width / 5, Screen.height / 2));
		GUILayout.Button("Clickme");
	GUILayout.EndArea();
}
