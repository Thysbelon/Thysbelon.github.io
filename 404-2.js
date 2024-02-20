onmessage=function(e) {
console.log('message received from main')
var keywords=e.data.pathname
keywords=keywords.replace(/\d\d\d\d\/\d\d\/\d\d\//, "") // change
keywords=keywords.replace(/-/g, "/")// remove parenthesis as well?
keywords=keywords.split('/')
keywords.shift()
console.log(keywords)
var keywordsComplete=keywords.map(x => x = {word:x,ranking:0,PageMatches:[]});
var tenposts=["","","","","","","","","",""];
//let allposts = await fetch('/posts.json')
//allposts = await allposts.json()
const allposts /* this is all pages */ = e.data.URLarray
console.log(allposts)
for (let keyword of keywordsComplete) {
	for (let post of allposts) {
		if (post.toLowerCase().includes(keyword.word.toLowerCase())) {keyword.ranking+=1; keyword.PageMatches.push(post)}
	}
}
keywordsComplete.sort(function(a, b){return a.ranking - b.ranking}) // keywords with the least matches will be at the top.
console.log(keywordsComplete);
let progress=0;
father_loop:
for (let keyword of keywordsComplete) {
	for (let posturl of keyword.PageMatches) {
		if (tenposts.includes(posturl) == false) {
			tenposts[progress]=posturl;
			progress++
			if (progress==10) {break father_loop} //https://stackoverflow.com/questions/1564818/how-to-break-nested-loops-in-javascript
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