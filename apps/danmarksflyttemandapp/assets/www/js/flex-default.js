
// JavaScript Document
/*
---------------------
Onload function
---------------------
*/
function RunOnLoad(){
//	P7_Uberlink('p7uberlink','BodyId');
	P7_Uberlink('ThisPage','top_menu');
/*	document.getElementById("wrapper").style.margin = '255px auto 20px auto !important' */
	MailLink('BodyId','');

//	SideLink('SideLink','MenuSideBar','noTop');
//	P7_Uberlink('SideLink','MenuSideBar');
	P7_Uberlink_wp('ThisPage','MenuSideBar');

}

function Gtest(){
	_gaq.push(['_trackEvent', 'form', 'submit','Gtest']);
	alert("Gtest send (form submit Gtest)")
}


/* 
  ------------------------------------------------
  PVII Uberlink
  Current Page Link Highlighter
  Copyright (c) 2007 Project Seven Development
  www.projectseven.com
  Version: 1.0.0
  ------------------------------------------------
*/

function charfix(str){
	str = str.replace(/%C3%A6/g,String.fromCharCode(230)) // æ
	str = str.replace(/%C3%B8/g,String.fromCharCode(248)) // ø
	str = str.replace(/%C3%A5/g,String.fromCharCode(229)) // å
	str = str.replace(/%C3%86/g,String.fromCharCode(198)) // Æ
	str = str.replace(/%C3%98/g,String.fromCharCode(216)) // Ø
	str = str.replace(/%C3%85/g,String.fromCharCode(197)) // Å
	return str	
}

function P7_Uberlink(cl,d){
	var i,ob,tA,h=charfix(document.location.href);
	if(document.getElementById){
	ob=(d)?document.getElementById(d):document;
	if(ob){
	tA=ob.getElementsByTagName('A');
	for(i=0;i<tA.length;i++){
	hreffix = charfix(tA[i].href)
	if(hreffix==h){
	tA[i].className=cl;
}}}}}

function P7_Uberlink_wp(cl,d){
	var i,ob,tA,h=charfix(document.location.href);
	if(document.getElementById){
	ob=(d)?document.getElementById(d):document;
	if(ob){
	tA=ob.getElementsByTagName('A');
	for(i=0;i<tA.length;i++){
	hreffix = charfix(tA[i].href)
	if(hreffix==h){
	tA[i].className=cl;
	tA[i].parentNode.className=cl+"p";
}}}}}



/*
-----------------
Bund txt function
-----------------
*/
function TripNote(){
	if (document.getElementById("NoteTxt").style.visibility != 'visible'){
		document.getElementById("NoteTxt").style.visibility = 'visible'
		document.getElementById("NoteTxt").style.height = 'auto'
	}else{
		document.getElementById("NoteTxt").style.visibility = 'hidden'
		document.getElementById("NoteTxt").style.height = '0px'
	}
}


/*
------------------
Mail spoofe
------------------
*/

function MailLink(d,r){		//	MailLink('[BodyId - område]','[evt. extra tegn efter €]');
	var i,ob,tA,L,T;
	if(document.getElementById){
		ob=(d)?document.getElementById(d):document;
		if(ob){
			tA=ob.getElementsByTagName('A');
			for(i=0;i<tA.length;i++){
				L=tA[i].href
				T=tA[i].innerHTML
				if(L.indexOf("mailto:")== 0){

//					ex = new RegExp("€"+r,"g");
					ex = new RegExp(unescape("%u20AC")+r,"g");
					ex2 = new RegExp("%E2%82%AC"+r,"g");
					tA[i].href=L.replace(ex,"@");
					if (navigator.appName != "Microsoft Internet Explorer"){tA[i].href=L.replace(ex2,"@");}
					tA[i].innerHTML=T.replace(ex,"@");
				}
			}
			tA=ob.getElementsByTagName('input');
			for(i=0;i<tA.length;i++){
				L=tA[i].type
				T=tA[i].innerHTML
				if(L== "hidden"){
//					ex = new RegExp("€"+r,"g");
					ex = new RegExp(unescape("%u20AC")+r,"g");
					tA[i].value=tA[i].value.replace(ex,"@");
				}
			}
		}
	}
}


/* Form text overlay **/
function HideInfoTxt(){
	newid = this.id.replace("txt","")
	document.getElementById(newid + "txt").className="InfoTxtHide";
	document.getElementById(newid).focus();
}
function ShowInfoTxt(){
	newid = this.id.replace("txt","")
	if (document.getElementById(newid).value==""){
		document.getElementById(newid + "txt").className="InfoTxt";
	}
}



