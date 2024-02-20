onmessage=function(e) {
{
	// from ChatGPT, with some modifications
	const japaneseRegex = /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー々〆〤]/gu; 
	const hiraganaRegex = /[\p{Script=Hiragana}]/u; 
	const katakanaRegex = /[\p{Script=Katakana}ー]/u; 
	const kanjiRegex = /[\p{Script=Han}々〆〤]/u; 
	const latinRegex = /[\p{Script=Latin}\p{ASCII}]/u

	var containsJapanese = (str) => japaneseRegex.test(str);
	var containsHiragana = (str) => hiraganaRegex.test(str);
	var containsKatakana = (str) => katakanaRegex.test(str);
	var containsKanji = (str) => kanjiRegex.test(str);
	var containsLatin = (str) => latinRegex.test(str);
}
var keywords1=e.data.pathname
keywords1=keywords1.replace(/\d\d\d\d\/\d\d\/\d\d\//, "")
keywords1=keywords1.replace(/-/g, "/")// remove parenthesis as well?
keywords1=keywords1.split('/')
keywords1.shift()
console.log("keywords1: "+keywords1)
var keywords=[]
// keywords1 is split like the english JS code.
for (let wordIndex=0, l=keywords1.length;wordIndex<l;wordIndex++) {
	let currentword=decodeURI(keywords1[wordIndex])
	if (containsJapanese(currentword)) {
		console.log("keywords1["+wordIndex+"], "+currentword+", contains Japanese characters. Assigning to JPstringWorkbench to begin splitting work...")
		let JPstringWorkbench=currentword // JP sentence to split into words
		let prevCharType=""
		if (containsHiragana(JPstringWorkbench[0])) { // assign prevCharType
			prevCharType="Hiragana"
		} else if (containsKatakana(JPstringWorkbench[0])) {
			prevCharType="Katakana"
		} else if (containsKanji(JPstringWorkbench[0])) {
			prevCharType="Kanji"
		} else if (containsLatin(JPstringWorkbench[0])) {
			prevCharType="Latin"
		}
		let curJPkeywordAssembly=JPstringWorkbench[0] // current word being assembled
		console.log("First char of JPstringWorkbench is "+JPstringWorkbench[0]+". Its type is "+prevCharType+".")
		for (let CharIndex=1, l2=JPstringWorkbench.length; CharIndex<l2; CharIndex++) {
			let curCharType=""
			if (containsHiragana(JPstringWorkbench[CharIndex])) {
				curCharType="Hiragana"
			} else if (containsKatakana(JPstringWorkbench[CharIndex])) {
				curCharType="Katakana"
			} else if (containsKanji(JPstringWorkbench[CharIndex])) {
				curCharType="Kanji"
			} else if (containsLatin(JPstringWorkbench[CharIndex])) {
				curCharType="Latin"
			}
			console.log("The current char is "+JPstringWorkbench[CharIndex]+". Its type is "+curCharType+".")
			if (curCharType==prevCharType) {
				console.log("The current char \""+JPstringWorkbench[CharIndex]+"\" is the same type as the previous char \""+JPstringWorkbench[CharIndex-1]+"\".")
				curJPkeywordAssembly+=JPstringWorkbench[CharIndex] // if the current char and previous char are the same, add the current char to the word being assembled.
				console.log("curJPkeywordAssembly is now "+curJPkeywordAssembly)
			} else { // if the current char and previous char are different, assume that the word being assembled is complete and push it to keywords; start assembling a new word starting with the current char
				console.log("The current char \""+JPstringWorkbench[CharIndex]+"\" is a different type from the previous char \""+JPstringWorkbench[CharIndex-1]+"\". curJPkeywordAssembly ("+curJPkeywordAssembly+") is complete. pushing to keywords...")
				keywords.push(curJPkeywordAssembly)
				curJPkeywordAssembly=JPstringWorkbench[CharIndex]
				console.log("curJPkeywordAssembly has been reset to \""+curJPkeywordAssembly+"\". The charType is "+curCharType+".")
				prevCharType=curCharType
			}
		}
		// when the loop is finished, push the final word:
		console.log("The loop has finished. pushing the final curJPkeywordAssembly ("+curJPkeywordAssembly+") to keywords.")
		keywords.push(curJPkeywordAssembly)
	} else { // if the current word in keywords1 is a whole english word, push it to keywords.
		console.log("keywords1["+wordIndex+"], "+currentword+", does not contain Japanese characters. pushing to keywords...")
		keywords.push(currentword)
	}
}
console.log(keywords)
var keywordsComplete=keywords.map(x => x = {word:x,ranking:0,PageMatches:[]});
var tenposts=["","","","","","","","","",""];
let allposts /* this is all pages */ = e.data.URLarray
console.log(allposts)
for (let keyword of keywordsComplete) {
	for (let post of allposts) {
		if (decodeURI(post).toLowerCase().includes(keyword.word.toLowerCase())) {keyword.ranking+=1; keyword.PageMatches.push(decodeURI(post))}
	}
}
keywordsComplete.sort(function(a, b){return a.ranking - b.ranking})
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
for (let i=0, l=tenposts.length; i<l; i++) {
	tenposts[i]=decodeURI(tenposts[i])
}
let outputHTML="<ol>"
for (let i of tenposts) {outputHTML+="<li><a href="+i+">"+i+"</a>"}
outputHTML+="</ol>"
postMessage(outputHTML)
}