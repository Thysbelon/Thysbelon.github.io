let elementsArray = document.querySelectorAll(".gallery div img");
var modal = document.getElementById("modal");
var modalImg = document.querySelector("#modal img");
modal.addEventListener("click",function(){
	modal.style.display="none"
})
elementsArray.forEach(function(elem) {
    elem.addEventListener("click", function() {
        console.log(this)
		modal.style.display="flex"
		modalImg.src = this.src;
    });
});