module.exports = {

data() {
	return {
		navbar: '<li><a href=/アーカイブ/>アーカイブ</a></li><li><a href=/タグ/>タグ</a></li><li><a href=/カテゴリ/>カテゴリ</a></li>',
		pagination: {
			data: "collections.jpListOfCategories", // to do: when jp posts are added, make en posts and jp posts separate collections; or maybe data can be generated programmatically? See the 'before' function
			size: 1,
			alias: 'category',
			addAllPagesToCollections: true,
		},
		eleventyComputed: {
			title: data => `${ data.tag }のカテゴリ`
		},
		permalink: function(data){return `/カテゴリ/${ this.prettySlug(data.category) }/`},
		locale: 'jp'
	}
}, // why does https://willmartian.com/posts/conditional-rendering-eleventy/ "real world example" not have commas?

render(data) {
//var uniquePageDecoration=""
return `
<h1>「${ data.category }」のカテゴリ</h1>
${ this.generateArchiveHTMLfromCollection(this.categoryFilter(data.collections.jpPostsInComputedDateOrder, data.category), 'jp') }
`;
}
}