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
    $blog_date = (string)$today['weekday'] . ", " . (string)$today['month'] . " $day";

    $blog_title = $_POST['blog-title'];
    $blog_author = $_POST['blog-author'];
    $blog_email = $_POST['blog-author-email'];
    $blog_body = $_POST['blog-body'];

    $new_blog = "." . DIRECTORY_SEPARATOR . "$formatted_date" . "_" . seoUrl((string)$blog_title) . ".html";
    $disqus_identifier = "$formatted_date" . "_" . seoUrl((string)$blog_title);

    $new_header = file_get_contents("./blog-header.html");
    $new_body = "<h2>$blog_title</h2></div>\n".
                "<div class='panel-body'>\n".
                "<p><em><time datetime='$year-$month-$day'>$blog_date</time></em></p>\n".
                "<p>$blog_body</p>\n".
                "<p><em>Written by $blog_author - $blog_email.</em></p>\n".
                "<div id='disqus_thread'></div>\n".
                "<script type='text/javascript'>\n".
                "var disqus_shortname = 'alphastage';\n".
                "var disqus_identifier = '$disqus_identifier';\n".
                "var disqus_title = '$blog_title';\n".
                "var disqus_url = document.URL;";

    $new_footer = file_get_contents("." . DIRECTORY_SEPARATOR . "blog-footer.html");

    $new_blog_contents = "$new_header\n$new_body\n$new_footer";

    $result = file_put_contents($new_blog, $new_blog_contents);
    if ($result === FALSE) {
        echo "Error with creating file: " . $new_blog;
        return;
    }
    /* --------------- DATABASE STUFF --------------- */

    $cleardb_url = "mysql://b0d5b904e022b1:286643ff@us-cdbr-east-04.cleardb.com/heroku_0909e11fa9260bb?reconnect=true";
    $url = parse_url(getenv($cleardb_url));

    $server = $url["us-cdbr-east-04.cleardb.com"];
    $username = $url["b0d5b904e022b1"];
    $password = $url["286643ff"];
    $db_name = substr($url["heroku_0909e11fa9260bb"], 1);
/*
// SSL currently not supported by Heroku for ClearDB (because of no mysqli)
    $path_to_ssl = ".." . DIRECTORY_SEPARATOR . "certs" . DIRECTORY_SEPARATOR;
    $ssl_key_file = $path_to_ssl . "b0d5b904e022b1-key.pem";
    $ssl_client_cert_file = $path_to_ssl . "b0d5b904e022b1-cert.pem";
    $ssl_server_cert_file = $path_to_ssl . "cleardb-ca.pem";
*/
    mysql_connect($server, $username, $password);
    mysql_select_db($db_name);

    $values = "'$blog_id', '$blog_title', '$blog_author', '$blog_email', '$blog_body', '$blog_date'";
    $table = "'heroku_0909e11fa9260bb'.'blogs_table'";
    $cols = "blog_id, blog_title, blog_author, blog_email, blog_body, blog_date";
    $sql = "INSERT INTO $table ($cols) VALUES ($values)";

    $result = mysql_query($sql);

    if (!$result) {
        echo "Error with mysql query: " . mysql_error();
        return;
    }

    mysql_free_result($result);


/*
    $db = mysqli_init();
    if (!$db) {
        echo "Error with mysqli_init.";
        return;
    }
*/

    //$db->ssl_set($ssl_key_file, $ssl_client_cert_file, $ssl_server_cert_file, null, null);

/*
    if (!$db->real_connect($server, $username, $password, $db_name)) {
        echo "Error with database: %s\n" . mysqli_connect_error();
        return;
    }
    */

/*
    $values = "'$blog_id', '$blog_title', '$blog_author', '$blog_email', '$blog_body', '$blog_date'";
    $table = "'heroku_0909e11fa9260bb'.'blogs_table'";
    $cols = "blog_id, blog_title, blog_author, blog_email, blog_body, blog_date";
    $sql = "INSERT INTO $table ($cols) VALUES ($values)";

    if (!$db->query($sql)) {
        echo "Error with SQL: %s\n" . mysqli_error();
    }
*/

//    $db->close();

    echo "success";

?>
