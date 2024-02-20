// idea: global 'excerpts' function that either grabs all text of a post before the manuall placed <!--excerpt end--> comment (like Jekyll), or automatically finds a good point to truncate based on word count if there is no <!--excerpt end-->

function makeHomeExcerpt(post, globalFn) {
	var postBody = post.data.short == true ? post.content : globalFn.makeExcerpt(post.content, 43, 'jp')
	const imgPosition=postBody.indexOf('<img')
	const picturePosition=postBody.indexOf('<picture>')
	if (picturePosition != -1 && picturePosition < imgPosition) {
		postBody = postBody.replace(/(<picture>.*<\/picture>)/s, '<a href='+post.url+' tabindex=-1>$1</a>') // allow the user to navigate to the post by clicking the image (if there is one).
	} else {
		postBody = postBody.replace(/<img (.+?)>/, '<a href='+post.url+' tabindex=-1><img $1></a>') // allow the user to navigate to the post by clicking the image (if there is one). fix this for <picture>
	}
	postResourcesURL=post.url.split('/')
	postResourcesURL.pop()
	postResourcesURL=postResourcesURL.join('/')+'/'
	//postBody = postBody.replace(/(<img .*src="?'?)([^/].+? )(.*>)/, '$1'+postResourcesURL+'$2$3') // fix relative image links. TODO: apply this to all resources, like videos
	postBody = postBody.replaceAll(/(src="?'?)([^/].+?"?'? )/g, '$1'+postResourcesURL+'$2$3')
	postBody = postBody.replaceAll(/(srcset="?'?)([^/].+?"?'? )/g, '$1'+postResourcesURL+'$2$3')
	return postBody
}

module.exports = {

data() {
	return {
		layout: "default-en.11ty.js",
		description: "My personal blog where I post about whatever interests me.",
		altLang: "/",
		script: "<script src=/ytvideoactivate.js></script>",
		pagination: {
			data: "collections.jpPostsInComputedDateOrder",
			size: 5, // final will be 5
			//reverse: true // collection is now reversed by default
		},
		permalink: data => `ホーム/${data.pagination.pageNumber>0 ? (data.pagination.pageNumber+1)+'ページ'+'/' : ''}index.html`,
		locale: 'jp'
	}
}, // why does https://willmartian.com/posts/conditional-rendering-eleventy/ "real world example" not have commas?

render(data) {
return `
	${data.pagination.items.map(post => `<article>
			<h1><a href=${post.url}>${ post.data.customHeader ? post.data.customHeader : (post.data.title ? post.data.title : this.titleFromURL(post.url)) }</a></h1>
			<time datetime=${this.htmlDateString(post.data.computedDate)} >${this.readableDate(post.data.computedDate)}</time>
			${ makeHomeExcerpt(post, this) }
	</article>`).join("\n")}
	<div class=pnav>
	${ data.pagination.href.previous ? '<a class="btnlink fli" href='+data.pagination.href.previous+'>新しい投稿</a>' : '' }
	${ data.pagination.href.next ? '<a class="btnlink fri" href='+data.pagination.href.next+'>古い投稿</a>' : '' }
	</div>
`;
}
}
