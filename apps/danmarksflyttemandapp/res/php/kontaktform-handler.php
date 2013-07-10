<?php
    $errors = '';
    $myemail = 'rami@alphastagestudios.com';

    if (empty($_POST['Name'])      ||
        empty($_POST['Email'])      ||
        empty($_POST['Subject'])    ||
        empty($_POST['Message'])) {
       $errors .= '\n Et påkrævet felt er ikke blevet udfyldt!';
    }

    $company = $_POST['Company'];
    $name = $_POST['Name'];
    $address = $_POST['Address'];
    $city = $_POST['City'];
    $email_address = $_POST['Email'];
    $telephone = $_POST['Telephone'];
    $subject = $_POST['Subject'];
    $message = $_POST['Message'];

    if (!preg_match("/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i", $email_address)) {
        $errors .= "\n Ugyldig email addresse";
    }

    if (empty($errors)) {
        $to = $myemail;
        $email_subject = "Kontakt form (app): $name";
        $email_body = "Du har modtaget en ny besked via kontaktformen (app):\n".
                    "Afsender: $name - $email_address \n".
                    "Virksomhed: $company\n".
                    "Addresse: $address.\n Postnummer og by: $city.\n".
                    "Telefon: $telephone.\n\n".
                    "Emne: $subject.\n".
                    "Besked: $message.\n";

        $headers = "From: $myemail\n";
        $headers .= "Reply-To: $email_address\n";

        mail($to, $email_subject, $email_body, $headers);
        echo "success";
    }
    else {
        echo "error";
    }

?>
