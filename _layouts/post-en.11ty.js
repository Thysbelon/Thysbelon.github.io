module.exports = {

data() {
	return {
		layout: "default-en.11ty.js",
		afterMain: `<!-- test of afterMain. Related posts will be placed here when they are ready -->`
	}
}, // why does https://willmartian.com/posts/conditional-rendering-eleventy/ "real world example" not have commas?

render(data) {
//console.log('data.computedDate:')
//console.log(data.computedDate)
return `
<h1 itemprop=headline>${ data.customHeader ? data.customHeader : ( data.title ? data.title : this.titleFromURL(data.page.url) ) }</h1>
<time itemprop=datePublished datetime=${this.htmlDateString(data.computedDate)}>${this.readableDate(data.computedDate)}</time>
${data.content.replace('<img', '<img itemprop=image')}
<div class=tags>Tags:<ul>${ data.tags ? data.tags.filter((tag) => tag!='posts').map(tag => `
	<li><a href=/Tags/${ this.prettySlug(tag) } rel=tag>${ tag }</a>
`).join('') : ''}</ul></div>
<div class=tags>Categories:<ul>${ data.categories ? data.categories.map(category => `
	<li><a href=/Categories/${ this.prettySlug(category) } rel=category>${ category }</a>
`).join('') : '' }</ul></div>
`
}
}
