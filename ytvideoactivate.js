document.addEventListener('DOMContentLoaded', function() {
	console.log('DOM fully loaded and parsed');

	let ytvideos=document.querySelectorAll("a.yt")
	console.log(ytvideos)
	if (ytvideos.length!==0) {
		for (let ytvid of ytvideos) {
			let title=ytvid.innerText
			console.log(title)
			let videoid=ytvid.href.replace(/.*\/([\w-]*$)/ ,'$1')
			console.log(videoid)
			let vidstart=ytvid.href.replace(/https:\/\/youtu\.be\/.*\?t=(\d*)/ ,'$1')
			console.log(vidstart)
			if (vidstart.includes("youtu.be")===false && ytvid.href.includes("youtube.com/clip")===false) {vidstart="&start="+vidstart} else {vidstart=""}
			if (ytvid.href.includes("youtube.com/clip/")===true){ytvid.outerHTML="<iframe src=https://www.youtube.com/embed/"+ytvid.dataset.fullvidurl+"?clip="+videoid+"&clipt="+ytvid.dataset.clipt+"&playsinline=1 title='Youtube video: "+title+"' allow=fullscreen></iframe>"} // clips break when using nocookie. fun fact: a data- attribute can have any capitalization, but the equivalent js dataset *property* will always be all lowercase!
			else {ytvid.outerHTML="<iframe src=https://www.youtube-nocookie.com/embed/"+videoid+"?playsinline=1"+vidstart+" title='Youtube video: "+title+"' allow=fullscreen></iframe>"}
		}
	}
});