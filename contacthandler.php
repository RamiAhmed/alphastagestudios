<?php

    require './sendgrid-php/SendGrid_loader.php';
    require './swiftmailer/lib/swift_required.php';

    $sendgrid = new SendGrid(getenv("SENDGRID_USERNAME"), getenv("SENDGRID_PASSWORD"));

    if (!$sendgrid) {
        echo "Error with starting sendgrid";
        return;
    }

    $mail_subject = $_POST['contact-subject'];
    $mail_from_name = $_POST['contact-sender-name'];
    $mail_from_email = $_POST['contact-sender-email'];
    $mail_body = $_POST['contact-body'];

    $from = "$mail_from_email";
    $to = "rami@alphastagestudios.com";
    $subject = "SENT FROM WEB: $mail_subject";
    $body = "$mail_body";

    if(empty($from)) {
        echo "Error with from: $from";
        return;
    }

    if (empty($to)) {
        echo "Error with to: $to";
        return;
    }

    if (empty($subject)) {
        echo "Error with subject: $subject";
        return;
    }

    if (empty($body)) {
        echo "Error with body: $body";
        return;
    }

    $mail = new SendGrid\Mail();
    $mail->
        addTo($to)->
        setFromName($mail_from_name)->
        setFrom($from)->
        setSubject($subject)->
        setText($body);

    if (!$mail) {
        echo "Error with SendGrid\Mail() object";
        return;
    }

    //$sendgrid->web->send($mail);
    $sendgrid->smtp->send($mail);

    echo "success";

?>
