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
    $blog_date = "" . $today['weekday'] . ", " . $today['month'] . " $day";

    $blog_title = $_POST['blog-title'];
    $blog_author = $_POST['blog-author'];
    $blog_email = $_POST['blog-author-email'];
    $blog_body = $_POST['blog-body'];

    $new_blog = "./$formatted_date" . "_" . seoURL($blog_title) . ".html";

    $new_header = file_get_contents("./blog-header.html");
    $new_body = "<h2>$blog_title</h2></div>\n".
                "<div class='panel-body'>\n".
                "<p><em><time datetime='$year-$month-$day'>$blog_date</time></em></p>\n".
                "<p>$blog_body</p>\n".
                "<p><em>Written by $blog_author - $blog_email.</em></p>\n".
                "<div id='disqus_thread'></div>\n".
                "<script type='text/javascript'>\n".
                "var disqus_shortname = 'alphastage';\n".
                "var disqus_identifier = '$formatted_date';\n".
                "var disqus_title = '$blog_title';\n".
                "var disqus_url = document.URL;";

    $new_footer = file_get_contents("./blog-footer.html");

    $new_blog_contents = "$new_header\n$new_body\n$new_footer";

    file_put_contents($new_blog, $new_blog_contents);
    $length = $strlen(utf8_decode(file_get_contents($new_blog)));
    if ($length > 100) {
        echo "success";
    }
    else {
        echo "error";
    }

?>
