
var initializeBlogPosts = function(callback) {
    var result = null;

    $.ajax({
        url: "blogs/bloggetter.php",
        type: 'get',
        dataType: 'json',
        async: true
    }).done(function(msg) {
        callback(msg);
    });
};

var loadBlogPost = function(filename, callback) {
    var fullPath = 'blogs/' + filename + '.html';
    var result = null;

    $.ajax({
        url: fullPath,
        type: 'get',
        dataType: 'html',
        async: false
    }).done(function(msg) {
        result = $($.parseHTML(msg)).find(".blog-article").html();
        callback(result);
    });
};

var createBlogPostLink = function(blogPost) {
    var previewEnd = blogPost.indexOf("</p>");
    if (!previewEnd || previewEnd === 0) {
        previewEnd = 500;
        if (previewEnd > blogPost.length) {
            previewEnd = blogPost.length;
        }
    }
    var blogPreview = blogPost.substring(0, previewEnd);
    blogPreview += "</p>";

    $("#blog-container").append(blogPreview);

    var panels = $("#blog-container").find('*[class^="panel"]');
    $.each(panels, function() {
        $(this).children(":first").unwrap();
    });

    var blogButton = "<p><a class='btn btn-info'";
    blogButton += " href='blogs/" + blogFileName + ".html'";
    blogButton += " target='_blank'";
    blogButton += " data-disqus-identifier='" + blogFileName + "'";
    blogButton += ">Read the rest of this blog</a></p>";

    $("#blog-container").append(blogButton);

    if (i < blogFilesArray.length-1) {
        $("#blog-container").append("<hr>");
    }
};


$().ready(function() {
    $("#blog-container").html("");

    initializeBlogPosts(function(result) {
        var blogFilesArray = result;
        for (var i = 0; i < blogFilesArray.length; i++) {
            var blogFileName = blogFilesArray[i];
            loadBlogPost(blogFileName, function(blogPost) {
                createBlogPostLink(blogPost);
            });
        }
    });
});
