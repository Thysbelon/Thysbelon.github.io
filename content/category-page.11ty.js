module.exports = {

data() {
	return {
		navbar: '<li><a href=/Archive/>Archive</a></li><li><a href=/Tags/>Tags</a></li><li><a href=/Categories/>Categories</a></li>',
		pagination: {
			data: "collections.enListOfCategories", // to do: when jp posts are added, make en posts and jp posts separate collections; or maybe data can be generated programmatically? See the 'before' function
			size: 1,
			alias: 'category',
			addAllPagesToCollections: true,
		},
		eleventyComputed: {
			title: data => `${ data.category } Category`
		},
		permalink: function(data){return `/Categories/${ this.prettySlug(data.category) }/`}
	}
}, // why does https://willmartian.com/posts/conditional-rendering-eleventy/ "real world example" not have commas?

render(data) {
//var uniquePageDecoration=""
return `
<h1>“${ data.category }” Category</h1>
${ this.generateArchiveHTMLfromCollection(this.categoryFilter(data.collections.enPostsInComputedDateOrder, data.category)) }
`;
}
}