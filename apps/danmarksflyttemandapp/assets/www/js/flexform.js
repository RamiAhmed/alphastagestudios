// JavaScript Document

var Svar_string = ""
var FormName

function flexform(tjek,formtitle){
    send_url="/css/form/flexform.asp";
    if (formtitle == "" || formtitle == undefined){formtitle = "MailForm";}
    FormName = eval("document."+formtitle);
    if (tjek == "" || tjek == undefined){tjek = "testform";}

    if(eval(tjek+"()")){
        if(FormName._confirm){
            if(confirm(FormName._confirm.value)){sendud(send_url);}
        }else{
            sendud(send_url);
        }
    }else{
        if(FormName._alert){alert(FormName._alert.value+" \n"+Svar_string);}
    }
}

function testform(){
    var Re = true
        Svar_string = ""
        if (FormName.Navn.value == ""){Re = false;alertColor("Navn");};
        if (!MailCheck(FormName.Email.value)){Re = false;alertColor("Email");};
        if (FormName.Telefon.value == ""){Re = false;alertColor("Telefon");};
        if (FormName.Besked.value.length <= 1){ Re = false; alertColor("Besked"); };
//      if (document.MailForm._captcha.value != "1"){Re = false;alertTxt("capchatxt");};
        if (Re == true){_gaq.push(['_trackEvent', 'form', 'submit','Kontakt']);}
//      if (Re == true){_trackEvent('Form', 'submit', 'Kontakt');}
    return Re
}

function kontaktpage(){
    var Re = true
        Svar_string = ""
        if (FormName.Navn.value == ""){Re = false;alertColor("Navn");};
        if (!MailCheck(FormName.Email.value)){Re = false;alertColor("Email");};
        if (FormName.Besked.value.length <= 1){ Re = false; alertColor("Besked"); };
//      if (document.MailForm._captcha.value != "1"){Re = false;alertTxt("capchatxt");};
        if (Re == true){_gaq.push(['_trackEvent', 'form', 'submit','Kontakt']);}
//      if (Re == true){_trackEvent('Form', 'submit', 'Kontakt');}
    return Re
}

function landing(){
    var Re = true
        Svar_string = ""
        if (FormName.Navn.value == ""){Re = false;alertColor("Navn");};
        if (!MailCheck(FormName.Email.value)){Re = false;alertColor("Email");};
        if (FormName.Emne.value == ""){Re = false;alertColor("Emne");};
        if (FormName.Besked.value.length <= 1){ Re = false; alertColor("Besked"); };
    return Re
}

function henttilbudpage(){
    var Re = true
        Svar_string = ""
        if (FormName.Navn.value == ""){if(Re==true){FormName.Navn.focus();};Re = false;alertColor("Navn");};
        if (FormName.EfterNavn.value == ""){if(Re==true){FormName.EfterNavn.focus();};Re = false;alertColor("EfterNavn");};
        if (FormName.Telefon.value == ""){if(Re==true){FormName.Telefon.focus();};Re = false;alertColor("Telefon");};
        if (!MailCheck(FormName.Email.value)){if(Re==true){FormName.Email.focus();};Re = false;alertColor("Email");};
        if (Re == true){_gaq.push(['_trackEvent', 'form', 'submit','HentTilbud']);}
    return Re
}
function pakkebestilling(){
    var Re = true
        Svar_string = ""
            pl = "Pakkel" + String.fromCharCode(248) + "sning"
            epl = eval("FormName.Pakkel" + String.fromCharCode(248) + "sning")
            if (epl.selectedIndex == 0){if(Re==true){epl.focus();};Re = false;alertColor(pl);};
        if (FormName.Navn.value == ""){if(Re==true){FormName.Navn.focus();};Re = false;alertColor("Navn");};
        if (FormName.EfterNavn.value == ""){if(Re==true){FormName.EfterNavn.focus();};Re = false;alertColor("EfterNavn");};
        if (FormName.Telefon.value == ""){if(Re==true){FormName.Telefon.focus();};Re = false;alertColor("Telefon");};
        if (!MailCheck(FormName.Email.value)){if(Re==true){FormName.Email.focus();};Re = false;alertColor("Email");};
        if (Re == true){_gaq.push(['_trackEvent', 'form', 'submit','PakkeBestilling']);}
    return Re
}

/* document.MailFormLeft (FormName) */
function landingminiform(){
    var Re = true
        Svar_string = ""
        if (document.MailFormLeft.Navn.value == ""){Re = false;alertColor("NavnLeft");};
        if (!MailCheck(document.MailFormLeft.Email.value)){Re = false;alertColor("EmailLeft");};
        if (document.MailFormLeft.Besked.value.length <= 1){ Re = false; alertColor("BeskedLeft"); };
        if (Re == true){_gaq.push(['_trackEvent', 'form', 'submit','Landingpage']);}
    return Re
}


function service(){
    var Re = true
        Svar_string = ""
        if (FormName.Navn.value == ""){Re = false;alertColor("Navn");};
        if (FormName.Adresse.value == ""){Re = false;alertColor("Adresse");};
        if (FormName.Post.value == ""){Re = false;alertColor("Post");};
        if (FormName.Byen.value == ""){Re = false;alertColor("Byen");};
        if (!MailCheck(FormName.Email.value)){Re = false;alertColor("Email");};
        if (FormName.Telefon.value == ""){Re = false;alertColor("Telefon");};
        if (FormName.Gasfyr.value == "false"){Re = false;alertColor("Gasfyr");};
        if (FormName.Gasforbrug.value == ""){Re = false;alertColor("Gasforbrug");};
        if (!FormName.Betingelser.checked){Re = false;alertColor("BetingelserLabel");};
    return Re
}




function sendud(send_url){
    FormName.action=send_url;
    window.setTimeout('outrun();',250);
}

function outrun(){
    FormName.submit();
}

function MailCheck(email) {
    var tx = /^[\w\.Ã¦.Ã¸.Ã¥.-]+@[\w\.Ã¦.Ã¸.Ã¥.-]+\.\w+\w+$/i;
    return tx.test(email)
}

function alertColor(navn){
    document.getElementById(navn).className = 'FeldErr';
    timer = setTimeout("document.getElementById('"+navn+"').className = 'FeldOK';",5000);
};

function alertTxt(navn){
    document.getElementById(navn).className = 'TxtErr';
    timer = setTimeout("document.getElementById('"+navn+"').className = '';",5000);
};

// Cookie handling ligger i common.js
