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
            p_id SERIAL PRIMARY KEY NOT NULL,
            time TEXT NOT NULL,
            gender TEXT NOT NULL,
            age TEXT NOT NULL,
            playing_freq TEXT NOT NULL,
            playing_amount TEXT NOT NULL,
            favourite BYTEA NOT NULL,
            starting_desire INTEGER NOT NULL,
            starting_reasons BYTEA NOT NULL,
            starting_comments BYTEA,
            during_desire_1 INTEGER,
            during_reasons_1 BYTEA,
            during_comments_1 BYTEA,
            during_desire_2 INTEGER,
            during_reasons_2 BYTEA,
            during_comments_2 BYTEA,
            during_desire_3 INTEGER,
            during_reasons_3 BYTEA,
            during_comments_3 BYTEA,
            after_desire INTEGER NOT NULL,
            after_reasons BYTEA NOT NULL,
            after_comments BYTEA,
            raw_time_played INTEGER NOT NULL,
            raw_time_spent INTEGER NOT NULL,
            raw_wave_count INTEGER NOT NULL,
            raw_total_tactics_changes INTEGER NOT NULL,
            raw_tactics_changes INTEGER NOT NULL,
            raw_targets_changes INTEGER NOT NULL,
            raw_condition_changes INTEGER NOT NULL,
            raw_gold_spent INTEGER NOT NULL,
            raw_gold_earned INTEGER NOT NULL,
            raw_units_died INTEGER NOT NULL,
            raw_enemies_killed INTEGER NOT NULL,
            raw_gold_deposit_left INTEGER NOT NULL,
            raw_units_bought INTEGER NOT NULL,
            raw_unit_upgrades INTEGER NOT NULL,
            raw_units_sold INTEGER NOT NULL,
            raw_units_moved INTEGER NOT NULL,
            raw_total_selections INTEGER NOT NULL,
            raw_units_selected INTEGER NOT NULL,
            raw_enemies_selected INTEGER NOT NULL,
            raw_force_spawns INTEGER NOT NULL,
            scenario TEXT NOT NULL,
            preferred_scenario TEXT
        );";
    if (!pg_query($pg_conn, $create_table)) {
        echo "Error with creating table $table: " . pg_last_error($pg_conn);
        return;
    }

    $time = date("d-m-y H:i:s P");

    $cols = "time,";
    $values = "'$time',";

    foreach ($_POST as $key => $value) {
        if ($key !== "" && $value !== "") {
            $cols .= "$key,";

            if (stristr($key, 'comments') !== FALSE || stristr($key, 'reasons') !== FALSE || $key === 'favourite') {
                $value = pg_escape_bytea($value);
            }

            $values .= "'$value',";
        }
    }

    $cols = substr($cols, 0, -1);
    $values = substr($values, 0, -1);

    $sql = "INSERT INTO $table ($cols) VALUES ($values)";
    if (!pg_query($pg_conn, $sql)) {
        echo "Error with pg query executing SQL:  $sql\n, error: " . pg_last_error($pg_conn);
        return;
    }

    echo $cols . "\n" . $values;

    pg_close($pg_conn);
?>
