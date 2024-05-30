module.exports = {

data() {
	const myData={
		navbar: '<li><a href=/Archive/>Archive</a></li><li><a href=/Tags/>Tags</a></li><li><a href=/Categories/>Categories</a></li>',
		pagination: {
			data: "collections.enListOfTags",
			size: 1,
			alias: 'tag',
			filter: ['all', 'post', 'posts', 'tagList'],
			addAllPagesToCollections: true,
		},
		customThemes: {
			"Vib-Ribbon": {
				customLogo: "<img id=blogtitle src=/css/vib-ribbon-theme/thystitle2-min.gif alt=Thysbelon. width=484 height=154><img src=/css/vib-ribbon-theme/thyslogo5-min.gif alt=\"Logo of a Hummingbird moth drawn with angular lines.\" width=281 height=281>",
				customIcon: "/css/vib-ribbon-theme/thyslogo5-min.gif",
				extraStylesheet: "vib-ribbon-theme/vib-ribbon.css",
				customFooter: " "
			}
		},
		eleventyComputed: {
			title: data => `${ data.tag } Tag`,
			customLogo: function(data){return data.customThemes[data.tag]?.customLogo},
			customIcon: function(data){return data.customThemes[data.tag]?.customIcon},
			extraStylesheet: function(data){return data.customThemes[data.tag]?.extraStylesheet},
			customFooter: function(data){return data.customThemes[data.tag]?.customFooter},
		},
		permalink: function(data){return `/Tags/${ this.prettySlug(data.tag) }/`}
	}
	return myData
},

render(data) {
var uniquePageDecoration=""
switch (data.page.url) {
	case '/Tags/Pokémon/':
		uniquePageDecoration=`
<style>
@keyframes walk{
	0%{transform:translateX(42vw)}
	100%{transform:translateX(-100vw)}
}
</style>
<div style=height:13rem class=fullwidth></div>
<img src=lunala.gif class=trans style=position:absolute;bottom:2rem;left:1rem;transform:scaleX(-1);z-index:-1;width:8rem>
<img src=sylveon.gif class=trans style=position:absolute;bottom:1.3rem;right:1rem;z-index:-1;width:4.5rem>
<img src=../good-boy3.webp inert alt="a gif of furret walking." class=trans style="position:absolute;bottom:0.6rem;right:1rem;width:8rem;animation:-9.9s 10s linear infinite walk; z-index:2;">
<img src=flying/vivillon-fancy.gif class=trans style="position:absolute;bottom:9rem;left:1rem;scale:-1 1;z-index:-1;animation:10s 10s backwards linear infinite walk;width:6rem">
<!-- adding an animation delay of -9.9s is the only way to work around the fact that chromium doesn't respect the overflow-x:clip or hidden property -->
<script src=/webpnotice.js></script>
`
		break;
	case '/Tags/Kirby/':
		uniquePageDecoration=`
<div style=height:120px class=fullwidth></div>
<style>
@keyframes bounce{
	0%{transform:translateY(0)}
	100%{transform:translateY(var(--bh))}
}
@keyframes giffy{
	0%{object-position:0}
	46.153%{object-position:calc(-30px * 2)}
	53.846%{object-position:calc(-60px * 2)}
	92.307%{object-position:calc(-30px * 2)}
}
</style>
<img src=../chip.gif alt="A gif of a fox droplet." class="trans pixl" style="position:absolute;bottom:.6rem;right:.4rem;width:4rem">
<div id=normalMarx style="position:absolute;bottom:calc(1rem + calc(24px * 2));left:135px;width:calc(30px * 2);height:calc(39px * 2);animation:.35s cubic-bezier(.23,1,.32,1) infinite alternate bounce;--bh:calc(-9px * 2)">
	<img src=../normalMarxBounce.png class="trans pixl" style="object-fit:cover;height:100%;animation:1.4s step-end -0.85s infinite giffy">
</div>
<img src=../ball.gif class="trans pixl" style="position:absolute;bottom:1rem;left:calc(135px + 6px);width:calc(24px * 2);animation:.35s cubic-bezier(.23,1,.32,1) infinite alternate bounce;--bh:calc(-3px * 2)">
<!--https://www.deviantart.com/megatoon1234/art/Kirby-Super-Star-Regular-Marx-Sprites-Colored-767435785 -->
<div id=marx style="position:absolute;bottom:4rem;left:10px;width:calc(158px * 2);animation:0.5s ease-in-out -0.3s infinite alternate-reverse paused bounce;--bh:-1rem;display:none">
<img src=../marxSpriteGif2.gif class="trans pixl" style="position:relative;z-index:1">
<img src=../crystals3.gif class="trans pixl" style="position:absolute;bottom:.3rem;width:calc(147px * 2);height:calc(46px * 2);left:0;right:0;margin:auto">
</div>
<script>
let normalMarx=document.querySelector("#normalMarx")
document.querySelector("img[src='../ball.gif']").addEventListener("click", function(){
	normalMarx.style.animation=""
	normalMarx.style.bottom="calc(1rem + calc(33px * 2))"
	normalMarx.addEventListener("animationend",function(){
		normalMarx.style.animation=""
		normalMarx.style.setProperty("--bh","calc(-4px * 2)");
		setTimeout(function(){normalMarx.style.animation=".2s cubic-bezier(.23,1,.32,1) 2 alternate bounce"},10)
	},{once:true})
	setTimeout(function(){
		normalMarx.style.setProperty("--bh","calc(-33px * 2)")
		normalMarx.style.animation=".5s cubic-bezier(.23,1,.32,1) reverse bounce"
		normalMarx.style.bottom="calc(1rem - calc(3px * 2))"
	},10)
	this.remove();
	//normalMarx.src="normalMarx2.png"
	normalMarx.children[0].style.animation=""
	let marx=document.querySelector("#marx")
	setTimeout(function(){normalMarx.style.animation=""},2000)
	setTimeout(function(){
		normalMarx.style.setProperty("--bh","calc(-39px * 2)");
		marx.children[0].src="../marxTransform.gif";
		normalMarx.addEventListener("animationend",function(){
			marx.children[1].style.display="none";
			marx.style.display="block";
			setTimeout(function(){marx.children[0].src="../marxSpriteGif2.gif";marx.style.animationPlayState="running";marx.children[1].style.display="block"},700)
			setTimeout(function(){normalMarx.style.display="none"},200)
		},{once:true})
		normalMarx.style.animation="3s linear forwards bounce"
	}, 3000)
},{once:true})
</script>
		`
		break;
	case '/Tags/Kirby-and-the-Forgotten-Land/':
		uniquePageDecoration=`<div style=height:7rem class=fullwidth></div><img src=../elfilin.gif alt="Animated gif of Elfilin, a cyan chinchilla creature." class=trans style="position:absolute;bottom:.4rem;left:.4rem;width:6rem">`
		break;
	case '/Tags/Kirby-Star-Allies/':
		uniquePageDecoration=`<div style=height:11rem class=fullwidth></div><img src=../vividria.webp alt="Animated gif of Vividria, the artist." class=trans style="position:absolute;bottom:1.5rem;left:.4rem;width:10rem">`
		break;
	case '/Tags/Kirby-Triple-Deluxe/':
		uniquePageDecoration=`<img src=../ringle3.webp alt="A gif of Ringle." class=trans style="position:absolute;bottom:.4rem;left:.4rem;width:6rem">`
		break;
	case "/Tags/Kirby's-Epic-Yarn/":
		uniquePageDecoration=`<!--<img src=Yarn.gif alt="Placeholder." class=trans style="position:absolute;bottom:.4rem;left:.4rem;width:6rem">
extract EY files with dolphin and replace backgrounds with a green screen to make gifs of the characters-->`
		break;
	case '/Tags/Kirby-Mass-Attack/':
		uniquePageDecoration=`<!--<img src=KirbyMA.gif alt="Placeholder." class=trans style="position:absolute;bottom:.4rem;left:.4rem;width:6rem">-->`
		// idea: horde of kirbies running at different speeds
		break;
	case '/Tags/Splatoon-3/':
		uniquePageDecoration=`<div style=height:12rem class=fullwidth></div><img src=../splashtagBadgesEmbeddedfonts.svg alt="Splashtag with pink and blue smily background: Midnight Moon Thysbelon #1964. Badges: Jel La Fleur, Harmony, Octavio." style=position:absolute;bottom:1.4rem;right:.4rem;width:30rem>`
		break;
	case '/Tags/Puyo-Puyo/':
		uniquePageDecoration=``
		break;
	case '/Tags/Pokémon-Legends-Arceus/':
		uniquePageDecoration=``
		break;
	case '/Tags/Klonoa/':
		uniquePageDecoration=``
		break;
	case '/Tags/Taiko-no-Tatsujin/':
		uniquePageDecoration=``
		break;
	default:
		break;
}
return `
<h1>Tagged “${ data.tag }”</h1>
${ this.generateArchiveHTMLfromCollection(this.tagFilter(data.collections.enPostsInComputedDateOrder, data.tag)) }
${uniquePageDecoration}
`;
}
}

