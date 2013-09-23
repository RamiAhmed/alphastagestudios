/**/

var checkLogin = function() {
    $("nav").hide();

    $("#login-form").on("submit", function(evt) {
        evt.preventDefault();

        var loginData = JSON.parse(JSON.stringify($(this).serializeArray()));

        $.post('loginhandler.php', loginData, function(response) {
            if (response == "success") {
                $("nav").show();
                $("#admin-nav a:first").tab('show');
            }
            else {
                var failure = "<div class='alert alert-danger'>Login failed: " + response + ". </div>";
                $("#login-form").after("<p>" + failure + "</p>");
            }
        });
    });
}

var addNewAdmin = function() {
    $("#new-admin-form").on("submit", function(evt) {
        evt.preventDefault();

        var newAdminData = JSON.parse(JSON.stringify($(this).serializeArray()));

        $.post('newadminhandler.php', newAdminData, function(response) {
            var resultDiv = "";
            if (response.indexOf("success") >= 0) {
                resultDiv = "<div class='alert alert-success'>Successfully added new admin. </div>";
            }
            else {
                resultDiv = "<div class='alert alert-danger'>New admin adding failed: " + response + ". </div>";
            }
            $("#new-admin-form").after("<p>" + resultDiv + "</p>");
        });
    });
}

var createNewBlogPost = function(jsonFormData) {
    $.post('blogs/blogsender.php', jsonFormData, function(response) {
        var resultDiv = "";
        if (response == "success") {
            resultDiv = "<div class='alert alert-success'>Your post was successfully created. </div>";
        }
        else {
            resultDiv = "<div class='alert alert-danger'>Your post was not created, an error occured: " + response + ". </div>";
        }
        $("#new-blog-form").after("<p>" + resultDiv + "</p>");
    });
}

var initializeBlogManagementContainer = function() {
    var result = [];

    $("#blogsm-container").html("");

    $.ajax({
        url: "blogs/blogmanager.php",
        type: 'get',
        dataType: 'json',
        async: true
    }).done(function(msg) {
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

    var formattedTitle = blog_title.replace(/\s+/g, '-').replace(/[\])}[{(]/g,'').toLowerCase();
    var aID = "btn-" + blog_date + "_" + formattedTitle;
    entry = "<a id='" + aID + "' href='#' class='" + aClass + "'>" + entry + "</a>";

    $("#blogsm-container").append(entry);

    $("#" + aID).click(function(evt) {
        evt.preventDefault();

        $(this).parent().parent().find('.alert').remove();
        $(this).parent().children(".active").removeClass('active');

        $(this).addClass('active');

    });
}

var setupBlogButtons = function() {
    $("#btn-remove-blog").click(function(evt) {
        evt.preventDefault();

        var selected = $("#blogsm-container").children(".active").attr('id');

        var alertBlock = "<p><div class='alert alert-block alert-danger fade in'>\n";
        alertBlock += "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>\n";
        alertBlock += "<h4>Confirmation</h4>\n";
        alertBlock += "<p>Are you sure you want to remove the selected blog <strong>permanently</strong>?</p>\n";
        alertBlock += "<p><button id='blog-confirm-delete' type='button' class='btn btn-danger'>Confirm Removal</button></p>\n";
        alertBlock += "</div></p>\n";

        $(this).parent().children('.alert').remove();
        $(this).parent().append(alertBlock);

        $("#blog-confirm-delete").click(function(evt) {
            evt.preventDefault();

            var selectedId = selected.substring(4);
            requestDeleteBlog(selectedId);

            $(this).parents().find('.alert').remove();
        });

    });
}

var requestDeleteBlog = function(blog_id) {
    $.post('../blogs/blogremover.php', {'blog-id': blog_id}, function(response) {
        if (response.indexOf("success") >= 0) {

            setTimeout(function() {
                initializeBlogManagementContainer();
            }, 50);
        }
        else {
            //console.log("Error in blog deletion: " + response);
        }
    });
}


$().ready(function() {

    $().alert();

    checkLogin();

    initializeBlogManagementContainer();

    $("#new-blog-form").on("submit", function(evt) {
        evt.preventDefault();

        var formData = JSON.parse(JSON.stringify($(this).serializeArray()));
        createNewBlogPost(formData);

        $(this)[0].reset();

    });

    setupBlogButtons();

    addNewAdmin();

});
