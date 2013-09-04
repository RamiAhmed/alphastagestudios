var blogFilesArray = ["03-09-2013_website-version-2", "30-08-2013_things-are-happening"];

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
            //console.log("blogPreview: " + blogPreview);

            blogPreview += "</p></blockquote>";
            blogPreview += "<p><a class='btn btn-default btn-lg' href='blogs/" + blogFileName + ".html' target='_blank' data-disqus-identifier='" + blogFileName.substring(0, 10) +"'>";
            blogPreview += "Read the rest of this blog</a>.</p>";

            if (i < blogFilesArray.length-1) {
                blogPreview += "<hr>";
            }

            $("#blog-container").append("<blockquote>");
            $("#blog-container").append(blogPreview);
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
