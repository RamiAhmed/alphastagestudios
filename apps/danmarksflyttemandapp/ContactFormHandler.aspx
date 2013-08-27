<%@ Page Language="C#" Class="ContactFormHandler" ContentType="text/html" ResponseEncoding="utf-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<%
using System;
using System.Exception;
using System.Net.Mail;
using System.Web.Services;

public class ContactFormHandler {

    string toEmail = "rami@alphastagestudios.com";

    [WebMethod]
    public static string SendMail(object sender, EventArgs e) {
        try {
            string errors = "",
                name = context.Request.QueryString["Name"],
                company = context.Request.QueryString["Company"],
                address = context.Request.QueryString["Address"],
                city = context.Request.QueryString["City"],
                email = context.Request.QueryString["Email"],
                telephone = context.Request.QueryString["Telephone"],
                subject = context.Request.QueryString["Subject"],
                userMessage = context.Request.QueryString["Message"];

            if (String.IsNullOrEmpty(email) || !ValidateEmail(email)) {
                errors = "Indtastet email er ugyldig.";
            }
            else if (String.IsNullOrEmpty(name)) {
                errors = "Indtast et navn.";
            }
            else if (String.IsNullOrEmpty(subject)) {
                errors = "Skriv et emne.";
            }
            else if (String.IsNullOrEmpty(userMessage)) {
                errors = "Skriv en besked.";
            }

            if (!String.IsNullOrEmpty(errors)) {
                return errors;
            }
            else {
                string message = "Afsender: " + name + " - " + email + "\n";
                if (!String.IsNullOrEmpty(message))
                    message += "Virksomhed: " + company + "\n";
                if (!String.IsNullOrEmpty(address))
                    message += "Addresse: " + address + "\n";
                if (!String.IsNullOrEmpty(city))
                    message += "Postnummer og by: " + city + "\n";
                if (!String.IsNullOrEmpty(telephone))
                    message += "Telefon: " + telephone + "\n";
                message += "Emne: " + subject + "\n";
                message += "Besked: " + userMessage;

                MailMessage mail = new MailMessage(email, toEmail, subject, message);
                mail.IsBodyHtml = false;

                //SmtpClient client = new SmtpClient();
                //client.Send(mail);

                return "success";
            }
        }
        catch (Exception e) {
            return e.ToString();
        }
    }
}

%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Form-handler</title>
<body>
</body>
</html>
