const { DateTime } = require("luxon");
//const markdownItAnchor = require("markdown-it-anchor");

const pluginRss = require("@11ty/eleventy-plugin-rss"); // currently using a filter from this.
//const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
//const pluginBundle = require("@11ty/eleventy-plugin-bundle");
//const pluginNavigation = require("@11ty/eleventy-navigation");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy"); // required for rendering templates

const pluginDrafts = require("./eleventy.config.drafts.js");
//const pluginImages = require("./eleventy.config.images.js");

const { imageSizeFromFile } = require('image-size/fromFile');
const jsdom = require("jsdom");

module.exports = function(eleventyConfig) {
	// Copy the contents of the `public` folder to the output folder
	// For example, `./public/css/` ends up in `_site/css/`
	eleventyConfig.addPassthroughCopy({
		"./public/": "/"//,
	});
	eleventyConfig.addPassthroughCopy("./content/Blog", { filter: ["**/!(*.11ty|*.11tydata).!(njk|md|html|liquid|hbs|mustache|ejs|pug)"], rename: function(src){ // https://github.com/11ty/eleventy/issues/3010#issuecomment-1661392357
		//console.log('passthrough input: '+src)
		var fileString = src
		fileString = fileString.replace(/(\d\d\d\d-\d\d?-\d\d?).+?\//, '$1/')
		//console.log('passthrough output'+fileString)
		return fileString
	} }); // blog post files will be copied unique folders for each post. directory structure of different languages will be /blog/engpost/ and /ブログ/日本語ポスト/. Maybe arbitrary post files can be in /blog/2023-08-1/image.png, where the date is the post date? This would require accessing post front matter in the copyOptions.rename function, which would require using collections? idk
	// https://stackoverflow.com/questions/39296057/glob-for-all-folders-within-a-folder-except-one-named-folder
	eleventyConfig.addPassthroughCopy("./content/{!(*.11ty|*.11tydata).!(njk|md|html|liquid|hbs|mustache|ejs|pug),!(Blog|sitemap)/**/!(*.11ty|*.11tydata).!(njk|md|html|liquid|hbs|mustache|ejs|pug)}"); // other pages will have their files copied as is

	// Run Eleventy when these files change:
	// https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

	// Watch content images for the image pipeline.
	//eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg}");

	// App plugins
	eleventyConfig.addPlugin(pluginDrafts);
	//eleventyConfig.addPlugin(pluginImages);

	// Official plugins
	eleventyConfig.addPlugin(pluginRss);
	//eleventyConfig.addPlugin(pluginSyntaxHighlight, {
	//	preAttributes: { tabindex: 0 }
	//});
	//eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	//eleventyConfig.addPlugin(pluginBundle);

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
	
	eleventyConfig.addJavaScriptFunction('imageSrcToDimensions', async function(imgSrc){
		var dimensions
		try {
			dimensions = await imageSizeFromFile(imgSrc);
			//console.log(dimensions);
		} catch (error) {
			//if (error.path?.includes("yarn")) {console.error(error);}
			//console.error(error);
			dimensions = {width: 0, height: 0}
		}
		return dimensions;
	})
	eleventyConfig.addJavaScriptFunction('HTMLstringToDOM', function(HTMLstring){
		const dom = new jsdom.JSDOM(HTMLstring);
		return dom;
	})
	eleventyConfig.addJavaScriptFunction('addWidthHeightToImg', async function(imgElem, url){
		var imgURL = imgElem.src;
		if (imgElem.src != "") {
			var dimensions = await eleventyConfig.javascriptFunctions.imageSrcToDimensions(imgURL); 
			if (dimensions.width == 0) {
				imgURL = "_site" + imgElem.src; 
				dimensions = await eleventyConfig.javascriptFunctions.imageSrcToDimensions(imgURL); 
			}
			if (dimensions.width == 0) {
				let tempURL = url.slice(0, url.lastIndexOf("/") + 1)
				imgURL = "_site" + tempURL + imgElem.src; // NOTE: this is very unreliable.
				dimensions = await eleventyConfig.javascriptFunctions.imageSrcToDimensions(imgURL); 
				//console.log("? " + imgURL);
			}
			if (dimensions.width == 0) { 
				imgURL = "public" + imgElem.src; 
				dimensions = await eleventyConfig.javascriptFunctions.imageSrcToDimensions(imgURL); 
			}
			if (dimensions.width == 0) { 
				imgURL = "content" + url + imgElem.src; 
				dimensions = await eleventyConfig.javascriptFunctions.imageSrcToDimensions(imgURL); 
			}
			if (dimensions.width == 0) { 
				imgURL = "content" + imgElem.src; 
				dimensions = await eleventyConfig.javascriptFunctions.imageSrcToDimensions(imgURL); 
			}
			if (dimensions.width == 0) { console.error("! " + imgElem.src) }
			
			const naturalWidth = dimensions.width;
			if (naturalWidth != 0) {
				imgElem.width = naturalWidth;
				imgElem.style.setProperty("--natural-width", naturalWidth);
			}
			const naturalHeight = dimensions.height;
			if (naturalHeight != 0) {
				imgElem.height = naturalHeight;
				imgElem.style.setProperty("--natural-height", naturalHeight);
			}
			//imgElem.style.setProperty("--addWidthHeightToImg-test", 0);
		}
		
		return imgElem;
	})
	
	// Transforms. Applied to html after the template has been rendered
	eleventyConfig.addTransform("addWidthHeightToAllImg", async function(content) {
		const doc = eleventyConfig.javascriptFunctions.HTMLstringToDOM(content).window.document;
		const imgElemArray = doc.querySelectorAll("img");
		for (img of imgElemArray) {
			img = await eleventyConfig.javascriptFunctions.addWidthHeightToImg(img, this.page.url);
		}
		return doc.documentElement.outerHTML;

		return newContent;
	});
	/*
	eleventyConfig.addTransform("removeHTMLcomments", function(content) {
		//console.log( this.inputPath );
		//console.log( this.outputPath );

		// Eleventy 2.0+ has full access to Eleventy’s `page` variable
		//console.log( this.page.inputPath );
		//console.log( this.page.outputPath );
		
		var newContent=content.replaceAll(/<!--.*?-->/gs, '');

		return newContent;
	});
	eleventyConfig.addTransform("addIDtoHeaders", function(content) {
		var data = this; // variable to facilitate copy pasting code that I originally wrote elsewhere.
		const isHomePage=(data.page.url=='/' || data.page.url=='/ホーム/') // check
		const hasToC=!(isHomePage || data.page.url.includes('/page-') || data.page.url.includes('ページ/') || data.page.url=='/Archive/' || data.page.url=='/アーカイブ/' || data.page.url.includes('Tags') || data.page.url.includes('Categories') || data.page.url.includes('タグ') || data.page.url.includes('カテゴリ')) && (content.match(/<h\d/g).length > 1) // Exclude file from adding header IDs and adding a Table of Contents if: it is the home, archive, a tag, or a category page; or if it has only one heading (in other words: if it only has an h1). TODO: put in a list in a data file?
		if (hasToC) {
			var newContent=content.replaceAll(/<h([2-6])(?! ?id)(.*?)>(.+?)<\/h[2-6]>/g, '<h$1 id="\uE000$3\uE000"$2>$3</h$1>') // Add IDs to all heading elements, except for heading elements that already have an ID. \uE000 is a unique identifier for splitting and further processing
			// The rest of the function will clean up the newly generated ID.
			//newContent=newContent.replaceAll(/id="(.+?)"/g, 'id="\uE000$1\uE000"') // create unique identifier for splitting. BUG
			var contentArray=newContent.split('\uE000') // split content around ID values.
			for (i=1, l=contentArray.length; i<l; i+=2) { // only iterate through and change the ID values.
				contentArray[i]=contentArray[i].replaceAll(/<.+?>/g, '') // remove HTML tags.
				contentArray[i]=contentArray[i].replaceAll(' ','-') // change spaces to hyphens.
			}
			//newContent=contentArray.join('')
			//newContent=newContent.replaceAll(/id="(.+?)"/g, 'id=$1') // remove the quotes around all IDs to save a small amount of space. TODO: if there was a page that already had an ID like <h2 id="my example">my example</h2>, wouldn't this statement *break* those IDs?
			newContent=contentArray.join('\uE000')
			newContent=newContent.replaceAll(/id="\uE000(.+?)\uE000"/g, 'id=$1') // remove the quotes around only the newly generated IDs to save a small amount of space. The newly generated IDs shouldn't need quotes because they are generated to not have spaces.
			newContent=newContent.replaceAll('\uE000', ''); // make sure that unique identifier is removed.
			return newContent;
		} else {
			return content; // no change.
		}
		
	});
	*/

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
		return `<ul class="post-gallery fullwidth">
			${ collection.map(post =>
				`<li><a href="${post.url.replace(/\.html$/, '')}">
				${ post.data.customHeader ? post.data.customHeader : (post.data.title ? post.data.title : eleventyConfig.javascriptFunctions.titleFromURL(post.url)) }<br>
				<time datetime=${eleventyConfig.javascriptFunctions.htmlDateString(post.data.computedDate)} >${eleventyConfig.javascriptFunctions.readableDate(post.data.computedDate)}</time>
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

	eleventyConfig.addFilter('makeHomeExcerpt', function(post, lang=undefined) {
		var postBody = post.data.short == true ? post.content : eleventyConfig.javascriptFunctions.makeExcerpt(post.content, 80, lang)
		const imgPosition=postBody.indexOf('<img')
		const picturePosition=postBody.indexOf('<picture>')
		if (picturePosition != -1 && picturePosition < imgPosition) {
			postBody = postBody.replace(/(<picture>.*<\/picture>)/s, '<a href='+post.url.replace(/\.html$/, '')+' tabindex=-1>$1</a>') // allow the user to navigate to the post by clicking the image (if there is one).
		} else {
			postBody = postBody.replace(/<img (.+?)>/, '<a href='+post.url.replace(/\.html$/, '')+' tabindex=-1><img $1></a>') // allow the user to navigate to the post by clicking the image (if there is one). tabindex attribute prevents keyboard users from navigating to it; because it is a redundant link for keyboard users.
		}
		postResourcesURL=post.url.split('/')
		postResourcesURL.pop()
		postResourcesURL=postResourcesURL.join('/')+'/'
		//postBody = postBody.replace(/(<img .*src="?'?)([^/].+? )(.*>)/, '$1'+postResourcesURL+'$2$3') // fix relative image links. TODO: apply this to all resources, like videos
		postBody = postBody.replaceAll(/(src="?'?)(?!https:\/)([^\/].+?"?'?)([ >])/g, '$1'+postResourcesURL+'$2$3') // fix relative anchor links
		postBody = postBody.replaceAll(/(srcset="?'?)(?!https:\/)([^\/].+?"?'?)([ >])/g, '$1'+postResourcesURL+'$2$3')
		postBody = postBody.replaceAll(/(href="?'?)(?!https:\/)([^\/].+?"?'?)([ >])/g, '$1'+postResourcesURL+'$2$3') // new
		postBody = postBody.replaceAll('{rel}', postResourcesURL) // '{rel}' is a meaningless string used to mark relative urls in javascript (which cannot be automatically detected)
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

	eleventyConfig.addFilter('titleFromURL', function(inputURL) {
		//console.log('inputURL is '+inputURL)
		if (typeof inputURL != 'string') {return 'titleFromURL was not given a string'}
		const splitURL=inputURL.split('/')
		if (splitURL[splitURL.length-1]=='') {splitURL.pop()}
		return splitURL[splitURL.length-1].replaceAll('-', ' ').replace(/\.html$/, '')
	});
	
	eleventyConfig.addFilter('transformPostRelativeURL', function(inputURL) {
		
	});

	eleventyConfig.addShortcode('post_url', function(){ // stop jekyll-imported pages from halting build
		return 'placeholder'
	})
	eleventyConfig.addShortcode('comment', function(){ // stop jekyll-imported pages from halting build
		return 'placeholder'
	})
	eleventyConfig.addShortcode('endcomment', function(){ // stop jekyll-imported pages from halting build
		return 'placeholder'
	})

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
		var tagList = eleventyConfig.javascriptFunctions.getAllTags(collectionApi.getFilteredByTag("posts").filter(item => item.data?.locale != 'jp'))
    return tagList // sorting would be too complicated
  });
	eleventyConfig.addCollection("jpListOfTags", function (collectionApi) { // list of tags that are used in at least one jp post.
		var tagList = eleventyConfig.javascriptFunctions.getAllTags(collectionApi.getFilteredByTag("posts").filter(item => item.data?.locale == 'jp'))
    return tagList // sorting would be too complicated
  });

	eleventyConfig.addCollection("enListOfCategories", function (collectionApi) { // list of categories that are used in at least one en post. used in the front matter of category-page.11ty.js to generate one page for each category.
		var categoryList = eleventyConfig.javascriptFunctions.getAllCategories(collectionApi.getFilteredByTag("posts").filter(item => item.data?.locale != 'jp'))
    return categoryList // sorting would be too complicated
  });
	eleventyConfig.addCollection("jpListOfCategories", function (collectionApi) { // list of categories that are used in at least one jp post.
		var categoryList = eleventyConfig.javascriptFunctions.getAllCategories(collectionApi.getFilteredByTag("posts").filter(item => item.data?.locale == 'jp'))
    return categoryList // sorting would be too complicated
  });
	
	eleventyConfig.addGlobalData("customThemes", 
		{
			"Vib-Ribbon": {
				customLogo: "<img id=blogtitle src=/css/vib-ribbon-theme/thystitle2-min.gif alt=Thysbelon. width=484 height=154><img src=/css/vib-ribbon-theme/thyslogo5-min.gif alt=\"Logo of a Hummingbird moth drawn with angular lines.\" width=281 height=281>",
				customIcon: "/css/vib-ribbon-theme/thyslogo5-min.gif",
				extraStylesheet: "vib-ribbon-theme/vib-ribbon.css",
				customFooter: " "
			},
			"Kirby's Epic Yarn": {
				extraStylesheet: "yarn-kirby-theme/yarn-kirby.css"
			},
		}
	);

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
