
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

var loadBlogPost = function(blogFilesArray, index, callback) {
    var blogFileName = blogFilesArray[index];
    var fullPath = 'blogs/' + blogFileName + '.html';
    var result = null;

    $.ajax({
        url: fullPath,
        type: 'get',
        dataType: 'html',
        async: true
    }).done(function(msg) {
        result = $($.parseHTML(msg)).find(".blog-article").html();
        callback(result, blogFilesArray, index);
    });
};

var createBlogPostLink = function(blogPost, blogFileName) {
    var previewEnd = blogPost.indexOf("</p>");
    if (!previewEnd || previewEnd === 0 || previewEnd === null) {
        previewEnd = 500;
        if (previewEnd > blogPost.length) {
            previewEnd = blogPost.length-1;
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
};


$().ready(function() {
    $("#blog-container").html("");

    initializeBlogPosts(function(result) {
        var blogFilesArray = result.split(',');
        blogFilesArray.map(function(val, idx) {
            var date = val.split('_')[0].replace(/-/g,' ');
            var day = date.substring(0, 2);
            var month = date.substring(3, 5);
            var year = date.substring(6, 10);

            var newDate = year + ' ' + month + ' ' + day + ' 12:00:00';
            return new Date(newDate);
        }).sort();

        for (var i = 0; i < blogFilesArray.length; i++) {

            loadBlogPost(blogFilesArray, i, function(blogPost, blogFilesArray, index) {

                createBlogPostLink(blogPost, blogFilesArray[index]);
            });

            if (i < blogFilesArray.length-1) {
                $("#blog-container").append("<hr>");
            }
        }

    });
});
