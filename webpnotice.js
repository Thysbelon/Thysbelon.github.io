let elementsArray = document.querySelectorAll("img[src$='.webp']");
document.querySelector("nav").outerHTML+="<div id=webpnotice><div id=close style=width:1rem;height:1rem;background:var(--pink);float:right;display:flex;justify-content:center;align-items:center;cursor:pointer>X</div>Animated webp images aren't as compatible as animated gif images, but it's not impossible to convert webp to gif. <a href=https://ezgif.com/webp-to-gif target=_blank>Online converters are aplenty</a>. As for offline converters, I briefly tested the command line program <a href=https://imagemagick.org/ target=_blank>ImageMagick</a> and found it good at maintaining quality.</div>"
var modal = document.getElementById("webpnotice");
document.getElementById("close").addEventListener("click",function(){
	modal.style.display="none"
})
elementsArray.forEach(function(elem) {
	elem.addEventListener("mouseup", function(e) { //do not use "click"
		console.log(e.button)
		if(e.button==2){ //right click
			console.log(this)
			modal.style.display="block"
		}
	});
});
document.head.innerHTML+='<style>#webpnotice{display:none;position:fixed;bottom:3vh;right:1vw;max-width:50vw;z-index:1;background:var(--bg)}</style>'