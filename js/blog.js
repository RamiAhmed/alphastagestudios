$().ready(function() {
    var blogFilesArray = initializeBlogPosts();
    $("#blog-container").html("");

    if (blogFilesArray == null) {
        console.log("Could not find blog files");
        return;
    }

    for (var i = 0; i < blogFilesArray.length; i++) {
        var blogFileName = blogFilesArray[i];
        var blogPost = '' + loadBlogPost(blogFileName) + '';

        if (blogPost == null) {
            console.log("ERROR. Blog post by filename: " + blogFileName + " could not be found");
        }
        else {
            var previewEnd = blogPost.indexOf("</p>");
            if (!previewEnd || previewEnd == 0) {
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

        }
    };
});

var initializeBlogPosts = function() {
    var result = null;

    $.ajax({
        url: "blogs/bloggetter.php",
        type: 'get',
        dataType: 'json',
        async: false
    }).done(function(msg) {
        result = msg;
    });

    return result;
}

var loadBlogPost = function(filename) {
    var fullPath = 'blogs/' + filename + '.html';
    var result = null;

    $.ajax({
        url: fullPath,
        type: 'get',
        dataType: 'html',
        async: false
    }).done(function(msg) {
        result = $($.parseHTML(msg)).find(".blog-article").html();
    });

    return result;
}

