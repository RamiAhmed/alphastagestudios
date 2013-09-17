<?php
    require './bloglib.php';

    $blog_id = $_POST['blog-id'];

    $pg_conn = pg_connect(pg_connection_string_from_database_url());
    if (!$pg_conn) {
        echo "Error with pg connection: " . pg_last_error($pg_conn);
        return;
    }

    $blogIdArray = array(
        'blog_id' => "$blog_id",
    );

    $table = getTableName();
    $result = pg_delete($pg_conn, $table, $blogIdArray);
    if (!$result) {
        echo "Error with pg_delete: " . pg_last_error($pg_conn) . ", executing: " . pg_delete($pg_conn, $table, $blogIdArray, PGSQL_DML_STRING);
        return;
    }

    echo "success";

    # Close database connection (just for good practice)
    pg_free_result($result);
    pg_close($pg_conn);
?>
