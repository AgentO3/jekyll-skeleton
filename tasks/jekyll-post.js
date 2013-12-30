module.exports = function (grunt) {
	grunt.task.registerTask('post', 'Creates a new blog post', function(title) {

		var date, fileName,
		blogTempPath = "./tasks/templates/seed-post.md",
		blogFilePath = "./_posts/",
		tempFileContents,
		processedContents,
		obj,
		fileTitle;
		
		fileTitle = title.split(" ").join("-").toLowerCase();
		date = grunt.template.today('yyyy-mm-dd');

		fileName = date + "-" + fileTitle + ".md";

		tempFileContents = grunt.file.read(blogTempPath);

		obj = {title: title, date: date};

		processedContents = grunt.template.process(tempFileContents, {data: obj}); 

		grunt.file.write(blogFilePath + fileName, processedContents);
	});
}