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

    # Function to create a blog post
    function create_blog_post($blog_id, $blog_title, $blog_author, $blog_email, $blog_body, $blog_date) {

        $new_blog = "." . DIRECTORY_SEPARATOR . $blog_id . ".html";

        $new_header = file_get_contents("./blog-header.html");
        $new_body = "<h2>$blog_title</h2></div>\n".
                    "\t\t\t\t\t\t<div class='panel-body'>\n".
                    "\t\t\t\t\t\t<p><em><time datetime='$blog_date'>$blog_date</time></em></p>\n".
                    "\t\t\t\t\t\t<p>$blog_body</p>\n".
                    "\t\t\t\t\t\t<p><em>Written by $blog_author - $blog_email.</em></p>\n".
                    "\t\t\t\t\t\t<div id='disqus_thread'></div>\n".
                    "\t\t\t\t\t\t<script type='text/javascript'>\n".
                    "\t\t\t\t\t\tvar disqus_shortname = 'alphastage';\n".
                    "\t\t\t\t\t\tvar disqus_identifier = '$disqus_identifier';\n".
                    "\t\t\t\t\t\tvar disqus_title = '$blog_title';\n".
                    "\t\t\t\t\t\tvar disqus_url = document.URL;";
        $new_footer = file_get_contents("." . DIRECTORY_SEPARATOR . "blog-footer.html");

        $new_blog_contents = "$new_header\n$new_body\n$new_footer";

        $result = file_put_contents($new_blog, $new_blog_contents);
        if ($result === FALSE) {
            echo "Error with creating file: " . $new_blog;
            return;
        }
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
    $blog_date = "$day-$month-$year";

    $blog_title = $_POST['blog-title'];
    $blog_author = $_POST['blog-author'];
    $blog_email = $_POST['blog-author-email'];
    $blog_body = $_POST['blog-body'];

    $disqus_identifier = "$blog_date" . "_" . seoUrl((string)$blog_title);

    create_blog_post($disqus_identifier, $blog_title, $blog_author, $blog_email, $blog_body, $blog_date);

    /* --------------- DATABASE STUFF --------------- */

    # This function reads your DATABASE_URL config var and returns a connection
    # string suitable for pg_connect. Put this in your app.
    function pg_connection_string_from_database_url() {
      extract(parse_url(getenv("HEROKU_POSTGRESQL_COBALT_URL")));
      return "user=$user password=$pass host=$host dbname=" . substr($path, 1);
    }

    $pg_conn = pg_connect(pg_connection_string_from_database_url());
    if (!$pg_conn) {
        echo "Error with pg connection: " . pg_last_error();
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
        echo "Error with creating table using SQL: " . pg_last_error();
        return;
    }

    $values = "'$disqus_identifier', '$blog_title', '$blog_author', '$blog_email', '$blog_body', '$blog_date'";
    $cols = "blog_id, blog_title, blog_author, blog_email, blog_body, blog_date";
    $sql = "INSERT INTO $table ($cols) VALUES ($values)";

    if (!pg_query($pg_conn, $sql)) {
        echo "Error with pg query executing: " . pg_last_error();
        return;
    }

    echo "success";

    pg_close($pg_conn);
?>
