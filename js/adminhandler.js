/**/

$().ready(function() {

    $("#new-blog-form").on("submit", function(evt) {
        evt.preventDefault();

        var formData = JSON.parse(JSON.stringify($(this).serializeArray()));
        console.log(formData);
        createNewBlogPost(formData);

    });


});

var createNewBlogPost = function(jsonFormData) {
    $.post('blogs/bloghandler.php', jsonFormData, function(response) {
        console.log("Response: " + response);
    });
}
