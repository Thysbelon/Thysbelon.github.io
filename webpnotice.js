let elementsArray = document.querySelectorAll("img[src$='.webp'], img[src$='.svg'], img[src$='.avif']");
document.querySelector("nav").outerHTML+="<div id=webpnotice><div id=close style=width:1rem;height:1rem;background:var(--pink);float:right;display:flex;justify-content:center;align-items:center;cursor:pointer>X</div>Webp and SVG images aren't as compatible as other formats, but it's not impossible to convert them. <a href=/2022/11/04/How-to-Convert-from-WebP-or-SVG-to-Formats-like-PNG-and-GIF>See my post on converting webp and svg to more common formats like PNG and GIF</a>.</div>"
var modal = document.getElementById("webpnotice");
let hold=false
let noticestyles="<style>#webpnotice{display:none;position:fixed;z-index:1;background:var(--bg);border:solid 3px var(--txt);"
let TimeoutID;
document.getElementById("close").addEventListener("click",function(){
	modal.style.display="none"
	hold=false
})
if(navigator.maxTouchPoints>0 && window.matchMedia("(any-hover: none)").matches) {
	elementsArray.forEach(function(elem) {
		elem.addEventListener("pointerdown", function(e) { //do not use "click"
			//document.body.style.backgroundColor="red"
			hold=true
			TimeoutID=setTimeout(function(){if (hold==true){modal.style.display="block"}},1000)
		});
		elem.addEventListener("pointerup", function(){
			hold=false
			clearTimeout(TimeoutID)
		})
		document.addEventListener("scroll", function(){if(hold==true){hold=false;clearTimeout(TimeoutID)}})
	});
	noticestyles+='bottom:3vh;max-width:80vw}</style>'
} else {
	elementsArray.forEach(function(elem) {
		elem.addEventListener("mouseup", function(e) { //do not use "click"
			console.log(e.button)
			if(e.button==2){ //right click
				console.log(this)
				modal.style.display="block"
			}
		});
	});
	noticestyles+='bottom:3vh;right:.5vw;max-width:25vw}</style>'
}
document.head.innerHTML+=noticestyles