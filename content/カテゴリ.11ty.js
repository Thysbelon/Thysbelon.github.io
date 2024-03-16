module.exports = {

data() {
	return {
		layout: "default-en.11ty.js",
		altLang: "Categories",
		noindex: true,
		nonav: true,
		navbar: '<li><a href=/アーカイブ/>アーカイブ</a></li><li><a href=/タグ/>タグ</a></li><li><a href=/Categories/>言語/<span lang=en>Language</span></a></li>',
		locale: 'jp'
	}
},

render(data) {
var categoryArray = this.filterTagList(data.collections.jpListOfCategories)
//const globalFn = this;
categoryArray.sort((a, b) => this.categoryFilter(data.collections.jpPostsInComputedDateOrder, b).length - this.categoryFilter(data.collections.jpPostsInComputedDateOrder, a).length)
return `<ul>
	${ categoryArray.map(category =>`<li><a href="${this.prettySlug(category)}/">${category} | ${ this.categoryFilter(data.collections.jpPostsInComputedDateOrder, category).length}</a></li>`).join('\n') } `/*test slugify behavior with special characters. I want to keep special characters. Other: update css from section>ul to main>ul. Sort tags by the number of pages in that tag*/+`
</ul>`;
}
}