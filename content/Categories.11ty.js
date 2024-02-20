module.exports = {

data() {
	return {
		layout: "default-en.11ty.js",
		altLang: "カテゴリ",
		noindex: true,
		nonav: true,
		navbar: '<li><a href=/Archive/>Archive</a></li><li><a href=/Tags/>Tags</a></li><li><a href=/カテゴリ/>Language/<span lang=ja>言語</span></a></li>'
	}
},

render(data) {
var categoryArray = this.filterTagList(data.collections.enListOfCategories)
//const globalFn = this;
categoryArray.sort((a, b) => this.categoryFilter(data.collections.enPostsInComputedDateOrder, b).length - this.categoryFilter(data.collections.enPostsInComputedDateOrder, a).length)
return `<ul>
	${ categoryArray.map(category =>`<li><a href="${this.prettySlug(category)}/">${category} | ${ this.categoryFilter(data.collections.enPostsInComputedDateOrder, category).length}</a></li>`).join('\n') } `/*test slugify behavior with special characters. I want to keep special characters. Other: update css from section>ul to main>ul. Sort tags by the number of pages in that tag*/+`
</ul>`;
}
}