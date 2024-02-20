let prefl=navigator.language.slice(0,2);
let lang='ja';
if (prefl==='ja') {lang='en'};
function hidelang() {
	let x=document.querySelectorAll(":lang("+lang+")");
	for (let i=0, l=x.length; i < l; i++) {
		x[i].style.display="none";
	}
}

if (document.readyState === "loading") {
	// Loading hasn't finished yet
	document.addEventListener("DOMContentLoaded", hidelang);
} else {
	// `DOMContentLoaded` has already fired
	hidelang();
}