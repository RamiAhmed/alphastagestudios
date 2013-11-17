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
            favourite TEXT NOT NULL,
            starting_desire INTEGER NOT NULL,
            starting_reasons TEXT NOT NULL,
            starting_comments TEXT,
            during_desire_1 INTEGER NOT NULL,
            during_reasons_1 TEXT NOT NULL,
            during_comments_1 TEXT,
            during_desire_2 INTEGER,
            during_reasons_2 TEXT,
            during_comments_2 TEXT,
            during_desire_3 INTEGER,
            during_reasons_3 TEXT,
            during_comments_3 TEXT,
            after_desire INTEGER NOT NULL,
            after_reasons TEXT NOT NULL,
            after_comments TEXT,
            raw_time_played,
            raw_wave_count
        )";
    if (!pg_query($pg_conn, $create_table)) {
        echo "Error with creating table $table: " . pg_last_error($pg_conn);
        return;
    }

    $time = date("d-m-y H:i:s");

    $cols = "time,";
    $values = "'$time',";

    foreach ($_POST as $key => $value) {
        if ($key !== "" && $value !== "") {
            $cols .= "$key,";
            $values .= "'$value',";
        }
    }

    $cols = substr($cols, 0, -1);
    $values = substr($values, 0, -1);


    $sql = "INSERT INTO $table ($cols) VALUES ($values)";
    if (!pg_query($pg_conn, $sql)) {
        echo "Error with pg query executing SQL: " . $sql . ", error: " . pg_last_error($pg_conn);
        return;
    }

    echo $cols . "\n" . $values;

    pg_close($pg_conn);
?>
