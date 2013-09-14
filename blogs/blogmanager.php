<?php
    require './bloglib.php';

    # Establish database connection
    $pg_conn = pg_connect(pg_connection_string_from_database_url());
    if (!$pg_conn) {
        echo "Error with pg connection: " . pg_last_error();
        return;
    }

    # Get everything in the table
    $table = getTableName();
    $sql = "SELECT (blog_title, blog_author, blog_email, blog_date) FROM $table";
    $result = pg_query($pg_conn, $sql);
    if (!$result) {
        echo "Error with pg query executing SQL: " . pg_last_error();
        return;
    }

    # Convert blogs to an array
    $resultArray = array();
    while ($row = pg_fetch_row($result)) {
        $resultArray[] = $row;
    }

    # Send blogs as json
    echo json_encode($resultArray);

    # Close database connection (just for good practice)
    pg_close($pg_conn);

?>
