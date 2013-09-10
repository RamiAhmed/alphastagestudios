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

    $today = getdate();
    $day = $today['mday'];
    if ($day < 10) {
        $day = "0$day";
    }
    $month = $today['mon'];
    if ($month < 10) {
        $month = "0$month";
    }
    $year = $today['year'];
    $formatted_date = "$day-$month-$year";

    $blog_title = $_POST['blog-title'];
    $blog_author = $_POST['blog-author'];
    $blog_email = $_POST['blog-author-email'];
    $blog_body = $_POST['blog-body'];

    $new_blog = "./$formatted_date" . "_" . seoURL($blog_title) . ".html";
    if (!copy($blog_template, $new_blog)) {
        echo "Failed to copy $blog_template\n";
        return;
    }

    $html = file_get_html($new_file);
    $html->find('.panel-heading')->innertext = "<h2>$blog_title</h2>";
    $html->find('.panel-body')->innertext = "<p>$formatted_date</p> <p>$blog_body</p> <p>$blog_author - $blog_email</p>";
//    $new_file = fopen($new_blog, "w");


//    fclose($new_file);

    echo "$new_blog\n $html";

?>
