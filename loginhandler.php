<?php
    # Establish a postgreSQL connection from a database environment string
    function pg_connection_string_from_database_url() {
      extract(parse_url(getenv("HEROKU_POSTGRESQL_COBALT_URL")));
      return "user=$user password=$pass host=$host dbname=" . substr($path, 1);
    }

    $username = $_POST['login-username'];
    $password = $_POST['login-password'];

    $pg_conn = pg_connect(pg_connection_string_from_database_url());
    if (!$pg_conn) {
        echo "Error with pg connection: " . pg_last_error($pg_conn);
        return;
    }

    $table = "admintable";
    $create_table = "CREATE TABLE IF NOT EXISTS $table (
        username TEXT PRIMARY KEY NOT NULL,
        password VARCHAR(255) NOT NULL
        )";

    if (!pg_query($pg_conn, $create_table)) {
        echo "Error with creating table: " . pg_last_error($pg_conn) . ", executing: $create_table";
        return;
    }

    $check_user = "SELECT password FROM $table WHERE username='$username'";
    $user_result = pg_query($pg_conn, $check_user);
    if (!$user_result) {
        echo "Error finding admin in database: " . pg_last_error($pg_conn);
        return;
    }

    $row = pg_fetch_assoc($user_result);
    if (!$row) {
        echo "Username incorrect";
        return;
    }
    else if ($row['password'] != $password) {
        echo "Password incorrect";
    }
    else if ($row['password'] == $password) {
        echo "success";
    }

?>
