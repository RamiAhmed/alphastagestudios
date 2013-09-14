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
