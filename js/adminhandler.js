/**/

$().ready(function() {

    $("#new-blog-form").on("submit", function(evt) {
        evt.preventDefault();

        var formData = JSON.parse(JSON.stringify($(this).serializeArray()));
        //console.log(formData);
        createNewBlogPost(formData);

    });


});

var createNewBlogPost = function(jsonFormData) {
    $.post('blogs/bloghandler.php', jsonFormData, function(response) {
        var resultDiv = "";
        if (response == "success") {
            resultDiv = "<div class='alert alert-success'>Your post was successfully created.</div>";
        }
        else {
            resultDiv = "<div class='alert alert-danger'>Your post was not created, an error occured.</div>";
        }
        $("#new-blog-form").insertAfter("<p>" + resultDiv + "</p>");
        console.log("response: " + response);
    });
}
