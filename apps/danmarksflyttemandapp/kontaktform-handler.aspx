using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Exception;
using System.Net.Mail;
using System.Text.RegularExpressions;

public class MailHelper {

    string toEmail = "rami@alphastagestudios.com";

    [System.Web.Services.WebMethod]
    public static string SendMail(object sender, EventArgs e) {
        string errors = "";
        //Response.ContentType = "text/plain";

        try {
            string company = Request.Form["Company"].ToString();
            string name = Request.Form["Name"].ToString();
            string address = Request.Form["Address"].ToString();
            string city = Request.Form["City"].ToString();
            string email = Request.Form["Email"].ToString();
            string telephone = Request.Form["Telephone"].ToString();
            string subject = Request.Form["Subject"].ToString();
            string userMessage = Request.Form["Message"].ToString();

            if (!ValidateEmail(email)) {
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
                //Response.Write(errors);
                return errors;
            }

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

            SmtpClient client = new SmtpClient("localhost");
            client.Send(mail);

            //Response.Write("success");
            return "success";
        }
        catch (Exception e) {
            //Response.Write(e.ToString());
            return e.ToString();
        }
    }

    private bool ValidateEmail(string email)
    {
        Regex regex = new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");
        Match match = regex.Match(email);
        if (match.Success)
           return true;
        else
           return false;
    }
}
