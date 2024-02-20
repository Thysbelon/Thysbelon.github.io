const { DateTime } = require("luxon");
const markdownItAnchor = require("markdown-it-anchor");

const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginBundle = require("@11ty/eleventy-plugin-bundle");
const pluginNavigation = require("@11ty/eleventy-navigation");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

const pluginDrafts = require("./eleventy.config.drafts.js");
const pluginImages = require("./eleventy.config.images.js");

//const TinySegmenter = require("tiny-segmenter"); // split Japanese text into words // treats every single latin letter as a separate word. bad

module.exports = function(eleventyConfig) {
	// Copy the contents of the `public` folder to the output folder
	// For example, `./public/css/` ends up in `_site/css/`
	eleventyConfig.addPassthroughCopy({
		"./public/": "/"//,
		//"./node_modules/prismjs/themes/prism-okaidia.css": "/css/prism-okaidia.css"
	});
	//eleventyConfig.addPassthroughCopy("./content/*.png");
	//eleventyConfig.addPassthroughCopy("./content/**/*.png");
	//eleventyConfig.addPassthroughCopy({"./content/blog/**/!(*.11ty|*.11tydata).!(njk|md|html|liquid|hbs|mustache|ejs|pug)":"blog"}, { rename: function(src){
	//	console.log('passthrough input: '+src)
	//	//var fileString = src
	//	//fileString = fileString.replace(/^content/, '')
	//	//fileString = fileString.replace(/(\d\d\d\d-\d\d?-\d\d?).+?\//, '$1/')
	//	//console.log('passthrough output'+fileString)
	//	//return fileString
	//	return src
	//}, debug: true }); // blog post files will be copied unique folders for each post. directory structure of different languages will be /blog/engpost/ and /ブログ/日本語ポスト/. Maybe arbitrary post files can be in /blog/2023-08-1/image.png, where the date is the post date? This would require accessing post front matter in the copyOptions.rename function, which would require using collections? idk
	eleventyConfig.addPassthroughCopy("./content/Blog", { filter: ["**/!(*.11ty|*.11tydata).!(njk|md|html|liquid|hbs|mustache|ejs|pug)"], rename: function(src){ // https://github.com/11ty/eleventy/issues/3010#issuecomment-1661392357
		//console.log('passthrough input: '+src)
		var fileString = src
		//fileString = fileString.replace(/^content/, '')
		fileString = fileString.replace(/(\d\d\d\d-\d\d?-\d\d?).+?\//, '$1/')
		//console.log('passthrough output'+fileString)
		return fileString
		//return src
	} }); // blog post files will be copied unique folders for each post. directory structure of different languages will be /blog/engpost/ and /ブログ/日本語ポスト/. Maybe arbitrary post files can be in /blog/2023-08-1/image.png, where the date is the post date? This would require accessing post front matter in the copyOptions.rename function, which would require using collections? idk
	// https://stackoverflow.com/questions/39296057/glob-for-all-folders-within-a-folder-except-one-named-folder
	eleventyConfig.addPassthroughCopy("./content/{!(*.11ty|*.11tydata).!(njk|md|html|liquid|hbs|mustache|ejs|pug),!(Blog|sitemap)/**/!(*.11ty|*.11tydata).!(njk|md|html|liquid|hbs|mustache|ejs|pug)}"); // other pages will have their files copied as is

	// Run Eleventy when these files change:
	// https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

	// Watch content images for the image pipeline.
	//eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg}");

	// App plugins
	eleventyConfig.addPlugin(pluginDrafts);
	eleventyConfig.addPlugin(pluginImages);

	// Official plugins
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(pluginSyntaxHighlight, {
		preAttributes: { tabindex: 0 }
	});
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	eleventyConfig.addPlugin(pluginBundle);

	// JavaScript Functions
	eleventyConfig.addJavaScriptFunction('jpStringToWordArray', function(jpString){

		const resultArray=[]

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

		let JPstringWorkbench=jpString // JP sentence to split into words
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
		//console.log("First char of JPstringWorkbench is "+JPstringWorkbench[0]+". Its type is "+prevCharType+".")
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
			//console.log("The current char is "+JPstringWorkbench[CharIndex]+". Its type is "+curCharType+".")
			if (curCharType==prevCharType) {
				//console.log("The current char \""+JPstringWorkbench[CharIndex]+"\" is the same type as the previous char \""+JPstringWorkbench[CharIndex-1]+"\".")
				curJPkeywordAssembly+=JPstringWorkbench[CharIndex] // if the current char and previous char are the same, add the current char to the word being assembled.
				//console.log("curJPkeywordAssembly is now "+curJPkeywordAssembly)
			} else { // if the current char and previous char are different, assume that the word being assembled is complete and push it to the resultArray; start assembling a new word starting with the current char
				//console.log("The current char \""+JPstringWorkbench[CharIndex]+"\" is a different type from the previous char \""+JPstringWorkbench[CharIndex-1]+"\". curJPkeywordAssembly ("+curJPkeywordAssembly+") is complete. pushing to resultArray...")
				resultArray.push(curJPkeywordAssembly)
				curJPkeywordAssembly=JPstringWorkbench[CharIndex]
				//console.log("curJPkeywordAssembly has been reset to \""+curJPkeywordAssembly+"\". The charType is "+curCharType+".")
				prevCharType=curCharType
			}
		}
		// when the loop is finished, push the final word:
		//console.log("The loop has finished. pushing the final curJPkeywordAssembly ("+curJPkeywordAssembly+") to resultArray.")
		resultArray.push(curJPkeywordAssembly)

		return resultArray
	})

	// Filters
	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
	});

	eleventyConfig.addFilter('htmlDateString', (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
	});

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if(!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if( n < 0 ) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// Return all the tags used in a collection
	eleventyConfig.addFilter("getAllTags", collection => {
		let tagSet = new Set();
		for(let item of collection) {
			(item.data.tags || []).forEach(tag => tagSet.add(tag));
		}
		return Array.from(tagSet);
	});

	// WIP: Return all the categories used in a collection
	eleventyConfig.addFilter("getAllCategories", collection => {
		let categorySet = new Set();
		for(let item of collection) {
			(item.data.categories || []).forEach(category => categorySet.add(category));
		}
		return Array.from(categorySet);
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
	});

	eleventyConfig.addFilter("generateArchiveHTMLfromCollection", (collection, lang='en') => {
		//console.log('generateArchiveHTMLfromCollection running. typeof collection: '+(typeof collection))
		//console.log('first post in collection: '+collection[0].url)
		//return `<ul class="gallery padt padb">
		//	${ collection.reverse().map(post => // this seems to be fine
		//		`<li><a href=${post.url}>
		//		${ post.data.customHeader ? post.data.customHeader : (post.data.title ? post.data.title : eleventyConfig.javascriptFunctions.titleFromURL(post.url)) }<br>
		//		<p>${ eleventyConfig.javascriptFunctions.makeExcerpt(post.content, 20).replaceAll("</p><p>"," ").replace(/(<([^>]+)>)/gi, "")/*remove HTML*/ }</p>
		//	</a>`).join('\n') }
		//</ul>`;
		return `<ul class="gallery padt fullwidth">
			${ collection.map(post =>
				`<li><a href="${post.url}">
				${ post.data.customHeader ? post.data.customHeader : (post.data.title ? post.data.title : eleventyConfig.javascriptFunctions.titleFromURL(post.url)) }<br>
				<p>${ eleventyConfig.javascriptFunctions.makeExcerpt(post.content, 20, lang).replaceAll("</p><p>"," ").replace(/<script ?.*?>.*?<\/script>/gms, "").replace(/(<([^>]+)>)/gi, "")/*remove HTML*/ }</p>
			</a>`).join('\n') }
		</ul>`;
	});

	eleventyConfig.addFilter('stripJS', (inputString) => { // nunjuck's regexp support is incomplete
		return inputString.replace(/<script ?.*?>.*?<\/script>/gms, "")
	})

	// https://github.com/11ty/eleventy/issues/637
	eleventyConfig.addFilter('categoryFilter', function(collection, category, lang=0) { // using the collectionsApi instead would be nice, but I'm still not sure I can programmatically generate collections. NOTE: 'categories' is an array
		if (!category) return collection;
			const filtered = collection.filter(item => item.data?.categories?.includes(category))
			switch (lang) {
				case 'en':
					filtered = filtered.filter(item => item.data?.locale != 'jp')
					break;
				case 'jp':
					filtered = filtered.filter(item => item.data?.locale == 'jp')
					break;
				default:
					break;
			}
			return filtered;
	});

	eleventyConfig.addFilter('tagFilter', function(collection, tag, lang=0) { //
		if (!tag) return collection;
			var filtered = collection.filter(item => item.data.tags.includes(tag))
			switch (lang) {
				case 'en':
					filtered = filtered.filter(item => item.data?.locale != 'jp')
					break;
				case 'jp':
					filtered = filtered.filter(item => item.data?.locale == 'jp')
					break;
				default:
					break;
			}
			return filtered;
	});

	eleventyConfig.addFilter('prettySlug', input => {
		output = input.replaceAll(' ','-').replaceAll(':','')
		return output
	});

	//eleventyConfig.addFilter('makeHomeExcerpt', function(post, lang=undefined, isAtomFeed=false) {
	//	cdataStart = isAtomFeed ? '<![CDATA[' : ''
	//	cdataEnd = isAtomFeed ? ']]>' : ''
	//	var postBody = post.data.short == true ? post.content : eleventyConfig.javascriptFunctions.makeExcerpt(post.content, 80, lang)
	//	const imgPosition=postBody.indexOf('<img')
	//	const picturePosition=postBody.indexOf('<picture>')
	//	if (picturePosition != -1 && picturePosition < imgPosition) {
	//		postBody = postBody.replace(/(<picture>.*<\/picture>)/s, cdataStart+'<a href='+post.url+' tabindex=-1>$1</a>'+cdataEnd) // allow the user to navigate to the post by clicking the image (if there is one).
	//	} else {
	//		postBody = postBody.replace(/<img (.+?)>/, cdataStart+'<a href='+post.url+' tabindex=-1><img $1></a>'+cdataEnd) // allow the user to navigate to the post by clicking the image (if there is one). fix this for <picture>
	//	}
	//	postResourcesURL=post.url.split('/')
	//	postResourcesURL.pop()
	//	postResourcesURL=postResourcesURL.join('/')+'/'
	//	//postBody = postBody.replace(/(<img .*src="?'?)([^/].+? )(.*>)/, '$1'+postResourcesURL+'$2$3') // fix relative image links. TODO: apply this to all resources, like videos
	//	postBody = postBody.replaceAll(/(src="?'?)([^/].+?"?'? )/g, '$1'+postResourcesURL+'$2$3') // fix relative anchor links
	//	postBody = postBody.replaceAll(/(srcset="?'?)([^/].+?"?'? )/g, '$1'+postResourcesURL+'$2$3')
	//	if (isAtomFeed) {
	//
	//	}
	//	return postBody
	//})

	eleventyConfig.addFilter('makeHomeExcerpt', function(post, lang=undefined) {
		var postBody = post.data.short == true ? post.content : eleventyConfig.javascriptFunctions.makeExcerpt(post.content, 80, lang)
		const imgPosition=postBody.indexOf('<img')
		const picturePosition=postBody.indexOf('<picture>')
		if (picturePosition != -1 && picturePosition < imgPosition) {
			postBody = postBody.replace(/(<picture>.*<\/picture>)/s, '<a href='+post.url+' tabindex=-1>$1</a>') // allow the user to navigate to the post by clicking the image (if there is one).
		} else {
			postBody = postBody.replace(/<img (.+?)>/, '<a href='+post.url+' tabindex=-1><img $1></a>') // allow the user to navigate to the post by clicking the image (if there is one). fix this for <picture>
		}
		postResourcesURL=post.url.split('/')
		postResourcesURL.pop()
		postResourcesURL=postResourcesURL.join('/')+'/'
		//postBody = postBody.replace(/(<img .*src="?'?)([^/].+? )(.*>)/, '$1'+postResourcesURL+'$2$3') // fix relative image links. TODO: apply this to all resources, like videos
		postBody = postBody.replaceAll(/(src="?'?)([^/].+?"?'? )/g, '$1'+postResourcesURL+'$2$3') // fix relative anchor links
		postBody = postBody.replaceAll(/(srcset="?'?)([^/].+?"?'? )/g, '$1'+postResourcesURL+'$2$3')
		return postBody
	})

	eleventyConfig.addFilter("makeExcerpt", function(/*string*/ postContent, /*number*/ wordCount, /*string*/ lang='en') {
		//console.log('makeExcerpt running. postContent: ')
		//console.log(postContent)
		//console.log('wordCount: '+wordCount)
		if (postContent == undefined) {return 'undefined'}
		var myExcerpt // SWITCH STATEMENTS DO NOT LOCALIZE VARIABLES THE SAME WAY IF STATEMENTS DO.
		switch (lang) {
			case 'en':
				myExcerpt=postContent
				myExcerpt=myExcerpt.replaceAll(/(?<=>)/gm, '\uE000') // this could be implemented in the eng algorithm. Also, a similar method could be used to separate latin and japanese text, which would allow me to use tiny-segmenter
				myExcerpt=myExcerpt.replaceAll(/(?=<)/gm, '\uE000')
				//console.log('myExcerpt after setting borders between HTML elements: '+myExcerpt)
				//array
				myExcerpt=myExcerpt.split('\uE000')
				//console.log('starting loop...')
				let isInsideScriptTag=false
				for (let i=0, l=myExcerpt.length; i<l; i++) {
					if (myExcerpt[i].includes('<script')) {
						isInsideScriptTag=true
					} else if (myExcerpt[i]=='</script>') {
						isInsideScriptTag=false
					}
					if (!myExcerpt[i].includes('<') && myExcerpt[i]!='' && isInsideScriptTag==false) {
						myExcerpt[i]=myExcerpt[i].replaceAll(' ','\uE000')
					}
				}
				//console.log('loop finished')
				//string
				myExcerpt=myExcerpt.join('')
				//array
				myExcerpt=myExcerpt.split('\uE000')
				myExcerpt=myExcerpt.slice(0, wordCount)
				//string
				myExcerpt=myExcerpt.join(' ')
				// this function still leaves HTML tags unclosed. This causes issues. Fix this.
				myExcerpt=myExcerpt+'...'
				break;
			case 'jp':
				//var segmenter = new TinySegmenter();
				//var segs = segmenter.segment(postContent);
				//segs = segs.slice(0, wordCount)
				//myExcerpt = segs.join('|')
				//return excerpt;

				//string
				myExcerpt=postContent
				myExcerpt=myExcerpt.replaceAll(/(?<=>)/gm, '\uE000') // this could be implemented in the eng algorithm. Also, a similar method could be used to separate latin and japanese text, which would allow me to use tiny-segmenter
				myExcerpt=myExcerpt.replaceAll(/(?=<)/gm, '\uE000')
				//console.log('myExcerpt after setting borders between HTML elements: '+myExcerpt)
				//array
				myExcerpt=myExcerpt.split('\uE000')
				//console.log('starting loop...')
				for (let i=0, l=myExcerpt.length; i<l; i++) {
					if (!myExcerpt[i].includes('<') && myExcerpt[i]!='') {
						myExcerpt[i]=eleventyConfig.javascriptFunctions.jpStringToWordArray(myExcerpt[i]).join('\uE000') // insert unicode characters at the border of each jp word
					}
				}
				//console.log('loop finished')
				//string
				myExcerpt=myExcerpt.join('')
				//array
				myExcerpt=myExcerpt.split('\uE000')
				myExcerpt=myExcerpt.slice(0, wordCount)
				//string
				myExcerpt=myExcerpt.join('')
				myExcerpt=myExcerpt+'⋯' // …
		}
		return myExcerpt
	});

	eleventyConfig.addFilter('titleFromURL', function(inputURL) { // change this to a filter
		//console.log('inputURL is '+inputURL)
		const splitURL=inputURL.split('/')
		if (splitURL[splitURL.length-1]=='') {splitURL.pop()}
		return splitURL[splitURL.length-1].replaceAll('-', ' ')
	});

	// Shortcodes
	//eleventyConfig.addShortcode("makeExcerpt", function(/*string*/ postContent, /*number*/ wordCount, /*string*/ lang='en') { // change to filter
	//	//console.log('makeExcerpt running. postContent: ')
	//	//console.log(postContent)
	//	//console.log('wordCount: '+wordCount)
	//	if (postContent == undefined) {return 'undefined'}
	//	var myExcerpt // SWITCH STATEMENTS DO NOT LOCALIZE VARIABLES THE SAME WAY IF STATEMENTS DO.
	//	switch (lang) {
	//		case 'en':
	//			myExcerpt=postContent.split('');
	//			// ENGLISH WORD SEPARATING ALGO
	//			// Split string by spaces. this will be accomplished by replacing every space of visible text (not HTML elements) with TRUESPACE, then splitting by TRUESPACE:
	//			// Create a for loop that goes through the post content one character at a time.
	//			// when it detects a < character, it goes into HTMLmode, and all spaces are ignored.
	//			// when it detects a > character, it goes into visibleTextMode, and all spaces are replaced with TRUESPACE
	//			// NOTE: change of plans, instead of TRUESPACE, the delimiter will be a meaningless unicode codepoint, because it will take up only one character in the string.
  //
	//			var isVisibleText=false;
  //
	//			for (let charIndex=0, l=postContent.length; charIndex<l; charIndex++) {
	//				switch (postContent[charIndex]){
	//					case '<':
	//						isVisibleText=false;
	//						break;
	//					case '>':
	//						isVisibleText=true;
	//						break;
	//					case ' ':
	//						if (isVisibleText==true) {myExcerpt[charIndex] = '\uE000'}
	//						break;
	//					default:
	//						break;
	//				}
	//			}
  //
	//			myExcerpt=myExcerpt.join('')
	//			myExcerpt=myExcerpt.split('\uE000')
	//			myExcerpt=myExcerpt.slice(0, wordCount)
	//			myExcerpt=myExcerpt.join(' ')
	//			//the Japanese word separating algo will function like the jp 404 code and firefox, words will be separated by character type (hiragana, katakana, kanji, or alphanumeric)
	//			//return excerpt;
  //
	//			// this function still leaves HTML tags unclosed. This causes issues. Fix this.
	//			myExcerpt=myExcerpt+'...'
	//			break;
	//		case 'jp':
	//			//var segmenter = new TinySegmenter();
	//			//var segs = segmenter.segment(postContent);
	//			//segs = segs.slice(0, wordCount)
	//			//myExcerpt = segs.join('|')
	//			//return excerpt;
  //
	//			//string
	//			myExcerpt=postContent
	//			myExcerpt=myExcerpt.replaceAll(/(?<=>)/gm, '\uE000') // this could be implemented in the eng algorithm. Also, a similar method could be used to separate latin and japanese text, which would allow me to use tiny-segmenter
	//			myExcerpt=myExcerpt.replaceAll(/(?=<)/gm, '\uE000')
	//			//console.log('myExcerpt after setting borders between HTML elements: '+myExcerpt)
	//			//array
	//			myExcerpt=myExcerpt.split('\uE000')
	//			//console.log('starting loop...')
	//			for (let i=0, l=myExcerpt.length; i<l; i++) {
	//				if (!myExcerpt[i].includes('<') && myExcerpt[i]!='') {
	//					myExcerpt[i]=eleventyConfig.javascriptFunctions.jpStringToWordArray(myExcerpt[i]).join('\uE000') // insert unicode characters at the border of each jp word
	//				}
	//			}
	//			//console.log('loop finished')
	//			//string
	//			myExcerpt=myExcerpt.join('')
	//			//array
	//			myExcerpt=myExcerpt.split('\uE000')
	//			myExcerpt=myExcerpt.slice(0, wordCount)
	//			//string
	//			myExcerpt=myExcerpt.join('')
	//			myExcerpt=myExcerpt+'⋯' // …
	//	}
	//	return myExcerpt
	//});

	//eleventyConfig.addShortcode('titleFromURL', function(inputURL) { // change this to a filter
	//	//console.log('inputURL is '+inputURL)
	//	const splitURL=inputURL.split('/')
	//	if (splitURL[splitURL.length-1]=='') {splitURL.pop()}
	//	return splitURL[splitURL.length-1].replaceAll('-', ' ')
	//});

	eleventyConfig.addShortcode('post_url', function(){ // stop jekyll-imported pages from halting build
		return 'placeholder'
	})
	eleventyConfig.addShortcode('comment', function(){ // stop jekyll-imported pages from halting build
		return 'placeholder'
	})
	eleventyConfig.addShortcode('endcomment', function(){ // stop jekyll-imported pages from halting build
		return 'placeholder'
	})

	//eleventyConfig.addShortcode('setPermalink', function(filePathStem, url) {
	//	if (filePathStem.match(/(\d\d\d\d-\d\d-\d\d)-/)) {
	//		var filePathArray = filePathStem.split('/')
	//		filePathArray.splice(-2, 1)
	//		var resultString = filePathArray.join('/')
	//		resultString = resultString.replace(/(\d\d\d\d-\d\d-\d\d)-/, '$1/')
	//		return resultString+'/'
	//	} else {
	//		console.log("url: "+url)
	//		console.log("filePathStem: "+filePathStem)
	//		console.log("typeof url: "+(typeof url))
	//		return url
	//	}
	//})

	// Collections
	//eleventyConfig.addCollection("defaultNavbar", function(collectionApi) { // WIP
  //  // get unsorted items
  //  return collectionApi.getAll();
  //});

	// Need to find a way to programmatically generate these collections for every nested page group
	//eleventyConfig.addCollection("nestedNavbar", function(collectionApi) {
  //  // get unsorted items
  //  return collectionApi.getAll();
  //});

	//eleventyConfig.addCollection("postsSortedByUploadDate", function(collectionApi) {
  //  collectionApi.getAll();
  //});

	eleventyConfig.addCollection("postsInComputedDateOrder", function (collectionApi) {
    return [...collectionApi.getFilteredByTag("posts")]
      .sort((a, b) => new Date(b.data.computedDate) - new Date(a.data.computedDate));
  });
	eleventyConfig.addCollection("enPostsInComputedDateOrder", function (collectionApi) {
		//const newCollection=collectionApi.getFilteredByTag("posts").filter(item => item.data?.locale != 'jp')
    //return [...newCollection]
    //  .sort((a, b) => new Date(a.data.computedDate) - new Date(b.data.computedDate));
		const newCollection=collectionApi.getFilteredByTag("posts").filter(item => item.data?.locale != 'jp')
    return [...newCollection]
      .sort((a, b) => new Date(b.data.computedDate) - new Date(a.data.computedDate));
  });
	eleventyConfig.addCollection("jpPostsInComputedDateOrder", function (collectionApi) {
		const newCollection=collectionApi.getFilteredByTag("posts").filter(item => item.data?.locale == 'jp')
    return [...newCollection]
      .sort((a, b) => new Date(b.data.computedDate) - new Date(a.data.computedDate));
  });

	eleventyConfig.addCollection("enListOfTags", function (collectionApi) { // list of tags that are used in at least one en post. used in the front matter of tag-page.11ty.js to generate one page for each tag.
		//var tagList = eleventyConfig.javascriptFunctions.filterTagList(eleventyConfig.javascriptFunctions.getAllTags(collectionApi.getFilteredByTag("posts").filter(item => item.data?.locale != 'jp')))
		var tagList = eleventyConfig.javascriptFunctions.getAllTags(collectionApi.getFilteredByTag("posts").filter(item => item.data?.locale != 'jp'))
    return tagList // sorting would be too complicated
  });
	eleventyConfig.addCollection("jpListOfTags", function (collectionApi) { // list of tags that are used in at least one jp post.
		//var tagList = eleventyConfig.javascriptFunctions.filterTagList(eleventyConfig.javascriptFunctions.getAllTags(collectionApi.getFilteredByTag("posts").filter(item => item.data?.locale == 'jp')))
		var tagList = eleventyConfig.javascriptFunctions.getAllTags(collectionApi.getFilteredByTag("posts").filter(item => item.data?.locale == 'jp'))
    return tagList // sorting would be too complicated
  });

	eleventyConfig.addCollection("enListOfCategories", function (collectionApi) { // list of categories that are used in at least one en post. used in the front matter of category-page.11ty.js to generate one page for each tag.
		var categoryList = eleventyConfig.javascriptFunctions.getAllCategories(collectionApi.getFilteredByTag("posts").filter(item => item.data?.locale != 'jp'))
    return categoryList // sorting would be too complicated
  });
	eleventyConfig.addCollection("jpListOfCategories", function (collectionApi) { // list of categories that are used in at least one jp post.
		var categoryList = eleventyConfig.javascriptFunctions.getAllCategories(collectionApi.getFilteredByTag("posts").filter(item => item.data?.locale == 'jp'))
    return categoryList // sorting would be too complicated
  });

	// Customize Markdown library settings:
	eleventyConfig.amendLibrary("md", mdLib => {
		mdLib.use(markdownItAnchor, {
			permalink: markdownItAnchor.permalink.ariaHidden({
				placement: "after",
				class: "header-anchor",
				symbol: "#",
				ariaHidden: false,
			}),
			level: [1,2,3,4],
			slugify: eleventyConfig.getFilter("slugify")
		});
	});

	// Features to make your build faster (when you need them)

	// If your passthrough copy gets heavy and cumbersome, add this line
	// to emulate the file copy on the dev server. Learn more:
	// https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

	// eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

	return {
		// Control which files Eleventy will process
		// e.g.: *.md, *.njk, *.html, *.liquid
		//templateFormats: [
		//	"md",
		//	"njk",
		//	"html",
		//	"liquid",
		//],

		// Pre-process *.md files with: (default: `liquid`)
		markdownTemplateEngine: "njk",

		// Pre-process *.html files with: (default: `liquid`)
		htmlTemplateEngine: "njk",

		// These are all optional:
		dir: {
			input: "content",          // default: "."
			includes: "../_includes",  // default: "_includes"
			layouts: "../_layouts",
			data: "../_data",          // default: "_data"
			output: "_site"
		},

		// -----------------------------------------------------------------
		// Optional items:
		// -----------------------------------------------------------------

		// If your site deploys to a subdirectory, change `pathPrefix`.
		// Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

		// When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
		// it will transform any absolute URLs in your HTML to include this
		// folder name and does **not** affect where things go in the output folder.
		pathPrefix: "/",
	};
};
