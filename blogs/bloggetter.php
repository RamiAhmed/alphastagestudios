<?php
    # This function reads your DATABASE_URL config var and returns a connection
    # string suitable for pg_connect. Put this in your app.
    function pg_connection_string_from_database_url() {
      extract(parse_url(getenv("HEROKU_POSTGRESQL_COBALT_URL")));
      return "user=$user password=$pass host=$host dbname=" . substr($path, 1); # <- you may want to add sslmode=require there too
    }

    function create_blog_post($blog_id, $blog_title, $blog_author, $blog_email, $blog_body, $blog_date) {

        $new_blog = "." . DIRECTORY_SEPARATOR . $blog_id . ".html";

        $new_header = file_get_contents("./blog-header.html");
        $new_body = "<h2>$blog_title</h2></div>\n".
            "<div class='panel-body'>\n".
            "<p><em><time datetime='$blog_date'>$blog_date</time></em></p>\n".
            "<p>$blog_body</p>\n".
            "<p><em>Written by $blog_author - $blog_email.</em></p>\n".
            "<div id='disqus_thread'></div>\n".
            "<script type='text/javascript'>\n".
            "var disqus_shortname = 'alphastage';\n".
            "var disqus_identifier = '$blog_id';\n".
            "var disqus_title = '$blog_title';\n".
            "var disqus_url = document.URL;";
        $new_footer = file_get_contents("." . DIRECTORY_SEPARATOR . "blog-footer.html");

        $new_blog_contents = "$new_header\n$new_body\n$new_footer";

        $result = file_put_contents($new_blog, $new_blog_contents);
        if ($result === FALSE) {
            echo "Error with creating file: " . $new_blog;
            return;
        }
    }

    $pg_conn = pg_connect(pg_connection_string_from_database_url());
    if (!$pg_conn) {
        echo "Error with pg connection";
        return;
    }

    $table = "blogTable";
    $sql = "SELECT * FROM $table";

    $result = pg_query($pg_conn, $sql);
    if (!$result) {
        echo "Error with pg query executing SQL: $sql";
        return;
    }

    for ($i=0; $i < pg_num_rows($result); $i++) {
        $row = pg_fetch_array($result, $i, "PGSQL_ASSOC");
        create_blog_post(
                        $row["blog_id"],
                        $row["blog_title"],
                        $row["blog_author"],
                        $row["blog_email"],
                        $row["blog_body"],
                        $row["blog_date"]);
    }

    $blog_ids_sql = "SELECT blog_id FROM $table";
    $blog_ids_result = pg_query($pg_conn, $blog_ids_sql);

    if (!$blog_ids_result) {
        echo "Error with getting all blog ids, executing SQL: $blog_ids_sql";
        return;
    }

    echo json_encode(pg_fetch_all($blog_ids_result));

    pg_close($pg_conn);

?>