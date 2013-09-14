<?php
    require './bloglib.php';

    $blog_id = $_POST['blog-id'];

    $pg_conn = pg_connect(pg_connection_string_from_database_url());
    if (!$pg_conn) {
        echo "Error with pg connection: " . pg_last_error();
        return;
    }

    $table = "blogTable";
    /*$result = pg_delete($pg_conn, $table, {'blog_id':$blog_id});
    if (!$result) {
        echo "Error with pg delete, deleting: $blog_id, error: " . pg_last_error();
        return;
    }*/

    $sql = "DELETE FROM $table WHERE 'blog_id' = '$blog_id'";
    if (!pg_query($pg_conn, $sql)) {
        echo "Error with pg query executing SQL: $sql, error: " . pg_last_error();
        return;
    }

    echo "success";

    # Close database connection (just for good practice)
    pg_close($pg_conn);
?>
