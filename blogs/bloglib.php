<?php
    # Establish a postgreSQL connection from a database environment string
    function pg_connection_string_from_database_url() {
      extract(parse_url(getenv("HEROKU_POSTGRESQL_COBALT_URL")));
      return "user=$user password=$pass host=$host dbname=" . substr($path, 1);
    }

    function seoUrl($url="") {
        //lower case everything
        $url = strtolower($url);
        //make alphaunermic
        $url = preg_replace("/[^a-z0-9_\s-]/", "", $url);
        //Clean multiple dashes or whitespaces
        $url = preg_replace("/[\s-]+/", " ", $url);
        //Convert whitespaces and underscore to dash
        $url = preg_replace("/[\s_]/", "-", $url);
        return $url;
    }

    # Function to create a blog post file
    function create_blog_post($blog_id, $blog_title, $blog_author, $blog_email, $blog_body, $blog_date) {

        $new_blog = "." . DIRECTORY_SEPARATOR . $blog_id . ".html";

        $new_header = file_get_contents("./blog-header.html");
        $new_body = "<h2>$blog_title</h2></div>\n".
                    "\t\t\t\t\t\t<div class='panel-body'>\n".
                    "\t\t\t\t\t\t<em><time datetime='$blog_date'>Submitted on $blog_date</time></em>\n".
                    "\t\t\t\t\t\t<p id='blog-body-content'>$blog_body</p>\n".
                    "\t\t\t\t\t\t<p><em>Written by $blog_author - $blog_email.</em></p>\n".
                    "\t\t\t\t\t\t<div id='disqus_thread'></div>\n".
                    "\t\t\t\t\t\t<script type='text/javascript'>\n".
                    "\t\t\t\t\t\tvar disqus_shortname = 'alphastage';\n".
                    "\t\t\t\t\t\tvar disqus_identifier = '$disqus_identifier';\n".
                    "\t\t\t\t\t\tvar disqus_title = '$blog_title';\n".
                    "\t\t\t\t\t\tvar disqus_url = document.URL;";
        $new_footer = file_get_contents("." . DIRECTORY_SEPARATOR . "blog-footer.html");

        $new_blog_contents = "$new_header\n$new_body\n$new_footer";

        $result = file_put_contents($new_blog, $new_blog_contents);
        if ($result === FALSE) {
            echo "Error with creating file: " . $new_blog;
            return;
        }
    }

    # Get a nicely formatted date
    function getFormattedDate() {
        $today = getdate();
        $day = $today['mday'];
        if ((int)$day < 10) {
            $day = "0$day";
        }
        $month = $today['mon'];
        if ((int)$month < 10) {
            $month = "0$month";
        }
        $year = $today['year'];
        return "$day-$month-$year";
    }

    # Returns a string with the blog table name
    function getTableName() {
        return "blogtable";
    }

    function setupBlogTable($table, $connection) {
        $create_table = "CREATE TABLE IF NOT EXISTS $table (
            blog_id VARCHAR(255) PRIMARY KEY NOT NULL,
            blog_title TEXT NOT NULL,
            blog_author TEXT NOT NULL,
            blog_email TEXT NOT NULL,
            blog_body BYTEA NOT NULL,
            blog_date TEXT NOT NULL
            )";

        return pg_query($connection, $create_table);
    }

?>
