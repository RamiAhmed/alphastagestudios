<?php
    # Establish a postgreSQL connection from a database environment string
    function pg_connection_string_from_database_url() {
      extract(parse_url(getenv("HEROKU_POSTGRESQL_COBALT_URL")));
      return "user=$user password=$pass host=$host dbname=" . substr($path, 1);
    }

    $pg_conn = pg_connect(pg_connection_string_from_database_url());
    if (!$pg_conn) {
        echo "Error with pg connection: " . pg_last_error($pg_conn);
        return;
    }

    $table = "p7TestTable";

    $create_table = "CREATE TABLE IF NOT EXISTS $table (
            time TEXT NOT NULL,
            gender TEXT NOT NULL,
            age TEXT NOT NULL,
            playing_freq TEXT NOT NULL,
            playing_amount TEXT NOT NULL,
            favourite TEXT NOT NULL
        )";

    if (!pg_query($pg_conn, $create_table)) {
        echo "Error with creating table $table: " . pg_last_error($pg_conn);
        return;
    }

    $time = getdate();
    $cols = "time,";
    $values = "$time,";

    foreach ($_POST as $key => $value) {
        $cols .= "$key,";
        $values .= "'$value',";
    }

    $cols = substr($cols, 0, -1);
    $values = substr($values, 0, -1);

    echo $cols . "\n" . $values;

?>
