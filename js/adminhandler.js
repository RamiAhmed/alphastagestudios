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
/*
    var request = $.ajax({
        type: "post",
        url: "./blogs/bloghandler.php",
        data: jsonFormData
    });

    request.done(function(response, textStatus, jqXHR) {
        console.log("Success. Response: " + response, textStatus);
    });
    request.fail(function(jqXHR, textStatus, errorThrown) {
        console.log("Error: " + textStatus, errorThrown);
    });
*/
}
