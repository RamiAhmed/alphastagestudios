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
                "<p><em><time datetime='$formatted_date'>$blog_date</time></em></p>\n".
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

    # This function reads your DATABASE_URL config var and returns a connection
    # string suitable for pg_connect. Put this in your app.
    function pg_connection_string_from_database_url() {
      extract(parse_url(getenv("HEROKU_POSTGRESQL_COBALT_URL")));
      return "user=$user password=$pass host=$host dbname=" . substr($path, 1); # <- you may want to add sslmode=require there too
    }

    $pg_conn = pg_connect(pg_connection_string_from_database_url());
    if (!$pg_conn) {
        echo "Error with pg connection";
        return;
    }

    $table = "blogTable";
    $create_table = "CREATE TABLE IF NOT EXISTS $table (
        blog_id VARCHAR(255) PRIMARY KEY NOT NULL,
        blog_title TEXT NOT NULL,
        blog_author TEXT NOT NULL,
        blog_email TEXT NOT NULL,
        blog_body TEXT NOT NULL,
        blog_date TEXT NOT NULL
        )";

    if (!pg_query($pg_conn, $create_table)) {
        echo "Error with creating table using SQL: $create_table";
        return;
    }

    $values = "'$disqus_identifier', '$blog_title', '$blog_author', '$blog_email', '$blog_body', '$formatted_date'";
    $cols = "blog_id, blog_title, blog_author, blog_email, blog_body, blog_date";
    $sql = "INSERT INTO $table ($cols) VALUES ($values)";

    if (!pg_query($pg_conn, $sql)) {
        echo "Error with pg query executing: $sql";
        return;
    }

    echo "success";

    pg_close($pg_conn);
?>
