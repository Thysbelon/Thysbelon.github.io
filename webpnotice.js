let elementsArray = document.querySelectorAll("img[src$='.webp']");
document.querySelector("nav").outerHTML+="<div id=webpnotice><div id=close style=width:1rem;height:1rem;background:var(--pink);float:right;display:flex;justify-content:center;align-items:center;cursor:pointer>X</div>Webp images aren't as compatible as other formats, but it's not impossible to convert them. <a href=/2022/11/04/How-to-Convert-from-WebP-or-SVG-to-Formats-like-PNG-and-GIF>See my post on converting webp to more common formats like PNG and GIF</a>.</div>"
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