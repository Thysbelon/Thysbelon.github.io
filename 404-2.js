onmessage=async function(e) {
var keywords=e.data
keywords=keywords.replace(/\d\d\d\d\/\d\d\/\d\d\//, "")
keywords=keywords.replace(/-/g, "/")//remove maybe?
keywords=keywords.split('/')
keywords.shift()
console.log(keywords)
var keywordsComplete=keywords.map(x => x = {word:x,ranking:0,PageMatches:[]});
var tenposts=["","","","","","","","","",""];
let allposts = await fetch('/posts.json')
allposts = await allposts.json()
console.log(allposts)
for (let keyword of keywordsComplete) {
	for (let post of allposts) {
		if (post.toLowerCase().includes(keyword.word.toLowerCase())) {keyword.ranking+=1; keyword.PageMatches.push(post)}
	}
}
keywordsComplete.sort(function(a, b){return a.ranking - b.ranking})
console.log(keywordsComplete);
let progress=0;
for (let keyword of keywordsComplete) {
	for (let posturl of keyword.PageMatches) {
		if (tenposts.includes(posturl) == false) {
			tenposts[progress]=posturl;
			progress++;
			if (progress==10) {break}
		}
	}
}
tenposts.length=progress;
console.log(tenposts)
let outputHTML="<ol>"
for (let i of tenposts) {outputHTML+="<li><a href="+i+">"+i+"</a>"}
outputHTML+="</ol>"
postMessage(outputHTML)
}