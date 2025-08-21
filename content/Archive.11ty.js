module.exports = {

data() {
	return {
		layout: "default-en.11ty.js",
		altLang: "/アーカイブ/",
		noindex: true,
		//navbar: "test",
		//navbar: function(data) {return `test. url variable: ${data.page.url}`},
		navbar: '<li><a href=/Tags/>Tags</a></li><li><a href=/Categories/>Categories</a></li><li><a href=/アーカイブ/>Language/<span lang=ja>言語</span></a></li>'
	}
}, // why does https://willmartian.com/posts/conditional-rendering-eleventy/ "real world example" not have commas?

render(data) {
//return `<ul class="gallery padt padb">
//	${ data.collections.posts.map(post =>
//		`<li><a href=${post.url}>
//		${ post.customHeader ? post.customHeader : post.data.title }<br>
//		<p>${ this.makeExcerpt(post.content, 20).replaceAll("</p><p>"," ").replace(/(<([^>]+)>)/gi, "")/*remove HTML*/ }</p>
//	</a>`).join('\n') }
//</ul>`;
//sortedPosts=data.collections.posts.toSorted() // I want posts to be sorted by initial upload date, not when they were last updated.
return this.generateArchiveHTMLfromCollection(data.collections.enPostsInComputedDateOrder)
}
}
