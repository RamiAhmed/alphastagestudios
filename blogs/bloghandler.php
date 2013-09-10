<?php
    $blog_template = './blog-template.html';

    $blog_title = $_POST['blog-title'];
    $blog_author = $_POST['blog-author'];
    $blog_email = $_POST['blog-author-email'];
    $blog_body = $_POST['blog-body'];

    $feedback = "Title: $blog_title\n".
                "Author: $blog_author\n".
                "Email: $blog_email\n".
                "Body: $blog_body";
    echo $feedback;

?>
