module.exports = function (grunt) {
	grunt.task.registerTask('post', 'Creates a new blog post', function(title) {

		var 
		date = grunt.template.today('yyyy-mm-dd'),
		blogTempPath = "./tasks/templates/seed-post.md",
		blogFilePath = "./_posts/",
		tempFileContents = grunt.file.read(blogTempPath),
		fileTitle = title.split(" ").join("-").toLowerCase(),
		datePost = grunt.template.today('yyyy-mm-dd h:MM:ss'),
		fileName = date + "-" + fileTitle + ".md",
		obj = {title: title, date: datePost, layout: "post"},
		processedContents = grunt.template.process(tempFileContents, {data: obj}); 

		grunt.file.write(blogFilePath + fileName, processedContents);
	});
}