module.exports = {

data() {
	return {
		layout: "default-en.html",
		altLang: "タグ",
		noindex: true,
		nonav: true,
		navbar: '<li><a href=/Archive/>Archive</a></li><li><a href=/Categories/>Categories</a></li><li><a href=/タグ/>Language/<span lang=ja>言語</span></a></li>'
	}
}, // why does https://willmartian.com/posts/conditional-rendering-eleventy/ "real world example" not have commas?

render(data) {
//var tagArray = this.filterTagList(this.getAllTags(data.collections.all))
//tagArray.sort((a, b) => data.collections[b].length - data.collections[a].length)
//return `<ul>
//	${ tagArray.map(tag =>`<li><a href=${this.prettySlug(tag)}>${tag} | ${data.collections[tag].length}</a></li>`).join('\n') } `/*test slugify behavior with special characters. I want to keep special characters. Other: update css from section>ul to main>ul. Sort tags by the number of pages in that tag*/+`
//</ul>`;
var tagArray = this.filterTagList(data.collections.enListOfTags)
tagArray.sort((a, b) => data.collections[b].filter(item => item.data?.locale != 'jp').length - data.collections[a].filter(item => item.data?.locale != 'jp').length)
return `<ul>
	${ tagArray.map(tag =>`<li><a href="${this.prettySlug(tag)}/">${tag} | ${data.collections[tag].filter(item => item.data?.locale != 'jp').length}</a></li>`).join('\n') } `/*test slugify behavior with special characters. I want to keep special characters. Other: update css from section>ul to main>ul. Sort tags by the number of pages in that tag*/+`
</ul>`;
}
}
