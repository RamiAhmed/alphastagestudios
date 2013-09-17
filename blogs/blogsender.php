<?php

    require './bloglib.php';


    $blog_title = $_POST['blog-title'];
    $blog_author = $_POST['blog-author'];
    $blog_email = $_POST['blog-author-email'];
    $blog_body = $_POST['blog-body'];

    $blog_date = getFormattedDate();
    $disqus_identifier = "$blog_date" . "_" . seoUrl((string)$blog_title);

    create_blog_post($disqus_identifier, $blog_title, $blog_author, $blog_email, $blog_body, $blog_date);

    /* --------------- DATABASE STUFF --------------- */

    $pg_conn = pg_connect(pg_connection_string_from_database_url());
    if (!$pg_conn) {
        echo "Error with pg connection: " . pg_last_error();
        return;
    }

    $table = getTableName();
    if (!setupBlogTable($table, $pg_conn)) {
        echo "Error with creating table using SQL: " . pg_last_error();
        return;
    }


    ### LARGE OBJECTS ###
    if (!startLargeObjectConnection($pg_conn)) {
        echo "Error with starting large object connection";
        return;
    }
    $bodyID = createLargeObject($pg_conn);
    if (!$bodyID) {
        echo "Error with creating large object";
        return;
    }

    $large_body = openLargeObject($pg_conn, $bodyID);
    if (!$large_body) {
        echo "Error with opening large object with id: $bodyID";
        return;
    }

    if (!writeToLargeObject($large_body, $blog_body)) {
        echo "Error with writing to large object: $large_body, with id: $bodyID";
        return;
    }

    if (!closeLargeObject($large_body)) {
        echo "Error with closing large object: $large_body, with id: $bodyID";
        return;
    }
    if (!endLargeObjectConnection($pg_conn)) {
        echo "Error with ending large object connection";
        return;
    }

    ### WRITE TO DATABASE
    $values = "'$disqus_identifier', '$blog_title', '$blog_author', '$blog_email', '$bodyID', '$blog_date'";
    $cols = "blog_id, blog_title, blog_author, blog_email, blog_body, blog_date";
    $sql = "INSERT INTO $table ($cols) VALUES ($values)";

    if (!pg_query($pg_conn, $sql)) {
        echo "Error with pg query executing: " . pg_last_error();
        return;
    }

    ### END
    echo "success";

    pg_close($pg_conn);
?>
