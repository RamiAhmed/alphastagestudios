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
        async: true
    }).done(function(msg) {
        console.log("Received: " + msg);
        result = msg;

        console.log("result: " + result);
        console.log("result type: " + (typeof result));
        console.log("result.length: " + result.length);
        console.log("result[0]: " + result[0]);
        console.log("result[0].length: " + result[0].length);
        console.log("result parsed: " + JSON.parse(result));
        console.log("result stringify: " + JSON.stringify(result));
        console.log("result stringified and parsed: " + JSON.parse(JSON.stringify(result)));


    });

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
