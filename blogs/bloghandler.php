<?php
    function seoUrl($url="") {
        //lower case everything
        $url = strtolower($url);
        //make alphaunermic
        $url = preg_replace("/[^a-z0-9_\s-]/", "", $url);
        //Clean multiple dashes or whitespaces
        $url = preg_replace("/[\s-]+/", " ", $url);
        //Convert whitespaces and underscore to dash
        $url = preg_replace("/[\s_]/", "-", $url);
        return $url;
    }

    $today = getdate();
    $day = $today['mday'];
    if ((int)$day < 10) {
        $day = "0$day";
    }
    $month = $today['mon'];
    if ((int)$month < 10) {
        $month = "0$month";
    }
    $year = $today['year'];
    $formatted_date = "$day-$month-$year";
    $blog_date = "" . (string)$today['weekday'] . ", " . (string)$today['month'] . " $day";

    $blog_title = $_POST['blog-title'];
    $blog_author = $_POST['blog-author'];
    $blog_email = $_POST['blog-author-email'];
    $blog_body = $_POST['blog-body'];

    $new_blog = "./$formatted_date" . "_" . seoUrl((string)$blog_title) . ".html";

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

    $result = file_put_contents($new_blog, $new_blog_contents);

    if ($result === FALSE) {
        echo "error";
    }
    else {
        echo "success";
    }

?>
