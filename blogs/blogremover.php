<?php
    require './bloglib.php';

    $blog_id = $_POST['blog-id'];

    $pg_conn = pg_connect(pg_connection_string_from_database_url());
    if (!$pg_conn) {
        echo "Error with pg connection: " . pg_last_error();
        return;
    }

    $blogIdArray = array(
        'blog_id' => "$blog_id",
    );

    $table = getTableName();
    $result = pg_delete($pg_conn, $table, $blogIdArray);
    if (!$result) {
        echo "Error with pg_delete: " . pg_last_error() . ", executing: " . pg_delete($pg_conn, $table, $blogIdArray, PGSQL_DML_STRING);
        return;
    }
    /*$sql = "DELETE FROM $table WHERE blog_id = '$blog_id'";
    $result = pg_query($pg_conn, $sql);
    if (!$result) {
        echo "Error with pg query executing SQL: $sql, error: " . pg_last_error();
        return;
    }
*/
    echo "success " . pg_delete($pg_conn, $table, $blogIdArray, PGSQL_DML_STRING);

    # Close database connection (just for good practice)
    pg_free_result($result);
    pg_close($pg_conn);
?>
