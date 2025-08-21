function addIDtoHeaders(content){
	content=content.replaceAll(/<h([2-6])(?! ?id)(.*?)>(.+?)<\/h[2-6]>/g, '<h$1 id="$3"$2>$3</h$1>')
	content=content.replaceAll(/id="(.+?)"/g, 'id="\uE000$1\uE000"')
	var contentArray=content.split('\uE000')
	for (i=1, l=contentArray.length; i<l; i+=2) {
		contentArray[i]=contentArray[i].replaceAll(/<.+?>/g, '')
		contentArray[i]=contentArray[i].replaceAll(' ','-')
	}
	content=contentArray.join('')
	content=content.replaceAll(/id="(.+?)"/g, 'id=$1')
	return content
}
function generateToCmarkup(content /*data.content*/){
	/*
	list of pages that DON'T need a table of contents
	/ & /ホーム
	Archive
	Tags and Categories
	only one header (like subscribe)
	*/
	/*
	*/
	// add id attributes to all h# elements that don't already have them via regex.
	// go through the nodes in the list, add each h2 as a list element to the primary ol, add each h3 as a child list list element to the current li. etc.
	var headArray=content.match(/<h[2-6].*?>.+?<\/h[2-6]>/g);
	//console.log(headArray)
	headArray=headArray.map(item => {
		if (typeof item == 'string') {
			let name=item.match(/(?<=<)h\d/);
			if (name == null) {console.log('name is null '+item)} else {name=name[0]}
			let id=item.match(/(?<=id=).+?(?=>)/);
			if (id == null) {console.log('id is null '+item)} else {id=id[0]}
			//let text=item.match(/(?<=>).+?(?=<)/);
			//if (text == null) {console.log('text is null '+item)} else {text=text[0]}
			let text=item.replaceAll(/<.+?>/g, '');
			return {name: name, id: id, text: text}
		} else {return {name: 'name', id: typeof item, text: 'text'}}
	})
	var tocMarkup=`<nav class=toc>
	<details>
		<summary>
			Contents
		</summary>
		<span id=toc-top><a href=#>Top</a></span>
		<ol>`
	for (let i=0, l=headArray.length; i<l; i++) {
		switch (headArray[i]?.name) {
			case 'h2':
				tocMarkup+=`<li><a href=#${headArray[i].id}>${headArray[i].text}</a>`
				break;
			case 'h3':
				if (headArray[i-1].name=='h2') {
					tocMarkup+='<ol>'
				}
				tocMarkup+=`<li><a href=#${headArray[i].id}>${headArray[i].text}</a>`
				if (headArray[i+1].name=='h2') {
					tocMarkup+='</ol>'
				}
				break;
			case 'h4':
				break;
			case 'h5':
				break;
			case 'h6':
				break;
			default:
				console.log('error: '+headArray[i])
				break;
		}
	}
	tocMarkup+='</ol></details></nav>'
	return tocMarkup
}

function collectionToBarebonesNavArray(collection) { // will use the code listed in https://medium.com/@ziyoshams/deep-copying-javascript-arrays-4d5fc45a6e3e to make a copy of collections.all that has NO references to the original
	let navArray=[]
	collection.forEach(elem => {
		let tempObj={}
		tempObj.url = elem.url
		tempObj.title = elem.data.title
		tempObj.data={}
		tempObj.data.navOrder=elem.data.navOrder
		tempObj.data.nonav=elem.data.nonav
		tempObj.data.dropDownNav=elem.data.dropDownNav
		navArray.push(tempObj)
	})
	return navArray
}

