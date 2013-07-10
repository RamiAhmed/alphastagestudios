/* Script written by Rami@alphastagestudios.com
    All Copyrights preserved.
*/

<?php
    $errors = '';
    $myemail = 'rami@alphastagestudios.com';

    if (empty($_POST['Name'])      ||
        empty($_POST['Telephone'])      ||
        empty($_POST['Email'])    ||
        empty($_POST['MoveDate'])) {
       $errors .= '\n Et påkrævet felt er ikke blevet udfyldt!';
    }

    $name = $_POST['Name'];
    $telephone = $_POST['Telephone'];
    $email_address = $_POST['Email'];

    $from_address = $_POST['FromAddress'];
    $from_zip = $_POST['FromZip'];
    $from_city = $_POST['FromCity'];
    $from_region = $_POST['FromRegion'];
    $from_elevator = $_POST['FromElevator'];
    $from_parking = $_POST['FromParking'];
    $from_size = $_POST['FromSize'];
    $from_rooms = $_POST['FromRooms'];

    $to_address = $_POST['ToAddress'];
    $to_zip = $_POST['ToZip'];
    $to_city = $_POST['ToCity'];
    $to_region = $_POST['ToRegion'];
    $to_elevator = $_POST['ToElevator'];
    $to_parking = $_POST['ToParking'];
    $to_size = $_POST['ToSize'];
    $to_rooms = $_POST['ToRooms'];

    $move_date = $_POST['MoveDate'];
    $flexible = $_POST['Flexible'];
    $amount_men = $_POST['AmountMen'];
    $packing = $_POST['Packing'];
    $description = $_POST['Description'];

    if (!preg_match("/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i", $email_address)) {
        $errors .= "\n Ugyldig email addresse";
    }

    if (empty($errors)) {
        $to = $myemail;
        $email_subject = "Tilbud form (app): $name";
        $email_body = "Du har modtaget en ny besked via tilbudformen (app):\n".
                    "Afsender: $name - $email_address \n".
                    "Telefon: $telephone.\n\n".
                    "Fraflytter bolig:\n".
                    "$from_address\n".
                    "$from_zip, $from_city\n".
                    "$from_region\n".
                    "Elevator: $from_elevator\n".
                    "Parkeringsafstand: $from_parking\n".
                    "Bolig størrelse: $from_size fordelt på $from_rooms værelser.\n\n".
                    "Tilflytter bolig:\n".
                    "$to_address\n".
                    "$to_zip, $to_city\n".
                    "$to_region\n".
                    "Elevator: $to_elevator\n".
                    "Parkeringsafstand: $to_parking\n".
                    "Bolig størrelse: $to_size fordelt på $to_rooms værelser.\n\n".
                    "Ønsket flyttedato: $move_date\n".
                    "Fleksibel flyttedato? $flexible\n".
                    "Ønsket antal flyttemænd: $amount_men\n".
                    "Ønsker nedpakning? $packing\n\n".
                    "Beskrivelse af indbo:\n $description";

        $headers = "From: $myemail\n";
        $headers .= "Reply-To: $email_address\n";

        mail($to, $email_subject, $email_body, $headers);
        echo "success";
    }
    else {
        echo "error";
    }

?>
