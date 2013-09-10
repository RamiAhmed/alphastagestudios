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
        if (!response || response.length === 0) { // is response echo empty?
            resultDiv = "<div class='alert alert-danger'>Your post was not created, an error occured.</div>";
        }
        else {
            resultDiv = "<div class='alert alert-success'>Your post was successfully created.</div>";
        }
        $("#panel-body").append(resultDiv);
        console.log("response: " + response);
    });
}
