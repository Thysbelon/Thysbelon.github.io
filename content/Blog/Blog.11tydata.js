function setPermalink(inputPath, filePathStem) {
	if (inputPath.match(/(\d\d\d\d-\d\d?-\d\d?)-/)) {
		//console.log('Preparing to modify inputPath: '+inputPath)
		var filePathArray = inputPath.split('/')
		filePathArray.splice(-2, 1)
		var resultString = filePathArray.join('/')
		resultString = resultString.replace(/^\.\/content/, '')
		resultString = resultString.replace(/(\d\d\d\d-\d\d?-\d\d?)-/, '$1/')
		resultString = resultString.replace(/\.(?:html|md|liquid|11ty\.js|njk)$/, '')
		//console.log('returning modified resultString: '+resultString)
		return resultString
	} else {
		//console.log('returning unmodified filePathStem: '+filePathStem)
		return filePathStem
	}
}

function grabDateStringFromFile(inputPath) {
	//console.log('Preparing to grab date string from inputPath: '+inputPath)
	var filePathArray = inputPath.split('/')
	filePathArray.splice(-2, 1)
	var dateString = filePathArray.join('/')
	dateString = dateString.replace('./content/blog/', '')
	dateString = dateString.replace(/(\d\d\d\d-\d\d?-\d\d?).*/, '$1')
	dateString = dateString.replace(/-(\d)(?=-)/, '-0$1') // add leading zeroes
	dateString = dateString.replace(/-(\d)$/, '-0$1')
	//console.log('returning dateString: '+dateString)
	return dateString
}

module.exports = {
	tags: [
		"posts"
	],
	//"layout": "post.11ty.js",
	"layout": "post-en.html", // posts are in english by default.
	//"permalink": "{% setPermalink page.filePathStem, page.url %}"
	"permalink": data => `${ setPermalink(data.page.inputPath, data.page.filePathStem) }.html`,
	"eleventyComputed": {
		"computedDate": data => data.page.inputPath.match(/\d\d\d\d-\d\d?-\d\d?/) ? new Date(grabDateStringFromFile(data.page.inputPath)) : data.page.date // failure. this computed value will never be treated as "date" when sorting posts. solution: https://github.com/11ty/eleventy/issues/2514#issuecomment-1198736399
	}
};
