module.exports = function (grunt) {
	grunt.task.registerTask('page', 'Creates a new page', function(pageName) {

		var 
		title = pageName.split("-").join(" ").toUpperCase(),
		pageTempPath = "./tasks/templates/seed-post.md",
		pageDate = grunt.template.today('yyyy-mm-dd h:MM:ss'),
		fileName = pageName + "/" + "index.md",
		tempFileContents = grunt.file.read(pageTempPath),
		obj = {title: title, date: pageDate, layout: "page"},
		processedContents = grunt.template.process(tempFileContents, {data: obj}); 

		grunt.file.write(fileName, processedContents);
	});
}