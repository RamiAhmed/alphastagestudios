$().ready(function() {

    $("#contact-form").on("submit", function(evt) {
        evt.preventDefault();

        var formData = JSON.parse(JSON.stringify($(this).serializeArray()));
        createNewEmail(formData);

        $(this)[0].reset();
    });

});

var createNewEmail = function(jsonFormData) {
    $.post('contacthandler.php', jsonFormData, function(response) {
        var resultDiv = "";
        if (response == "success") {
            resultDiv = "<div class='alert alert-success'>Your message was successfully sent.</div>";
        }
        else {
            resultDiv = "<div class='alert alert-danger'>Your message was not sent, an error occured: " + response + ". </div>";
        }
        $("#contact-form").after("<p>" + resultDiv + "</p>");
    });

}
