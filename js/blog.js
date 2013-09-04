var blogFilesArray = ["03-09-2013_website-version-2", "30-08-2013_things-are-happening", "05-09-2013_let-the-discussions-begin"];

$().ready(function() {

    $("#blog-container").html("");

    for (var i = 0; i < blogFilesArray.length; i++) {
        var blogFileName = blogFilesArray[i];
        var blogPost = '' + loadBlogPost(blogFileName) + '';

        if (blogPost == null) {
            console.log("ERROR. Blog post by filename: " + blogFileName + " could not be found");
        }
        else {
            var previewEnd = blogPost.indexOf("</p>");

            var blogPreview = blogPost.substring(0, previewEnd);
            blogPreview += "</p>";

            var blogButton = "<p><a class='btn btn-default btn-lg'";
            blogButton += " href='blogs/" + blogFileName + ".html'";
            blogButton += " target='_blank'";
            blogButton += " data-disqus-identifier='" + blogFileName.substring(0, 10) +"'>";
            blogButton += "Read the rest of this blog</a>.</p>";

            $("#blog-container").append(blogPreview);
            $("#blog-container").append(blogButton);

            if (i < blogFilesArray.length-1) {
                $("#blog-container").append("<hr>");
            }
        }
    };
});

var loadBlogPost = function(filename) {
    var fullPath = 'blogs/' + filename + '.html';
    var result = null;

    $.ajax({
        url: fullPath,
        type: 'get',
        dataType: 'html',
        async: false,
        success: function(data) {
            result = data;
        }
    });

    result = $($.parseHTML(result)).find(".blog-article").html();

    return result;
}
