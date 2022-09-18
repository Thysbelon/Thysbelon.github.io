document.addEventListener('DOMContentLoaded', function() {
	console.log('DOM fully loaded and parsed');

	let ytvideos=document.querySelectorAll("a.yt")
	console.log(ytvideos)
	if (ytvideos.length!==0) {
		for (let ytvid of ytvideos) {
			let title=ytvid.innerText
			console.log(title)
			let videoid=ytvid.href.replace(/https:\/\/youtu\.be\/(.*?)($|\?.*)/ ,'$1')
			console.log(videoid)
			let vidstart=ytvid.href.replace(/https:\/\/youtu\.be\/.*\?t=(\d*)/ ,'$1')
			console.log(vidstart)
			if (vidstart.includes("youtu.be")===false) {vidstart="&start="+vidstart} else {vidstart=""}
			ytvid.outerHTML="<iframe src=https://www.youtube-nocookie.com/embed/"+videoid+"?playsinline=1"+vidstart+" title='Youtube video: "+title+"' allow=fullscreen></iframe>"
		}
	}
});