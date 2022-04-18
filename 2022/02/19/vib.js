let vid=document.querySelector("#vibspeech video:not(video[loop])");
vid.outerHTML+='<button type=button style="color: transparent;background: no-repeat center/contain transparent url(\'data:image/svg+xml;utf8,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;200&quot; height=&quot;100&quot;><path d=&quot;M50 0 L150 50 L50 100 Z&quot; fill=&quot;white&quot; /></svg>\');">Play Video</button>'
vid=document.querySelector("#vibspeech video:not(video[loop])");
vid.controls=false;
vid.load()
let but=document.querySelector("#vibspeech button");
but.addEventListener("click",function(){but.style.display="none";vid.play()},{once:true})
vid.addEventListener("ended",function(){vid.addEventListener("click",function(){vid.play()},{once:true})})
if (navigator.userAgent.search("Edg") < navigator.userAgent.search("Chrome")) {
	document.querySelector("#vibspeech img").src='vibout.avif'
} else if (navigator.userAgent.search("Safari")===-1 || navigator.userAgent.search("Firefox")+navigator.userAgent.search("Android")===-2) {
	document.querySelector("#vibspeech img").outerHTML='<video autoplay muted loop playsinline title="I drew this using Shake Art DELUXE by nokoi"><source src="vib-min.webm" type="video/webm">An image of Vibri\'s head with a speech bubble.</video>'
}