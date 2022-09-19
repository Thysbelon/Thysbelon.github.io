let prefl=navigator.language.slice(0,2);
let lang='ja';
if (prefl==='ja') {lang='en'};
document.addEventListener('DOMContentLoaded', function() {
	let x=document.querySelectorAll(":lang("+lang+")");
	for (let i=0, l=x.length; i < l; i++) {
		x[i].style.display="none";
	}
})