// Big Spaceship GA testing helper
// [if there's anything wrong, blame Matthew Carver]
//
// example query string: ?test=[XXXXXX]&css=[XXXXXX]&html=[XXXXXX]&js=[XXXXXX]
// 
// all assets go in /tests directory in the root.
// directory structure: /tests/[test]/[filename].[html/css/js]
// 
// key = Google Anaylics Experiment Key
// 


key = '51706350-0';


function getParam(name)
{
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "no";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}


current = getParam("test");
css = getParam("css");
js = getParam("js");
html = getParam("html");


function utmx_section(){}function utmx(){}(function(){var k=key,d=document,l=d.location,c=d.cookie;if(l.search.indexOf('utm_expid='+k)>0)return;function f(n){if(c){var i=c.indexOf(n+'=');if(i>-1){var j=c.indexOf(';',i);return escape(c.substring(i+n.length+1,j<0?c.length:j))}}}var x=f('__utmx'),xx=f('__utmxx'),h=l.hash;d.write('<sc'+'ript src="'+'http'+(l.protocol=='https:'?'s://ssl':'://www')+'.google-analytics.com/ga_exp.js?'+'utmxkey='+k+'&utmx='+(x?x:'')+'&utmxx='+(xx?xx:'')+'&utmxtime='+new Date().valueOf()+(h?'&utmxhash='+escape(h.substr(1)):'')+'" type="text/javascript" charset="utf-8"><\/sc'+'ript>')})();

utmx('url','A/B');



function loadFile(filename, filetype){
 if (filetype=="js"){ //imc: f filename is a external JavaScript file
  var fileref=document.createElement('script')
  fileref.setAttribute("type","text/javascript")
  fileref.setAttribute("src", '/tests/'+current+'/'+filename)
  document.getElementsByTagName("head")[0].appendChild(fileref)
 }
 else if (filetype=="css"){ //mc: if filename is an external CSS file
  var fileref=document.createElement("link")
  fileref.setAttribute("rel", "stylesheet")
  fileref.setAttribute("type", "text/css")
  fileref.setAttribute("href", '/tests/'+current+'/'+filename)
  document.getElementsByTagName("head")[0].appendChild(fileref)
 }
 else if (filetype=="html"){ //mc: if filename is an external CSS file
  var fileref=document.createElement("div")
  fileref.setAttribute("id", filename)
  document.getElementsByTagName("body")[0].appendChild(fileref);//mc: write div to dump html

  if (!window.XMLHttpRequest && 'ActiveXObject' in window) {
    window.XMLHttpRequest= function() {
        return new ActiveXObject('MSXML2.XMLHttp');
    };
  }// mc: old browser support

  //mc: add html 
  var xhr= new XMLHttpRequest();
  xhr.open('GET', '/tests/'+current+'/'+filename, true);
  xhr.onreadystatechange= function() {
    if (this.readyState!==4) return;
    if (this.status!==200) return; // or whatever error handling you want
    document.getElementById(html).innerHTML= this.responseText;
  };
  xhr.send();

 }
 if (typeof fileref!="undefined"){
  //mc: do if theres nothing
 }
}


if(current==="no"){
  //mc: if there's no test, dont bother
}else{
  if(css != "no"){
    loadFile(css, "css");
  }

  if(js != "no"){
    loadFile(js, "js");
  }

  if(html != "no"){
    loadFile(html, "html");
  }
}