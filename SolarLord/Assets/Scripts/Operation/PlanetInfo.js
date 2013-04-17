#pragma strict


var guiEnable : boolean = false;
var space : int;
var rayLength : float = 100;
var labelHeight : int;
var buttonHeight : int;
var scoutShipPrefab : GameObject;
function Start () {

}

function Update () {
	if (Input.GetButtonUp("Fire1")) {
		ResetSelect();
	}
}

function OnGUI() {
	if (guiEnable) {
		GUILayout.BeginArea(Rect(0, 0, Screen.width / 5, Screen.height / 4 * 3));
			GUILayout.Label("Planet Info");
			GUILayout.Space(space);
			GUILayout.Label("Population:      " + gameObject.GetComponent(PlanetData).population, GUILayout.Height(labelHeight));
			GUILayout.Space(space);
			GUILayout.Label("Environment:     " + gameObject.GetComponent(PlanetData).environment, GUILayout.Height(labelHeight));
			GUILayout.Space(space);
			GUILayout.Label("Over Exhaust:    " + gameObject.GetComponent(PlanetData).overExhaust, GUILayout.Height(labelHeight));
			GUILayout.Space(space);
			GUILayout.Label("Tax:             " + gameObject.GetComponent(PlanetData).tax, GUILayout.Height(labelHeight));
			GUILayout.Space(space);
			GUILayout.Label("Income:          " + gameObject.GetComponent(PlanetData).income, GUILayout.Height(labelHeight));
			GUILayout.Space(space);
			GUILayout.Label("Level: 	      " + gameObject.GetComponent(PlanetData).level, GUILayout.Height(labelHeight));
			/*GUILayout.Space(space);
			GUILayout.Label("Orbit Speed:  	  " + gameObject.GetComponent(PlanetData).orbitSpeed, GUILayout.Height(labelHeight));
			GUILayout.Space(space);
			GUILayout.Label("Rotate Speed:    " + gameObject.GetComponent(PlanetData).rotateSpeed, GUILayout.Height(labelHeight));
			GUILayout.Space(space);
			GUILayout.Label("Size: 		   	  " + gameObject.GetComponent(PlanetData).size, GUILayout.Height(labelHeight));
			GUILayout.Space(space);
			GUILayout.Label("Physical Form:   " + gameObject.GetComponent(PlanetData).category, GUILayout.Height(labelHeight));
			GUILayout.Space(space);
			GUILayout.Label("Life Form: 	  " + gameObject.GetComponent(PlanetData).lifeForm, GUILayout.Height(labelHeight));
			GUILayout.Space(space);
			GUILayout.Label("Atmosphere: 	  " + gameObject.GetComponent(PlanetData).atmosphere, GUILayout.Height(labelHeight));*/
			GUILayout.Space(space);
			GUILayout.Label("C Storage:		  " + gameObject.GetComponent(PlanetData).c, GUILayout.Height(labelHeight));
			GUILayout.Space(space);
			GUILayout.Label("H Storage: 	  " + gameObject.GetComponent(PlanetData).h, GUILayout.Height(labelHeight));
			GUILayout.Space(space);
			GUILayout.Label("O Storage: 	  " + gameObject.GetComponent(PlanetData).o, GUILayout.Height(labelHeight));
			GUILayout.Space(space);
			GUILayout.Label("S Storage: 	  " + gameObject.GetComponent(PlanetData).s, GUILayout.Height(labelHeight));
		GUILayout.EndArea();
		
		GUILayout.BeginArea(Rect(4 * Screen.width / 5, 0, Screen.width / 5, Screen.height / 4 * 3));
			GUILayout.Label("Build Menu", GUILayout.Height(labelHeight));
			GUILayout.Space(space);
			if (GUILayout.Button("Build Scout Ship", GUILayout.Height(buttonHeight))) {
				var scoutShip : GameObject;
				scoutShip = Instantiate(scoutShipPrefab, transform.position + Vector3(0.5, 0, 0), Quaternion.identity);
				scoutShip.transform.Rotate(-90, 0, 0);
			}
		GUILayout.EndArea();
	}
}

function OnMouseDown() {
	guiEnable = true;
}

function IsMouseInGUI() : boolean{
	var mouse : Vector2 = Input.mousePosition;
	var GUIField : Rect[] = new Rect[2];
	GUIField[0] = Rect(0, Screen.height / 4, Screen.width / 5, Screen.height / 4 * 3); 
	GUIField[1]	= Rect(4 * Screen.width / 5, Screen.height / 4, Screen.width / 5, Screen.height / 4 * 3);
	//Debug.Log("mouse: " + mouse);
	//Debug.Log("0 contrains mouse: " + GUIField[0].Contains(mouse));
	//Debug.Log("1 contrains mouse: " + GUIField[1].Contains(mouse));
	
	if (GUIField[0].Contains(mouse) || GUIField[1].Contains(mouse)) {
		return true;
	} else {
		return false;
	}
}

function ResetSelect() {
	var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	var hit : RaycastHit;
	if ( !(Physics.Raycast (ray, hit, rayLength) && hit.collider.gameObject == gameObject) && !IsMouseInGUI()) {
		guiEnable = false;
	}
}