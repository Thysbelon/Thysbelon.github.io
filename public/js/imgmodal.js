function displayImage(modalImg, modal, elem) {
	console.log(elem)
	modalImg.src = elem.src.replace('thumbnails/','');
	if (elem.className.includes("pixl")) {
		modal.style.imageRendering="pixelated"
		if (elem.style.getPropertyValue("--w")) {
			console.log(elem.style.getPropertyValue("--w"))
			let theAspectRatio=elem.style.getPropertyValue("--w")*8+"/"+elem.style.getPropertyValue("--h")*7; modalImg.style.objectFit="fill"
			modal.style.aspectRatio=theAspectRatio
			modalImg.style.aspectRatio=theAspectRatio
			modalImg.style.height="initial"
			modalImg.style.width="100%"
		} else {modal.style.removeProperty('aspect-ratio'); modalImg.style.removeProperty('aspect-ratio'); modalImg.style.objectFit="contain"; modalImg.style.removeProperty('width'); modalImg.style.height="100%"}
	} else {modal.style.imageRendering="auto"; modal.style.removeProperty('aspect-ratio'); modalImg.style.removeProperty('aspect-ratio'); modalImg.style.objectFit="contain"; modalImg.style.removeProperty('width'); modalImg.style.height="100%"}
	modal.style.display="flex"
	modal.showModal()
}

document.addEventListener('DOMContentLoaded', function() {
	//if (phone) {return} // turn off script for mobile, the modals are not useful there.
	let elementsArray = document.querySelectorAll(".gallery img, section > img");
	document.querySelector("nav").outerHTML+="<dialog id=imgmodal><img></dialog>"
	var modal = document.getElementById("imgmodal");
	var modalImg = document.querySelector("#imgmodal img");
	modal.addEventListener("click",function(){
		modal.close()
	})
	modal.addEventListener("close",function(){
		modal.style.removeProperty('display')
		modalImg.src=''
	})
	elementsArray.forEach(function(elem) {
		elem.addEventListener("click", function() {
			displayImage(modalImg, modal, this)
		});
		elem.addEventListener("keydown", function(e) {
			if (e.key === "Enter") {
				displayImage(modalImg, modal, this)
			}
		});
		elem.tabIndex=0
	});
	document.head.innerHTML+=`<style>
	#imgmodal {
		height:80vh;
		align-items:center;
		justify-content:center
	}
	.gallery img{
		cursor:pointer
	}
	.gallery img,.gallery>div{
		transition-duration:.4s
	}
	.gallery>img:hover, .gallery>img:focus-visible, .gallery>div:has(img:hover), .gallery>div:has(img:focus-visible){
		border-color:var(--pink)
	}
	#imgmodal img {
		background-color:white;
		height:100%
	}
	dialog{
		background-color:white;
		border-radius:1rem
	}
	#imgmodal img[src$=".svg"]{
		/*padding:2vw*/
	}
	dialog::backdrop{
		background-color: rgb(255 255 255 / 50%)
	}
	</style>`
})
