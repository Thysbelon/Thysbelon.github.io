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
		/*
		customThemes: {
			"Vib-Ribbon": {
				customLogo: "<img id=blogtitle src=/css/vib-ribbon-theme/thystitle2-min.gif alt=Thysbelon. width=484 height=154><img src=/css/vib-ribbon-theme/thyslogo5-min.gif alt=\"Logo of a Hummingbird moth drawn with angular lines.\" width=281 height=281>",
				customIcon: "/css/vib-ribbon-theme/thyslogo5-min.gif",
				extraStylesheet: "vib-ribbon-theme/vib-ribbon.css",
				customFooter: " "
			}
		},
		*/
		eleventyComputed: {
			title: data => `${ data.tag } Tag`,
			customLogo: function(data){return data.customThemes?.[data.tag]?.customLogo},
			customIcon: function(data){return data.customThemes?.[data.tag]?.customIcon},
			extraStylesheet: function(data){return data.customThemes?.[data.tag]?.extraStylesheet},
			customFooter: function(data){return data.customThemes?.[data.tag]?.customFooter},
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
img {
	width:auto;
}
</style>
<div style=height:13rem class=fullwidth></div>
<img src=lunala.gif class=trans style=position:absolute;bottom:2rem;left:1rem;transform:scaleX(-1);z-index:-1;height:calc(4*4rem)> <!-- Lunala is 4 meters tall. -->
<img src=hatterene.gif class=trans style=position:absolute;bottom:1.4rem;left:1rem;transform:scaleX(-1);z-index:-1;height:calc(2.1*6rem)>
<img src=iron-valiant.gif class=trans style=position:absolute;bottom:1.4rem;left:22rem;transform:scaleX(-1);z-index:-1;height:calc(1.4*6rem)>
<img src=leavanny.gif class=trans style=position:absolute;bottom:1.4rem;left:26rem;transform:scaleX(-1);z-index:-1;height:calc(1.2*6rem)>
<img src=lurantis.gif class=trans style=position:absolute;bottom:1.4rem;right:10rem;z-index:-1;height:calc(0.9*6rem)>
<img src=meowscarada.gif class=trans style=position:absolute;bottom:1.4rem;right:1rem;z-index:-1;height:calc(1.5*6rem)>
<img src=sylveon.gif class=trans style=position:absolute;bottom:1.4rem;right:6rem;z-index:-1;height:calc(1*6rem)>
<img src=scolipede.gif class=trans style=position:absolute;bottom:1.4rem;right:5rem;z-index:-2;height:calc(2.5*6rem)>
<img src=skitty-2d.gif class=trans style=position:absolute;bottom:1.4rem;right:14rem;z-index:-1;height:calc(0.6*6rem)>
<img src=../good-boy3.webp inert alt="a gif of furret walking." class=trans style="position:absolute;bottom:0.6rem;right:1rem;width:8rem;animation:-9.9s 10s linear infinite walk; z-index:2;">
<img src=flying/vivillon-fancy.gif class=trans style="position:absolute;bottom:9rem;left:1rem;scale:-1 1;z-index:-1;animation:20s 10s backwards linear infinite walk;height:calc(1.2*6rem)">
<img src=flying/frosmoth.gif class=trans style="position:absolute;bottom:9rem;left:1rem;scale:-1 1;z-index:-1;animation:15s 10s backwards linear infinite walk;height:calc(1.3*6rem)">
<img src=flying/beautifly-f.gif class=trans style="position:absolute;bottom:9rem;left:1rem;scale:-1 1;z-index:-1;animation:10s 10s backwards linear infinite walk;height:calc(1*6rem)">
<!-- https://projectpokemon.org/home/docs/spriteindex_148/3d-models-generation-8-pok%C3%A9mon-r123/ -->
<!-- adding an animation delay of -9.9s is the only way to work around the fact that chromium doesn't respect the overflow-x:clip or hidden property -->
<script src=/webpnotice.js></script>
`
		break;
	case '/Tags/Kirby/':
		uniquePageDecoration=`
<div id=deco-padding class=fullwidth></div>
<style>
@keyframes bounce{
	0%{transform:translateY(0)}
	100%{transform:translateY(var(--bh))}
}
@keyframes giffy{
	0%{object-position:0}
	46.153%{object-position:calc((var(--natural-width) / 3) * -1 * 0.125rem)}
	53.846%{object-position:calc((var(--natural-width) / 1.5) * -1 * 0.125rem)}
	92.307%{object-position:calc((var(--natural-width) / 3) * -1 * 0.125rem)}
}
#deco-padding {
	height:calc(120 * 0.0625rem);
}
</style>
<img src=../chip.gif alt="A gif of a fox droplet." class="trans pixl" style="position:absolute;bottom:1rem;right:.4rem;width:calc(27 * 0.12rem)">
<img src=../magolor.apng alt="A pixellated animation of Magolor." class="trans pixl" style="position:absolute;bottom:2rem;left:0.5rem;width:5rem">
<img src=../noddy.apng alt="Animation of noddy from the flagship games." class="trans pixl" style="position:absolute;bottom:1.4rem;right:5rem;width:calc(22 * 0.12rem)">
<div style="position:absolute;bottom:6rem;right:1rem;width:3rem;animation:0.5s ease-in-out infinite alternate-reverse bounce;--bh:1rem;">
<img src=../kssu-scarfy.apng alt="Animation of scarfy from KSSU." class="trans pixl" style="transform:scaleX(-1)">
</div>
<!-- kssu scarfy, AM noddy, AM batafire, AM Roly-Poly, kdl3 bouncy, kndl needlous, AM Minny, SS gaw gaw -->
<div id=normalMarx style="position:absolute;bottom:calc(1rem + calc(21 * 0.125rem));left:calc(135 * 0.0625rem);animation:.35s cubic-bezier(.23,1,.32,1) infinite alternate bounce;--bh:calc(-12 * 0.125rem)">
	<img src=../puzzle-swap-marx.png class="trans pixl" style="
		width:calc((var(--natural-width) / 3) * 0.125rem);
		height:calc(var(--natural-height) * 0.125rem); 
		object-fit:cover;
		animation:1.4s step-end -0.85s infinite giffy">
