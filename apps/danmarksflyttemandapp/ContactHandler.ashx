<%@ WebHandler Language="C#" Class="ContactHandler" %>

using System;
using System.Web;
using System.Linq;
using System.Net.Mail;
using System.Collections.Generic;
using System.Text.RegularExpressions;

public class ContactHandler : IHttpHandler {

    string toEmail = "rami@alphastagestudios.com";

    public bool IsReusable { get { return false; } }

    public void ProcessRequest(HttpContext context) {
        HttpResponse response = context.Response;
        response.ContentType = "text/plain";

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
            response.Write(errors);
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

            //SmtpClient client = new SmtpClient("localhost");
            //client.Send(mail);

            response.Write("success");
        }

        response.End();
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