/*
{% if page.url == "/Tags/Pokémon/" %}
{% endif %}
{% if page.url == "/Tags/Kirby/" %}
<style>
@keyframes bounce{
	0%{transform:translateY(0)}
	100%{transform:translateY(var(--bh))}
}
@keyframes giffy{
	0%{object-position:0}
	46.153%{object-position:calc(-30px * 2)}
	53.846%{object-position:calc(-60px * 2)}
	92.307%{object-position:calc(-30px * 2)}
}
</style>
<img src=../chip.gif alt="A gif of a fox droplet." class="trans pixl" style="position:absolute;bottom:.6rem;right:.4rem;width:4rem">
<div id=normalMarx style="position:absolute;bottom:calc(1rem + calc(24px * 2));left:135px;width:calc(30px * 2);height:calc(39px * 2);animation:.35s cubic-bezier(.23,1,.32,1) infinite alternate bounce;--bh:calc(-9px * 2)">
	<img src=../normalMarxBounce.png class="trans pixl" style="object-fit:cover;height:100%;animation:1.4s step-end -0.85s infinite giffy">
</div>
<img src=../ball.gif class="trans pixl" style="position:absolute;bottom:1rem;left:calc(135px + 6px);width:calc(24px * 2);animation:.35s cubic-bezier(.23,1,.32,1) infinite alternate bounce;--bh:calc(-3px * 2)">
<!--https://www.deviantart.com/megatoon1234/art/Kirby-Super-Star-Regular-Marx-Sprites-Colored-767435785 -->
<div id=marx style="position:absolute;bottom:4rem;left:10px;width:calc(158px * 2);animation:0.5s ease-in-out -0.3s infinite alternate-reverse paused bounce;--bh:-1rem;display:none">
<img src=../marxSpriteGif2.gif class="trans pixl" style="position:relative;z-index:1">
<img src=../crystals3.gif class="trans pixl" style="position:absolute;bottom:.3rem;width:calc(147px * 2);height:calc(46px * 2);left:0;right:0;margin:auto">
</div>
<script>
let normalMarx=document.querySelector("#normalMarx")
document.querySelector("img[src='../ball.gif']").addEventListener("click", function(){
	normalMarx.style.animation=""
	normalMarx.style.bottom="calc(1rem + calc(33px * 2))"
	normalMarx.addEventListener("animationend",function(){
		normalMarx.style.animation=""
		normalMarx.style.setProperty("--bh","calc(-4px * 2)");
		setTimeout(function(){normalMarx.style.animation=".2s cubic-bezier(.23,1,.32,1) 2 alternate bounce"},10)
	},{once:true})
	setTimeout(function(){
		normalMarx.style.setProperty("--bh","calc(-33px * 2)")
		normalMarx.style.animation=".5s cubic-bezier(.23,1,.32,1) reverse bounce"
		normalMarx.style.bottom="calc(1rem - calc(3px * 2))"
	},10)
	this.remove();
	//normalMarx.src="normalMarx2.png"
	normalMarx.children[0].style.animation=""
	let marx=document.querySelector("#marx")
	setTimeout(function(){normalMarx.style.animation=""},2000)
	setTimeout(function(){
		normalMarx.style.setProperty("--bh","calc(-39px * 2)");
		marx.children[0].src="../marxTransform.gif";
		normalMarx.addEventListener("animationend",function(){
			marx.children[1].style.display="none";
			marx.style.display="block";
			setTimeout(function(){marx.children[0].src="../marxSpriteGif2.gif";marx.style.animationPlayState="running";marx.children[1].style.display="block"},700)
			setTimeout(function(){normalMarx.style.display="none"},200)
		},{once:true})
		normalMarx.style.animation="3s linear forwards bounce"
	}, 3000)
},{once:true})
</script>
{% endif %}
{% if page.url == "/Tags/Kirby-and-the-Forgotten-Land/" %}
<img src=../elfilin.gif alt="Animated gif of Elfilin, a cyan chinchilla creature." class=trans style="position:absolute;bottom:.4rem;left:.4rem;width:6rem">
{% endif %}
{% if page.url == "/Tags/Kirby-Star-Allies/" %}
<img src=../vividria.webp alt="Animated gif of Vividria, the artist." class=trans style="position:absolute;bottom:1.5rem;left:.4rem;width:10rem">
<script src=/webpnotice.js></script>
{% endif %}
{% if page.url == "/Tags/Kirby-Triple-Deluxe/" %}
<img src=../ringle3.webp alt="A gif of Ringle." class=trans style="position:absolute;bottom:.4rem;left:.4rem;width:6rem">
<script src=/webpnotice.js></script>
{% endif %}
{% if page.url == "/Tags/Kirby-s-Epic-Yarn/" %}
<!--<img src=Yarn.gif alt="Placeholder." class=trans style="position:absolute;bottom:.4rem;left:.4rem;width:6rem">
extract EY files with dolphin and replace backgrounds with a green screen to make gifs of the characters-->
{% endif %}
{% if page.url == "/Tags/Kirby-Mass-Attack/" %}
<!--<img src=KirbyMA.gif alt="Placeholder." class=trans style="position:absolute;bottom:.4rem;left:.4rem;width:6rem">-->
{% endif %}
{% if page.url == "/Tags/Splatoon-3/" %}
<img src=../splashtagBadgesEmbeddedfonts.svg alt="Splashtag with pink and blue smily background: Midnight Moon Thysbelon #1964. Badges: Jel La Fleur, Harmony, Octavio." style=position:absolute;bottom:1.4rem;right:.4rem;width:30rem>
<script src=/webpnotice.js></script>
{% endif %}
{% if page.url == "/Tags/Puyo-Puyo/" %}
{% endif %}
{% if page.url == "/Tags/Pokémon-Legends-Arceus/" %}
{% endif %}
{% if page.url == "/Tags/Klonoa/" %}
{% endif %}
{% if page.url == "/Tags/Taiko-no-Tatsujin/" %}
{% endif %}
*/
