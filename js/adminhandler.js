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
    //var blogContainer = $("blogsm-container");
    var result = null;

    $.ajax({
        url: "blogs/blogmanager.php",
        type: 'get',
        dataType: 'json',
        async: false
    }).done(function(msg) {
        console.log("Received: " + msg);
        result = msg;
    });

    for (var i = 0; i < result.length; i+4) {
        addNewBlogEntry(result[i], result[i+1], result[i+2], result[i+3]);
    };

/*
    for (var row in result) {
        console.log("adding row with id: " + row);
        addNewBlogEntry(row[1], row[2], row[3], row[5]);
    }
*/

}

var addNewBlogEntry = function(blog_title, blog_author, blog_email, blog_date) {

    var entry = "Title: <em>" + blog_title + "</em> | ";
    entry += "Author: <em>" + blog_author + "</em> | ";
    entry += "Email: <em>" + blog_email + "</em> | ";
    entry += "Date: <em>" + blog_date + "</em>";

    entry = "<p>" + entry + "</p>";
    entry += "<hr>";

    console.log("adding entry: " + entry);
    $("#blogsm-container").append(entry);
}
