
<?php
    # Establish a postgreSQL connection from a database environment string
    function pg_connection_string_from_database_url() {
      extract(parse_url(getenv("HEROKU_POSTGRESQL_COBALT_URL")));
      return "user=$user password=$pass host=$host dbname=" . substr($path, 1);
    }

    $username = $_POST['new-username'];
    $password = $_POST['new-password'];

    $pg_conn = pg_connect(pg_connection_string_from_database_url());
    if (!$pg_conn) {
        echo "Error with pg connection: " . pg_last_error($pg_conn);
        return;
    }

    $table = "admintable";

    $check_existing = "SELECT * FROM $table WHERE username='$username'";
    $check_existing_query = pg_query($pg_conn, $check_existing);
    $check_existing_row = pg_fetch_assoc($check_existing_query);
    if ($check_existing_row['password'] || $check_existing_row['username']) {
        echo "Admin already exists with username: $username.";
        return;
    }

    $create_admin = "INSERT INTO $table (username, password) VALUES ('$username', '$password')";
    $query = pg_query($pg_conn, $create_admin);
    if (!$query) {
        echo "Error with inserting new admin to database: " . pg_last_error() . ", executing SQL: $create_admin";
        return;
    }

    echo "success";


?>
