module.exports = {

data() {
	return {
		layout: "default-en.11ty.js",
		altLang: "Tags",
		noindex: true,
		nonav: true,
		navbar: '<li><a href=/アーカイブ/>アーカイブ</a></li><li><a href=/カテゴリ/>カテゴリ</a></li><li><a href=/Tags/>言語/<span lang=en>Language</span></a></li>',
		locale: 'jp'
	}
}, // why does https://willmartian.com/posts/conditional-rendering-eleventy/ "real world example" not have commas?

render(data) {
// TODO: turn Tags.11ty.js and this into empty templates that use the same layout with different front matter.
//var tagArray = this.filterTagList(this.getAllTags(data.collections.all))
//tagArray.sort((a, b) => data.collections[b].length - data.collections[a].length)
//return `<ul>
//	${ tagArray.map(tag =>`<li><a href=${this.prettySlug(tag)}>${tag} | ${data.collections[tag].length}</a></li>`).join('\n') } `/*test slugify behavior with special characters. I want to keep special characters. Other: update css from section>ul to main>ul. Sort tags by the number of pages in that tag*/+`
//</ul>`;
var tagArray = this.filterTagList(data.collections.jpListOfTags)
tagArray.sort((a, b) => data.collections[b].filter(item => item.data?.locale == 'jp').length - data.collections[a].filter(item => item.data?.locale == 'jp').length)
return `<ul>
	${ tagArray.map(tag =>`<li><a href=${this.prettySlug(tag)}>${tag} | ${data.collections[tag].filter(item => item.data?.locale == 'jp').length}</a></li>`).join('\n') } `/*test slugify behavior with special characters. I want to keep special characters. Other: update css from section>ul to main>ul. Sort tags by the number of pages in that tag*/+`
</ul>`;
}
}
