using System;
using System.Exception;
using System.Net.Mail;

public class MailHelper {

    public static string SendMail(object sender, EventArgs e) {
        try {
            string company = Request.Form["Company"].ToString();
            string name = Request.Form["Name"].ToString();
            string address = Request.Form["Address"].ToString();
            string city = Request.Form["City"].ToString();
            string email = Request.Form["Email"].ToString();
            string telephone = Request.Form["Telephone"].ToString();
            string subject = Request.Form["Subject"].ToString();
            string userMessage = Request.Form["Message"].ToString();

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

            MailMessage mail = new MailMessage(email, "rami@alphastagestudios.com", subject, message);
            mail.IsBodyHtml = false;

            SmtpClient client = new SmtpClient("localhost");
            client.Send(mail);

            return "success";
        }
        catch (Exception e) {
            return e.ToString();
        }
    }
}
