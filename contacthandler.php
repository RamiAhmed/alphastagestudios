<?php
/*
    require_once  'Mail.php';

    $mail_subject = $_POST['contact-subject'];
    $mail_from_name = $_POST['contact-sender-name'];
    $mail_from_email = $_POST['contact-sender-email'];
    $mail_body = $_POST['contact-body'];

    $from = "$mail_from_name <$mail_from_email>";
    $to = "Rami Ahmed Bock <rami@alphastagestudios.com>";
    $subject = $mail_subject;
    $body = $mail_body;

    $headers = array('From' => $from,
                     'To' => $to,
                     'Subject' => $subject);

    $wgSMTP = array(
        'host' => 'tls://smtp.sendgrid.net',
        'IDHost' => 'heroku.com',
        'port' => 587,
        'username' => getenv("SENDGRID_USERNAME"),
        'password' => getenv("SENDGRID_PASSWORD"),
        'auth' => true
    );

    $smtp = Mail::factory('smtp', $wgSMTP);

    $mail = $smtp->send($to, $headers, $body);

    if (PEAR::isError($mail)) {
        echo "Error sending mail: " . $mail->getMessage();
    }
    else {
        echo "success";
    }
*/
    require '/libs/sendgrid-php/SendGrid_loader.php';

    $sendgrid = new SendGrid(getenv("SENDGRID_USERNAME"), getenv("SENDGRID_PASSWORD"));

    if (!$sendgrid) {
        echo "Error with starting sendgrid";
        return;
    }

    $mail_subject = $_POST['contact-subject'];
    $mail_from_name = $_POST['contact-sender-name'];
    $mail_from_email = $_POST['contact-sender-email'];
    $mail_body = $_POST['contact-body'];

    $from = "$mail_from_name <$mail_from_email>";
    $to = "Rami Ahmed Bock <rami@alphastagestudios.com>";
    $subject = $mail_subject;
    $body = $mail_body;

    $mail = new SendGrid\Mail();
    $mail->
        addTo($to)->
        setFrom($from)->
        setSubject($subject)->
        setText($body);

    $sendgrid->web->send($mail);

?>
