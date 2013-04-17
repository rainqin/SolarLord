#pragma strict
var rayLength : float = 1000;
var rotateSensitive : float = 125.0;
var scaleSensitive : float = 100;
var moveHeightSensitive : float = 100.0;
var distanceSensitive : float = 100.0;
var moveDistance : float = 3;
var moveHeight : float;

var rightButtonDown : boolean = false;
var shipMovingFlag : boolean = false;
var moveDown : boolean = false;
var moveUp : boolean = false;
var shipDest : Vector3;
private var rightButtonPosition : Vector3;
var hitObj : GameObject;

private var x = 0.0;
private var y = 0.0;
private var normalDist : float = 3.0;
private var distance : float;

private var deltaPosition : Vector3;
 
function Start () {
    var angles = transform.eulerAngles;
    x = angles.y;
    y = angles.x;
    hitObj = GameObject.FindGameObjectWithTag("Sun");
    distance = normalDist;
    deltaPosition = Vector3(0, 0, -distance);
}

function IsMouseInGUI() : boolean{
	var mouse : Vector2 = Input.mousePosition;
	var GUIField : Rect[] = new Rect[2];
	GUIField[0] = Rect(0, Screen.height / 4, Screen.width / 5, Screen.height / 4 * 3); 
	GUIField[1]	= Rect(4 * Screen.width / 5, Screen.height / 4, Screen.width / 5, Screen.height / 4 * 3);
	
	if (GUIField[0].Contains(mouse) || GUIField[1].Contains(mouse)) {
		return true;
	} else {
		return false;
	}
}

function Update () {
	if (Input.GetAxis("Mouse ScrollWheel") != 0) {
		ScaleCamera();
	}
	
	if (Input.GetKeyDown(KeyCode.W)) {
		moveUp = true;
	} else if (Input.GetKeyDown(KeyCode.S)) {
		moveDown = true;
	}
	
	if (Input.GetKeyUp(KeyCode.W)) {
		moveUp = false;
	} else if (Input.GetKeyUp(KeyCode.S)) {
		moveDown = false;
	}
	
	
	if (Input.GetButtonUp("Fire1") && (!IsMouseInGUI() || (!hitObj.GetComponent(PlanetInfo) || !(hitObj.GetComponent(PlanetInfo).guiEnable)))) {
	//if ((hitObj.GetComponent("PlanetInfo")).guiEnable) {
		/*if (!shipMovingFlag) {
			Select();
		} else {
			var ray = Camera.main.ScreenPointToRay(Input.mousePosition); 
			var angle = Vector3.Angle(Vector3.up, ray.direction);
			var distance = Mathf.Abs(ray.origin.y) / Mathf.Sin(angle);
			shipDest = ray.GetPoint(distance);
			hitObj.GetComponent(ShipMove).dest = shipDest;
			//shipMovingFlag = false;
		}*/
		Select();
	}
	
	/*if (shipMovingFlag) {
		var ray = Camera.main.ScreenPointToRay(Input.mousePosition); 
		var angle = Vector3.Angle(Vector3.up, ray.direction);
		var distance = Mathf.Abs(ray.origin.y) / Mathf.Sin(angle);
		shipDest = ray.GetPoint(distance);
		//Debug.Log("Ship Dest: "+ shipDest);
	}*/
	
	
	
	if (Input.GetButtonDown("Fire2")) {
		rightButtonPosition = Input.mousePosition;
		rightButtonDown = true;
	}
	
	if (rightButtonDown) {
		RotateCamera(hitObj.transform);	
	}
	
	if (Input.GetButtonUp("Fire2")) {
		rightButtonDown = false;
		
	}
	transform.position = deltaPosition + hitObj.transform.position;	
	transform.LookAt(hitObj.transform);
}

function Select() {
	var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	var hit : RaycastHit;
	if ( Physics.Raycast (ray, hit, rayLength) ) {
	    
		hitObj = hit.collider.gameObject;
		if (hitObj.GetComponent(SphereCollider)) {
			distance = 4 * (hitObj.GetComponent(SphereCollider)).radius * hitObj.transform.localScale.x;
		} else if (hitObj.GetComponent(CapsuleCollider)) {
			distance = 4 * (hitObj.GetComponent(CapsuleCollider)).radius * hitObj.transform.localScale.x;
		}
		deltaPosition =  -distance * (hitObj.transform.position - Camera.main.transform.position).normalized;
		//hitObj.renderer.material.color = Color.blue;
		//Camera.main.transform.position = hitObj.transform.position + Vector3(0, 0, -distance * hitObj.transform.localScale.x);
		//Camera.main.transform.LookAt(hitObj.transform);
	} else if (hitObj.tag == "Ship") {
		//shipMovingFlag = true;
		
		var point : float;
		var xz : Plane = new Plane(new Vector3(0f, 1f, 0f), 0f);
		xz.Raycast(ray, point);
		shipDest = ray.GetPoint(point);
		//var angle = Vector3.Angle(Vector3.up, ray.direction);
		//var distance = Mathf.Abs(ray.origin.y) / Mathf.Cos(angle);
		//shipDest = ray.GetPoint(distance);
		Debug.Log("ShipDest: " + shipDest);
		Debug.Log("Origin: " + ray.origin);
		hitObj.GetComponent(ShipMove).dest = shipDest;
		hitObj.rigidbody.velocity = Vector3.zero;
		hitObj.rigidbody.angularVelocity = Vector3.zero;
	}
}

function RotateCamera (target : Transform) {
    if (target) {
        x += Input.GetAxis("Mouse X") * rotateSensitive * 0.02;
        y -= Input.GetAxis("Mouse Y") * rotateSensitive * 0.02; 
        var rotation = Quaternion.Euler(y, x, 0);
        var position = rotation * Vector3(0.0, 0.0, -distance);
       	//transform.rotation = rotation;
        deltaPosition = position;
    }
}

function ScaleCamera() {
	var deltaDistance = Input.GetAxis("Mouse ScrollWheel")* Time.deltaTime * scaleSensitive;
	if ((hitObj.GetComponent(SphereCollider) && distance + deltaDistance > 1.5 * (hitObj.GetComponent(SphereCollider)).radius * hitObj.transform.localScale.x) ||
		(hitObj.GetComponent(CapsuleCollider) && distance + deltaDistance > 1.5 * (hitObj.GetComponent(CapsuleCollider)).radius * hitObj.transform.localScale.x)) {
		distance += deltaDistance;
		deltaPosition -= (hitObj.transform.position - Camera.main.transform.position).normalized * deltaDistance;
	}
	//Debug.Log(distance / hitObj.transform.localScale.x);
	//if (distance < hitObj.transform.localScale.x + 1) {
	//	distance = hitObj.transform.localScale.x + 1;
	//}
	//Debug.Log("distance: " + distance);
}

function Max(a1 : float, a2 : float) : float {
	if (a1 > a2) {
		return a1;
	} else {
		return a2;
	}
}
	