function applyNavOrder(pageList) { // idea: make excluding the current page the last step in the nav generation process, so nav order is consistent
	// reorder pages if they have a front matter 'navOrder' key.
	// creates a copy of pageList with only the properties that are needed for the navbar
	//const origPageListRef=pageList.map(function(pageEntry){ return {url: pageEntry.url, navOrder: pageEntry.data.navOrder} })
	//const newPageArray=pageList.map(function(pageEntry){ return {url: pageEntry.url, title: pageEntry.title, navOrder: pageEntry.data.navOrder} })
	const origPageListRef=pageList
	const newPageArray=pageList.map(function(pageEntry){ return {url: pageEntry.url, title: pageEntry.title, navOrder: pageEntry.data.navOrder} })
	//console.log('origPageListRef:')
	//console.log(origPageListRef)
	for (let i=0, l=origPageListRef.length; i<l; i++) {
		if (origPageListRef[i].data.navOrder) { // 1 will be far left, -1 will be far right, 2 will be next to far left, zero should never be used
			//console.log('navOrder test returned true for '+origPageListRef[i].url)
			const targetIndex=newPageArray.findIndex((element) => element.url == origPageListRef[i].url) // get current index of page in newPageArray
			//console.log('current index of the page to be removed is '+targetIndex)
			//if (targetIndex == -1) {throw new Error('Search for the current index of the page to be moved has failed!')}
			const pageToReinsert=newPageArray.splice(targetIndex, 1) // remove page from array, shifting all other pages over as necessary
			//console.log('page has been removed from navbar array. removed page: ')
			//console.log(pageToReinsert[0].url)
			var indexToReinsertAt=0;
			if (origPageListRef[i].data.navOrder>0) {
				indexToReinsertAt=origPageListRef[i].data.navOrder-1
				newPageArray.splice(indexToReinsertAt, 0, pageToReinsert[0])
			} else if (origPageListRef[i].data.navOrder == -1) {
				newPageArray.push(pageToReinsert[0])
			} else { // all other negative numbers
				indexToReinsertAt=origPageListRef[i].data.navOrder+1
				newPageArray.splice(indexToReinsertAt, 0, pageToReinsert[0])
			}
		}
	}
	return newPageArray
}
function generateDefaultNavbarPageList(curPageURL, allPages) {
	//if (!curPageURL.includes('/blog/')) {console.log('default navbar')}
	//console.log('generating Default navbar... curPageURL: '+curPageURL)
	//const newAllPages = allPages.filter((page) => !(page.url.includes('/blog/') || page.url.includes('/tags/') || page.url=='/' || page.url==curPageURL || page.url.match(/\//g).length >= 3 || page.data.nonav))
	const newAllPages = allPages.filter((page) => !(page.url==false || page.url.includes('/Blog/') || page.url.includes('/Tags/') || page.url=='/' || page.url=='/ホーム/' || page.url.match(/\//g).length >= 3 || page.data.nonav || page.data.dropDownNav))
	//newAllPages=applyNavOrder(newAllPages)
	return newAllPages
}
function generateNestedNavbarPageList(curPageURL, allPages, inputPageURL=curPageURL) {
	//console.log('generating Nested navbar... (this will always happen at least once) curPageURL: '+curPageURL)
	//const nestedPages = allPages.filter((page) => (page.url.includes(inputPageURL) && page.url!=curPageURL && !page.data.nonav)) // all pages that are the child of the inputted curPageURL
	const nestedPages = allPages.filter((page) => (page.url!=false && page.url.includes(inputPageURL) && !page.url.includes('/Categories/') && !page.url.includes('/カテゴリ/') /*&& !page.data.nonav*/ && !page.data.dropDownNav)) // all pages that are the child of the inputted curPageURL
	//nestedPages=applyNavOrder(nestedPages)
	return nestedPages
}
function sortPagesAlphabetically(a, b) { // used as input for Array.prototype.sort()
	const nameA = a.url.toUpperCase(); // ignore upper and lowercase
	const nameB = b.url.toUpperCase(); // ignore upper and lowercase
	if (nameA < nameB) {
		return -1;
	}
	if (nameA > nameB) {
		return 1;
	}

	// names must be equal
	return 0;
}
function generateNav(curPageURL, allPages, globalFn, curPageAltLang=undefined, curPageLang=undefined) {
	/*
	Archive
	post, homepage, or non-nested page
	nested page (example: digital design page, logo design page)
	*/
	// Idea: code for generating the Archive navbar can be moved to the archive page; the navbar will be in the data varible. A conditional can be used here to insert Archive's navbar.
	//
	//var newAllPages=allPages.map(function(pageEntry){ return {url: pageEntry.url, title: pageEntry.title, data: {navOrder: pageEntry.data.navOrder, nonav: pageEntry.data.nonav} } }) // I thought this line would prevent the original collection array from being modified...
	var newAllPages=collectionToBarebonesNavArray(allPages.filter(item => (item.url != false && !item.url.includes('/Tags/'))))
	//if (!curPageURL.includes('/blog/')) {
	//	console.log('FIRST LOG '+curPageURL)
	//	console.log(newAllPages)
	//}
	let isDefaultNav=false // make the dropdown generation more clean later.
	const nested1Pages = generateNestedNavbarPageList(curPageURL, newAllPages) // all pages that are the child of the current page
	if (curPageURL.includes('/Blog/') || curPageURL.match(/\/page-\d+?\//) || curPageURL.match(/\/ホーム\/\d+?ページ\//) || curPageURL=='/' || curPageURL=='/ホーム/') { // if the current page is a blog post, tag page, or home
		newAllPages = generateDefaultNavbarPageList(curPageURL, newAllPages)
		isDefaultNav=true
	} else if (nested1Pages.length > 1) { // if the current page has nested children
		newAllPages = nested1Pages
		//if (!curPageURL.includes('/blog/')) {console.log('navbar with children')}
	} else if (curPageURL.match(/\//g).length >= 3) { // if the current page is a nested child of another page
		newPageURL=curPageURL.split('/') // /Digital-Design/Logo-Design/ => ['', 'Digital-Design', 'Logo-Design', '']
		newPageURL.splice(2, 1) // remove 'Logo-Design'
		newPageURL=newPageURL.join('/')
		newAllPages = generateNestedNavbarPageList(curPageURL, newAllPages, newPageURL)
		//if (!curPageURL.includes('/blog/')) {console.log('nested navbar')}
	} else {
		newAllPages = generateDefaultNavbarPageList(curPageURL, newAllPages)
		isDefaultNav=true
	}
	//if (!curPageURL.includes('/blog/')) {
	//	console.log('SECOND LOG '+curPageURL)
	//	console.log(newAllPages)
	//	console.log('done')
	//}
	// use a .sort on newAllPages here. By default, eleventy seems to sort pages by when they were last modified. This means the order of pages will keep changing every site update. Prevent this by sorting alphabetically.
	newAllPages.sort(sortPagesAlphabetically)
	newAllPages=applyNavOrder(newAllPages)
	newAllPages=newAllPages.filter(page => page.url!=curPageURL)
	var allDropdowns=new Set()
	allPages.filter(page => (page.url!=false && page.data.dropDownNav)).forEach(page => allDropdowns.add(page.data.dropDownNav))
	allDropdowns=Array.from(allDropdowns)
	return `
		${newAllPages.map(pageEntry =>
			`<li><a href=${pageEntry.url}>${pageEntry.title ? pageEntry.title : globalFn.titleFromURL(pageEntry.url)}</a></li>`
		).join("\n")}
		${isDefaultNav ? allDropdowns.map(dropdown =>
			`<li>
				<details>
				<summary>
				${dropdown}
				</summary>
				<ul>
				${allPages.filter(page => page.url != false && page.data?.dropDownNav==dropdown && page.url != curPageURL).sort(sortPagesAlphabetically).map(pageEntry =>
					`<li><a href=${pageEntry.url}>${pageEntry.title ? pageEntry.title : globalFn.titleFromURL(pageEntry.url)}</a></li>`
				).join('\n')}
				</ul>
				</details>
			</li>`
		).join('\n') : ''}
		${ curPageAltLang ? `<li><a href=${curPageAltLang}>${ curPageLang=='jp' ? '言語/<span lang=en>Language</span>' : 'Language/<span lang=ja>言語</span>'}</a></li>` : '' }
	`;
}

module.exports = {
render(data) {
if (data.page.url!=false) { // note: it seems like drafts (and pages with permalink: false) only cause trouble when a default layout is set. TODO: remove the redundant url!=false conditionals
var title = data.locale=='jp' ? 'シズビロン' : data.metadata.title
if (data.page.url!='/' && data.page.url!='/ホーム/' && !data.page.url.match(/\/page-\d+?\//) && !data.page.url.match(/\/ホーム\/\d+?ページ\//)) {
	title = data.locale=='jp' ? '【'+title+'】' : ' - '+title;
	if (data.title) {
		title=data.title+title
	} else {
		title=this.titleFromURL(data.page.url)+title
	}
}
const isHomePage=(data.page.url=='/' || data.page.url=='/ホーム/') // check
const hasToC=!(isHomePage || data.page.url.includes('/page-') || data.page.url.includes('ページ/') || data.page.url=='/Archive/' || data.page.url=='/アーカイブ/' || data.page.url.includes('Tags') || data.page.url.includes('Categories') || data.page.url.includes('タグ') || data.page.url.includes('カテゴリ')) && (data.content.match(/<h\d/g).length > 1) // to do: put in a list in a data file?
const filterByLang = data.locale=='jp' ? function(item){return item.data?.locale=='jp'} : function(item){return item.data?.locale!='jp'}
if (hasToC) {
	var pageContent=addIDtoHeaders(data.content)
	var toc=generateToCmarkup(pageContent)
} else {
	var pageContent=data.content
}
//const navArray = data.navbar ? (typeof data.navbar == 'string' ? data.navbar : data.navbar(data)) : generateNav(data.page.url, data.collections.all.filter(item => item.data?.locale != 'jp'), this, data.altLang) // function will determine if current page is nested or not (with another url-checking function), then will iterate through all pages with the appropriate criteria for the current page. All of these functions can be local to this file because I don't think they'll be used anywhere else.
const navArray = data.navbar!=undefined ? (typeof data.navbar == 'string' ? data.navbar : data.navbar(data)) : generateNav(data.page.url, data.collections.all.filter(filterByLang), this, data.altLang, data.locale)
return `
<!DOCTYPE html>
<html ${ data.locale==='none' ? '' : `lang=${data.locale=='jp' ? 'ja' : 'en'}`}>
<head>
<meta charset=UTF-8>
<title>${title}</title>
<meta property="og:title" content="${title}">
<meta name=viewport content=width=device-width,initial-scale=1.0>
<meta name="color-scheme" content="dark light">
<meta name=theme-color content=#ff4c60>
${ data.noDefaultStylesheet ? '' : '<link rel=stylesheet href=/css/BlogStylesheet.css>' }
${ data.extraStylesheet ? '<link rel=stylesheet href=/css/'+data.extraStylesheet+'>' : '' } `/* TODO: make it possible to define a variable to add multiple extra stylesheets. */+`
${ data.internalStyle ? (data.internalStyle.includes('<style>') ? data.internalStyle : '<style>'+data.internalStyle+'</style>' ) : '' }
<link rel=icon type=image/x-icon href=${ data.customIcon ? data.customIcon : '/img/thysbelonicon.svg' }>
${ (data.noindex || data.page.url?.match(/\/page-\d+?\//)) ? '<meta name=robots content=noindex>' : '' }
${ data.altLang ? `<link rel=alternate hreflang=${data.locale=='jp' ? 'en' : 'ja'} href="https://thysbelon.github.io${data.altLang}"> <link rel=alternate hreflang=${data.locale=='jp' ? 'ja' : 'en'} href="https://thysbelon.github.io${data.page.url.replace(/\.html$/,'')}">` : '' } `/* TODO: make https://thysbelon.github.io a variable */+`
${ data.page.isPost ? '<link rel=author href=/About/>' : '' } `/*The isPost variable will be set by the post layout. I may not need this variable if I search for /blog/ in url*/+`
${ data.page.description ? '<meta name="description" content="'+data.page.description+'"><meta property="og:description" content="'+data.page.description+'">' : '' }
${ data.script ? data.script : '' }
${ data.headContent ? data.headContent : '' } `/*This post is for any stuff specific to one or two pages I want to include in the <head>. Example, an Atom link, which will only be on two pages.*/+`
<!-- to do: og:image property here. make a universal eleventyConfig function to fetch the first image of a post. -->
</head>
<body>
<header>
${ isHomePage ? '' : `<a href="${data.locale=='jp' ? '/ホーム/' : '/'}">` }
${ data.customLogo ? data.customLogo : `<img id=blogtitle src=/img/ThysbelonTitle.svg alt=Thysbelon. width=1002 height=272><img src=/img/thysbelonicon.svg alt="${data.locale=='jp' ? 'スズメガのロゴ。' : 'Logo of a Hummingbird moth.'}" width=280 height=280>` }
${ isHomePage ? '' : '</a>' }
</header>
<nav><ul ${ (data.page.url=='/Archive/' || data.page.url=='/アーカイブ/') ? 'style=flex-wrap:wrap' : '' }> `/*move to internal style?*/+`
${ navArray }
</ul></nav>
<main${data.page.isPost ? ' itemscope itemtype=https://schema.org/BlogPosting' : ''}> `/*this is a big change. check for visual errors*/+`
${hasToC ? toc : ''}
${pageContent}
</main>
${ data.afterMain ? data.afterMain : '' }
${ data.customFooter ? data.customFooter : '<footer>Header font from <a href=http://velvetyne.fr/fonts/compagnon/ target=_blank>Velvetyne</a></footer>' }
</body></html>
`;
}
}
}
