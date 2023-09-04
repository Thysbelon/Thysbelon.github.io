document.addEventListener('DOMContentLoaded', function() {
	//if () {return}
	let elementsArray = document.querySelectorAll(".gallery img, section > img");
	document.querySelector("nav").outerHTML+="<dialog id=imgmodal><img></dialog>"
	var modal = document.getElementById("imgmodal");
	var modalImg = document.querySelector("#imgmodal img");
	modal.addEventListener("click",function(){
		modal.style.removeProperty('display')
		modal.close()
	})
	elementsArray.forEach(function(elem) {
		elem.addEventListener("click", function() {
			console.log(this)
			modalImg.src = this.src;
			if (this.className.includes("pixl")) {
				modal.style.imageRendering="pixelated"
				if (this.style.getPropertyValue("--w")) {
					console.log(this.style.getPropertyValue("--w"))
					let theAspectRatio=this.style.getPropertyValue("--w")*8+"/"+this.style.getPropertyValue("--h")*7; modalImg.style.objectFit="fill"
					modal.style.aspectRatio=theAspectRatio
					modalImg.style.aspectRatio=theAspectRatio
					modalImg.style.height="initial"
					modalImg.style.width="100%"
				} else {modal.style.removeProperty('aspect-ratio'); modalImg.style.removeProperty('aspect-ratio'); modalImg.style.objectFit="contain"; modalImg.style.removeProperty('width'); modalImg.style.height="100%"}
			} else {modal.style.imageRendering="auto"; modal.style.removeProperty('aspect-ratio'); modalImg.style.removeProperty('aspect-ratio'); modalImg.style.objectFit="contain"; modalImg.style.removeProperty('width'); modalImg.style.height="100%"}
			modal.showModal()
			modal.style.display="flex"
		});
		elem.addEventListener("keydown", function(e) {
			if (e.key === "Enter") {
				console.log(this)
				modalImg.src = this.src;
				if (this.className.includes("pixl")) {
					modal.style.imageRendering="pixelated"
				} else {modal.style.imageRendering="auto"}
				modal.showModal()
			}
		});
		elem.tabIndex=0
	});
	let divimgs=document.querySelectorAll(".gallery>div>img");
	/* The below code allows the border to "light up" even on images that are inside a div. Once :has(), the parent selector, is usable in Firefox, that could replace this code? */
	divimgs.forEach(function(element){
		element.addEventListener("mouseover",function(){
			this.parentElement.style.borderColor="var(--pink)"
		});
		element.addEventListener("focus",function(){
			console.log("focus")
			this.parentElement.style.borderColor="var(--pink)"
		});
		element.addEventListener("mouseout",function(){
			this.parentElement.style.removeProperty('border-color')
		})
		element.addEventListener("blur",function(){
			this.parentElement.style.removeProperty('border-color')
		})
	})
	document.head.innerHTML+='<style>#imgmodal {height:80vh;align-items:center;justify-content:center} .gallery img{cursor:pointer}.gallery img,.gallery>div{transition-duration:.4s}.gallery>img:hover,.gallery>img:focus-visible{border-color:var(--pink)} #imgmodal img {background-color:white; height:100%} dialog{background-color:white;border-radius:1rem} #imgmodal img[src$=".svg"]{/*padding:2vw*/} dialog::backdrop{background-color: rgb(255 255 255 / 50%)}</style>'
})