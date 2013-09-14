/**/

$().ready(function() {

    initializeBlogManagementContainer();

    $("#new-blog-form").on("submit", function(evt) {
        evt.preventDefault();

        var formData = JSON.parse(JSON.stringify($(this).serializeArray()));
        //console.log(formData);
        createNewBlogPost(formData);

        $(this)[0].reset();

    });


});

var createNewBlogPost = function(jsonFormData) {
    $.post('blogs/blogsender.php', jsonFormData, function(response) {
        var resultDiv = "";
        if (response == "success") {
            resultDiv = "<div class='alert alert-success'>Your post was successfully created.</div>";
        }
        else {
            resultDiv = "<div class='alert alert-danger'>Your post was not created, an error occured: " + response + ". </div>";
        }
        $("#new-blog-form").after("<p>" + resultDiv + "</p>");
        //console.log("response: " + response);
    });
}

var initializeBlogManagementContainer = function() {
    var result = [];

    $.ajax({
        url: "blogs/blogmanager.php",
        type: 'get',
        dataType: 'json',
        async: true
    }).done(function(msg) {
        //console.log("Received: " + msg);
        result = msg;

        for (var i=0; i < result.length; i++) {
            var blog = result[i].toString();
            blog = blog.substring(1, blog.length-1);
            blog = blog.split(",");
            addNewBlogEntry(i, blog[0], blog[1], blog[2], blog[3]);

        }

    });

}

var addNewBlogEntry = function(index, blog_title, blog_author, blog_email, blog_date) {

    blog_title = blog_title.substring(1, blog_title.length-1);
    blog_author = blog_author.substring(1, blog_author.length-1);

    var entry = "Author: <em>" + blog_author + "</em> | ";
    entry += "Email: <em>" + blog_email + "</em> | ";
    entry += "Date: <em>" + blog_date + "</em>";

    var entryHeading = "<h4 class='list-group-item-heading'>" + blog_title + "</h4>";

    entry = "<p class='list-group-item-text'>" + entry + "</p>";
    entry = entryHeading + "\n" + entry;

    var aClass = 'list-group-item';
    if (index <= 0) {
        aClass += ' active';
    }

    var formattedTitle = blog_title.replace(/\s+/g, '-').toLowerCase().replace(/[\])}[{(]/g,'');
    var aID = formattedTitle + "_" + blog_date;
    entry = "<a id='" + aID + "' href='#' class='" + aClass + "'>" + entry + "</a>";

    //console.log("adding entry: " + entry);
    $("#blogsm-container").append(entry);

    $("#" + aID).click(function(evt) {
        evt.preventDefault();

        $(this).parent().children(".active").removeClass('active');

        $(this).addClass('active');

    })
}