</div>
<img src=../ball.apng class="trans pixl" 
	style="
		position:absolute;
		bottom:1rem;
		left:calc((135 + 8) * 0.0625rem);
		width:calc(var(--natural-width) * 0.125rem);
		animation:.35s cubic-bezier(.23,1,.32,1) infinite alternate bounce;
		--bh:calc(-3 * 0.125rem);">
<div id=marx style="position:absolute;bottom:4rem;left:calc(10 * 0.0625rem);width:calc(158 * 0.125rem);animation:0.5s ease-in-out -0.3s infinite alternate-reverse paused bounce;--bh:-1rem;display:none">
<img src=../marxSpriteGif2.gif class="trans pixl" style="position:relative;z-index:1">
<img src=../crystals3.gif class="trans pixl" style="position:absolute;bottom:.3rem;width:calc(147 * 0.125rem);height:calc(46 * 0.125rem);left:0;right:0;margin:auto">
</div>
<script>
let normalMarx=document.querySelector("#normalMarx")
document.querySelector("img[src='../ball.apng']").addEventListener("click", function(){
	normalMarx.style.animation=""
	normalMarx.style.bottom="calc(1rem + calc(33 * 0.125rem))"
	normalMarx.addEventListener("animationend",function(){
		normalMarx.style.animation=""
		normalMarx.style.setProperty("--bh","calc(-4 * 0.125rem)");
		setTimeout(function(){normalMarx.style.animation=".2s cubic-bezier(.23,1,.32,1) 2 alternate bounce"},10)
	},{once:true})
	setTimeout(function(){
		normalMarx.style.setProperty("--bh","calc(-33 * 0.125rem)")
		normalMarx.style.animation=".5s cubic-bezier(.23,1,.32,1) reverse bounce"
		normalMarx.style.bottom="calc(1rem - calc(3 * 0.125rem))"
	},10)
	this.remove();
	//normalMarx.src="normalMarx2.png"
	normalMarx.children[0].style.animation=""
	let marx=document.querySelector("#marx")
	setTimeout(function(){normalMarx.style.animation=""},2000)
	setTimeout(function(){
		normalMarx.style.setProperty("--bh","calc(-39 * 0.125rem)");
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
	case "/Tags/Kirby's-Epic-Yarn/": // TODO: make all these html elements a part of the yarn-kirby theme.
		uniquePageDecoration=`
		<div style="height:13rem" class="fullwidth"></div> <!-- padding -->
		<div id=floorParent>
			<div id=floor>
			</div>
		</div>
		<div id=furniture>
			<div id=furniture-left>
				<img src=/css/yarn-kirby-theme/KEY_Furniture_Clef_Tree.png>
				<img src=/css/yarn-kirby-theme/KEY_Furniture_Choco_Ottoman.png>
				<img src=/css/yarn-kirby-theme/KEY_Furniture_Toy_Piano.png>
			</div>
			<div id=furniture-center-left>
				<img src=/css/yarn-kirby-theme/KEY_Furniture_Bell_Hanging.png>
				<img src=/css/yarn-kirby-theme/KEY_Furniture_Chocolate_Bar.png>
			</div>
			<div id=furniture-center-right> <!--optional-->
				<img src=/css/yarn-kirby-theme/KEY_Furniture_Tree-Stump_Bed.png>
				<img src=/css/yarn-kirby-theme/KEY_Furniture_Dangler_Light.png>
				<img src=/css/yarn-kirby-theme/KEY_Furniture_Frog_Umbrella_Stand.png>
				<img src=/css/yarn-kirby-theme/KEY_Furniture_Log_Cake.png>
			</div>
			<div id=furniture-right>
				<img src=/css/yarn-kirby-theme/KEY_Furniture_Moon_Clock.png>
				<img src=/css/yarn-kirby-theme/KEY_Furniture_Flower_Sofa.png>
				<img src=/css/yarn-kirby-theme/KEY_Furniture_Scarfy.png>
			</div>
		</div>
		
		<img src=/css/yarn-kirby-theme/yarnkirby.apng alt="Yarn Kirby waving." class=trans>
		<img src=/css/yarn-kirby-theme/princefluff.apng alt="Prince Fluff waving." class=trans>
		`
		break;
	case '/Tags/Kirby-Mass-Attack/':
		uniquePageDecoration=`
<style>
@keyframes walk{
	0%{transform:translateX(-10vw)}
	100%{transform:translateX(100vw)}
}
img[src^="../kirbyMA"]{
	position:absolute;
	bottom:.6rem;
	left:.4rem;
	width:3rem;
	animation:var(--s) linear infinite walk;
	z-index:2;
}
</style>
<img src=../kirbyMA1.gif class="trans pixl" alt="A small kirby walking." style=--s:10s>
<img src=../kirbyMA1.gif class="trans pixl" alt="A small kirby walking." style=--s:9s>
<img src=../kirbyMA1.gif class="trans pixl" alt="A small kirby walking." style=--s:8s>
<img src=../kirbyMA2.gif class="trans pixl" alt="A small kirby walking." style=--s:7s>
<img src=../kirbyMA2.gif class="trans pixl" alt="A small kirby walking." style=--s:7.5s>
<img src=../kirbyMA2.gif class="trans pixl" alt="A small kirby walking." style=--s:8.5s>
<img src=../kirbyMA3.gif class="trans pixl" alt="A small kirby walking." style=--s:9.5s>
<img src=../kirbyMA3.gif class="trans pixl" alt="A small kirby walking." style=--s:10.5s>
<img src=../kirbyMA4.gif class="trans pixl" alt="A small kirby walking." style=--s:9.25s>
<img src=../kirbyMA4.gif class="trans pixl" alt="A small kirby walking." style=--s:8.25s>
<!-- the spriters resource -->
`
		break;
	case '/Tags/Splatoon-3/':
		uniquePageDecoration=`<div style=height:12rem class=fullwidth></div><img src=../splashtagBadgesEmbeddedfonts.svg alt="Splashtag with pink and blue smily background: Midnight Programmer Thysbelon #1964. Badges: Jel La Fleur, Harmony, Big Run Bronze." style=position:absolute;bottom:1.4rem;right:.4rem;width:30rem>`
		break;
	case '/Tags/Pokémon-Legends-Arceus/':
		uniquePageDecoration=`
<img src=typhlosion-hisui.gif class=trans style=position:absolute;bottom:1.3rem;left:.25rem;transform:scaleX(-1);height:7rem;z-index:2>
<img src=sneasler.gif class=trans style=position:absolute;bottom:1.3rem;right:.5rem;height:7rem;z-index:2>
<img src=zoroark-hisui.gif class=trans style=position:absolute;bottom:1.3rem;left:5.75rem;transform:scaleX(-1);height:7rem;z-index:2>
<img src=lilligant-hisui.gif class=trans style=position:absolute;bottom:1.3rem;right:4.5rem;height:7rem;z-index:2>
`
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