function SideLink(cl,d,v){    //   SideLink('SideLink','MenuSideBar','noTop');  SideLink('[Classe navn]','[ID område]','[noTop (Level 0)]');
	var i,ob,tA,h=document.location.href;
	if(document.getElementById){
		ob=(d)?document.getElementById(d):document;
		if(ob){
			tA=ob.getElementsByTagName('A');
			for(i=0;i<tA.length;i++){
				if(tA[i].href==h){
					if(tA[i].parentNode.parentNode.id == d){
						if(v == "noTop"){
							tA[i].parentNode.className=cl+"noTopFirst"
							tA[i].parentNode.childNodes[2].className=cl+"noTopSubFirst"
						}else{
							tA[i].parentNode.className=cl+"Sub"
						}
					}else if(tA[i].parentNode.parentNode.parentNode.parentNode.id == d){
						if(v == "noTop"){
							tA[i].parentNode.parentNode.parentNode.className=cl+"noTop"
							tA[i].parentNode.parentNode.className=cl+"noTopSub"
						}else{
							tA[i].parentNode.parentNode.parentNode.className=cl+"Sub"
						}
					}else if(tA[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id == d){
						if(v == "noTop"){
							tA[i].parentNode.parentNode.parentNode.parentNode.parentNode.className=cl+"noTop"
							tA[i].parentNode.parentNode.parentNode.parentNode.className=cl+"noTopSub"
						}else{
							tA[i].parentNode.parentNode.parentNode.parentNode.parentNode.className=cl+"Sub"
						}
					}
					tA[i].className+=cl;
				}
			}
		}
	}
}

// Top fixer ---------------
topplace=1;
//window.onscroll = function(){topfix();} // Enable denne linie
//window.onresize = function(){topfix();} // Enable denne linie
//window.onload = function(){topfix();} // Enable denne linie
function topfix(){
	b = document.documentElement.scrollTop + document.body.scrollTop;
	c = document.documentElement.scrollLeft + document.body.scrollLeft;
	heightfix = 130;
	heightoffset = 0;
	if (b < heightfix && topplace == 0){
		topplace = 1;
		document.getElementById('top').style.position = "absolute"
		document.getElementById('top').style.top = ""+heightoffset+"px"
		document.getElementById('top').style.left = "inherit"
	}else if (b >= heightfix && topplace == 1){
		topplace = 0;
		document.getElementById('top').style.position = "fixed"
		document.getElementById('top').style.top = "-"+(heightfix-heightoffset)+"px"
	}
	if (c > 0 && topplace == 0){
		document.getElementById('top').style.left = "-"+c+"px"
	}else{
		document.getElementById('top').style.left = "inherit"
	}
}

// -------------------------


/*
-----------------
Musover funktion 
-----------------

eks.
<a href="http://www.flex-media.dk/" target="_blank">
	<img src="/css/images/flexmedia.png" width="240" height="65" onmouseover="musover(this,'ind')" onmouseout="musover(this,'ud')"  />
</a>

-- under onload
	musload("div_id");



*/
function musover(self,a){
	h=document.location.href;
	if (h != self.parentNode.href){
		if (a == "ind"){self.src=self.src.replace(".png","_over.png")}
		if (a == "ud"){self.src=self.src.replace("_over.png",".png")}
	}
}

function musload(d){
	var i,ob,tA,tIMG,h=document.location.href;
	if(document.getElementById){
	ob=(d)?document.getElementById(d):document;
	if(ob){
	tA=ob.getElementsByTagName('A');
	for(i=0;i<tA.length;i++){
	if(tA[i].href==h){
	tIMG = tA[i].getElementsByTagName('IMG')
	tIMG[0].src = tIMG[0].src.replace(".png","_over.png");
}}}}}




// --- Cookie ---

function setCook(name,vadi){
    document.cookie = name+"="+vadi+";path=/;";
//	document.cookie='formsend=true;path=/;' 

//    window.cookie = name+"="+vadi+";";
//	document.cookie = 'user_name=' + user_name + ',path=/';
}
function delCook(name){
    var cookdate = new Date();
    document.cookie = name+"=false;path=/;expires=" + cookdate.toGMTString() + ";" + ";";
//    document.cookie = name+"=false;expires=" + cookdate.toGMTString() + ";" + ";";
//    window.cookie = name+"=false;expires=" + cookdate.toGMTString() + ";" + ";";
}
function getCook(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
//	var ca = window.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
// -------------------------


function RDNselect(){
	sel = document.getElementById('selectRDN').children;
	a=0;
	for (var i=0;i<sel.length;i++){if(sel[i].className == "frontBox"){a++};};
	var RDN = Math.floor(Math.random()*a);
	a=-1;
	for (var i=0;i<sel.length;i++){
		if(sel[i].className == "frontBox"){a++};
		if (a != RDN){
			sel[i].className = "HiderBox";
		}
	}
	document.getElementById('selectRDN').style.visibility = "visible";
}

function addLoadEvent(func) {   
	var oldonload = window.onload;   
	if (typeof window.onload != 'function') {   
		window.onload = func;   
	} else {   
		window.onload = function() {   
			if (oldonload) {   
				oldonload();   
			}   
			func();   
		}   
	}   
}   
/* HOW TO USE eks.
	addLoadEvent(MMload);
	MMload er en function som skal køres
*/




