var url = window.location;
//var x = url.indexOf("https://");

if (url.protocol == "http:") {

document.write("<iframe id='Iframe1' src='http://dunsregistered.dnb.com/SealAuthentication.aspx?Cid=1' width='114px' height='97px' frameborder='0' scrolling='no' allowtransparency='true' ></iframe>");
}
else {
document.write("<iframe id='Iframe1' src='https://dunsregistered.dnb.com/SealAuthentication.aspx?Cid=1' width='114px' height='97px' frameborder='0' scrolling='no' allowtransparency='true' ></iframe>");

}



