// idea: global 'excerpts' function that either grabs all text of a post before the manuall placed <!--excerpt end--> comment (like Jekyll), or automatically finds a good point to truncate based on word count if there is no <!--excerpt end-->

module.exports = {

data() {
	return {
		layout: "default-en.11ty.js",
		description: "My personal blog where I post about whatever interests me.",
		altLang: "/",
		//script: "<script src=/ytvideoactivate.js></script>",
		pagination: {
			data: "collections.jpPostsInComputedDateOrder",
			size: 5, // final will be 5
			//reverse: true // collection is now reversed by default
		},
		permalink: data => `ホーム/${data.pagination.pageNumber>0 ? (data.pagination.pageNumber+1)+'ページ/' : ''}index.html`,
		locale: 'jp'
	}
}, // why does https://willmartian.com/posts/conditional-rendering-eleventy/ "real world example" not have commas?

render(data) {
return `
	${data.pagination.items.map(post => `<article>
			<h1><a href=${post.url.replace(/\.html$/, '')}>${ post.data.customHeader ? post.data.customHeader : (post.data.title ? post.data.title : this.titleFromURL(post.url)) }</a></h1>
			<time datetime=${this.htmlDateString(post.data.computedDate)} >${this.readableDate(post.data.computedDate)}</time>
			${ this.makeHomeExcerpt(post) }
	</article>`).join("\n")}
	<div class=pnav>
	${ data.pagination.href.previous ? '<a class="btnlink fli" href='+data.pagination.href.previous+'>新しい投稿</a>' : '' }
	${ data.pagination.href.next ? '<a class="btnlink fri" href='+data.pagination.href.next+'>古い投稿</a>' : '' }
	</div>
`;
}
}
