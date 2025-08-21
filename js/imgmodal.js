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
		} else {
			modal.style.removeProperty('aspect-ratio'); 
			modalImg.style.removeProperty('aspect-ratio'); 
			modalImg.style.objectFit="contain"; 
			modalImg.style.removeProperty('width'); 
			modalImg.style.height="100%"
		}
	} else {
		modal.style.imageRendering="auto"; 
		//modal.style.removeProperty('aspect-ratio'); 
		//modalImg.style.removeProperty('aspect-ratio'); 
		modalImg.style.aspectRatio=elem.getAttribute('width')+'/'+elem.getAttribute('height')
		//modalImg.setAttribute('width', elem.getAttribute('width'))
		//modalImg.setAttribute('height', elem.getAttribute('height'))
		modalImg.style.objectFit="contain"; 
		modalImg.style.removeProperty('width'); 
		modalImg.style.height="100%"
	}
	modal.showModal()
}

document.addEventListener('DOMContentLoaded', function() {
	console.log('DOMContentLoaded event listener ran.');
	//if (phone) {return} // turn off script for mobile, the modals are not useful there.
	let elementsArray = document.querySelectorAll(".image-gallery img");
	const mainElem = document.querySelector("main");
	mainElem.insertAdjacentHTML("beforebegin", "<dialog id=imgmodal><img></dialog>");
	var modal = document.getElementById("imgmodal");
	var modalImg = document.querySelector("#imgmodal img");
	modal.addEventListener("click",function(){
		modal.close()
	})
	modal.addEventListener("close",function(){
		modalImg.src=''
		modal.style.removeProperty('aspect-ratio'); 
		modalImg.style.removeProperty('aspect-ratio'); 
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
	#imgmodal[open]{
		display:flex;
	}
	.image-gallery img{
		cursor:pointer
	}
	.image-gallery > div, .image-gallery > figure, .image-gallery > img{
		transition-duration:.4s;
		transition-property: border-color;
	}
	.image-gallery > img:hover, .image-gallery > img:focus-visible, .image-gallery > div:has(img:hover), .image-gallery > div:has(img:focus-visible), .image-gallery > figure:has(img:hover), .image-gallery > figure:has(img:focus-visible){
		border-color: var(--pink);
	}
	#imgmodal img {
		background-color:white;
		height:100%
		display:block;
		max-width:100%;
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
