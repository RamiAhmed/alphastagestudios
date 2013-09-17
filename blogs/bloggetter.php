<?php

    require './bloglib.php';

    # Establish database connection
    $pg_conn = pg_connect(pg_connection_string_from_database_url());
    if (!$pg_conn) {
        echo "Error with pg connection: " . pg_last_error($pg_conn);
        return;
    }

    # Get everything in the table
    $table = getTableName();
    $sql = "SELECT * FROM $table";
    $result = pg_query($pg_conn, $sql);
    if (!$result) {
        echo "Error with pg query executing SQL: " . pg_last_error($pg_conn);
        return;
    }

    # Create one blog post per row received
    for ($i=0; $i < pg_num_rows($result); $i++) {
        $row = pg_fetch_array($result, $i, PGSQL_ASSOC);
        if (!$row) {
            echo "Error with pg_fetch_array: " . pg_last_error($pg_conn);
            break;
        }

        $blog_full_body = pg_unescape_bytea($row["blog_body"]);
        create_blog_post(
                    $row["blog_id"],
                    $row["blog_title"],
                    $row["blog_author"],
                    $row["blog_email"],
                    $blog_full_body,
                    $row["blog_date"]);
    }

    # Get all blog ids from table
    $blog_ids_sql = "SELECT blog_id FROM $table";
    $blog_ids_result = pg_query($pg_conn, $blog_ids_sql);
    if (!$blog_ids_result) {
        echo "Error with getting all blog ids, executing SQL: " . pg_last_error($pg_conn);
        return;
    }

    # Convert blog ids to an array
    $resultArray = array();
    while ($row = pg_fetch_row($blog_ids_result)) {
        $resultArray[] = $row;
    }

    # Send blog ids as json
    echo json_encode($resultArray);

    # Close database connection (just for good practice)
    pg_close($pg_conn);

?>
