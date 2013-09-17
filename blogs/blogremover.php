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

    $sql = "SELECT blog_body FROM $table WHERE blog_id='$blog_id'";
    $bodyID = pg_query($pg_conn, $sql);
    if (!$bodyID) {
        echo "Error could not retrieve large object (blog body) by ID: $blog_id";
        return;
    }

    if (!startLargeObjectConnection($pg_conn)) {
        echo "Error with starting large object connection";
        return;
    }

    if (!deleteLargeObject($pg_conn, $bodyID)) {
        echo "Error with unlinking large object by ID: $bodyID";
        return;
    }

    if (!endLargeObjectConnection($pg_conn)) {
        echo "Error with ending large object connection";
        return;
    }


    echo "success";

    # Close database connection (just for good practice)
    pg_free_result($result);
    pg_close($pg_conn);
?>
