module.exports = {

data() {
	return {
		layout: "default-en.11ty.js",
		altLang: "/Archive/",
		noindex: true,
		//navbar: "test",
		//navbar: function(data) {return `test. url variable: ${data.page.url}`},
		navbar: '<li><a href=/タグ/>タグ</a></li><li><a href=/カテゴリ/>カテゴリ</a></li><li><a href=/Archive/>言語/<span lang=en>Language</span></a></li>',
		locale: 'jp'
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
// TODO: use postsInComputedDateOrder collection
return this.generateArchiveHTMLfromCollection(data.collections.jpPostsInComputedDateOrder, 'jp')
}
}
