<?php
    function seoUrl($string) {
        //lower case everything
        $string = strtolower($string);
        //make alphaunermic
        $string = preg_replace("/[^a-z0-9_\s-]/", "", $string);
        //Clean multiple dashes or whitespaces
        $string = preg_replace("/[\s-]+/", " ", $string);
        //Convert whitespaces and underscore to dash
        $string = preg_replace("/[\s_]/", "-", $string);
        return $string;
    }

    $blog_template = './blog-template.html';

    /*$today = getdate();
    $day = $today['mday'];
    $month = $today['mon'];
    $year = $today['year'];*/
    $today = date("dd-mm-yyyy");

    $blog_title = $_POST['blog-title'];
    $blog_author = $_POST['blog-author'];
    $blog_email = $_POST['blog-author-email'];
    $blog_body = $_POST['blog-body'];


    $new_blog = "$today" . "_" . seoURL($blog_title);

    echo $new_blog;

?>
