module.exports = {

data() {
	return {
		layout: "default.11ty.js",
		//afterMain: `<!-- test of afterMain. Related posts will be placed here when they are ready -->`
	}
}, // why does https://willmartian.com/posts/conditional-rendering-eleventy/ "real world example" not have commas?

render(data) {
//console.log('data.computedDate:')
//console.log(data.computedDate)
	
const translationKey = {
	Tags: {"en": "Tags", "jp": "タグ"},
	Categories: {"en": "Categories", "jp": "カテゴリ"},
}
	
return `
<h1 itemprop=headline>${ data.customHeader ? data.customHeader : ( data.title ? data.title : this.titleFromURL(data.page.url) ) }</h1>
<time itemprop=datePublished datetime=${this.htmlDateString(data.computedDate)}>${this.readableDate(data.computedDate)}</time>
${data.content.replace('<img', '<img itemprop=image').replaceAll('{rel}', '')}
<div class=tags>${translationKey.Tags[data.locale]}:<ul>${ data.tags ? data.tags.filter((tag) => tag!='posts').map(tag => `
	<li><a href=/${translationKey.Tags[data.locale]}/${ this.prettySlug(tag) } rel=tag>${ tag }</a>
`).join('') : ''}</ul></div>
<div class=tags>${translationKey.Categories[data.locale]}:<ul>${ data.categories ? data.categories.map(category => `
	<li><a href=/${translationKey.Categories[data.locale]}/${ this.prettySlug(category) } rel=category>${ category }</a>
`).join('') : '' }</ul></div>
`
}
}
