// Scroll main texture based on time
var scrollSpeed = 0.5;
function Update () {
    var offset = Time.time * scrollSpeed;
    renderer.material.SetTextureOffset ("_BumpMap", Vector2(offset,offset));
    renderer.material.SetTextureOffset ("_MainTex", Vector2(offset,offset));
    renderer.materials[1].SetTextureOffset ("_MainTex", Vector2(-offset,-offset));
}