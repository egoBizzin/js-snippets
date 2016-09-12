var txt_formatDate = 'yyyy-MM-dd';
var txt_formatTime = 'HH:mm';
var txt = '#';//txt_separator
//
var str_activeUser = Session.getActiveUser().getEmail();
var txt_timeZone = Session.getScriptTimeZone();
//
var txt_header =   
    "yyyy-MM-dd" + txt + 
    "HH:mm" + txt +
    "Email" + txt + 
    "Question 1" + txt +
    "Question 2" + txt +
    "Question 3" + txt +
    "Question 4";
var txt_response;
var txt_whoToSend;
var txt_whatToSend;
var int_departmentIndex;
  //receiving pairs-of-emal
  var dic_recevingEmails = {
    '[0]' : 'ego.tran@gmail.com',   //0-other
    '[1]' : 'ego.bizzin@gmail.com',  //1-marketing
    '[2]' : 'luongvannghia@gmail.com', //2-sales
    '[3]' : 'anonym.etor@gmail.com' //3-hr
  };
//
function onFormSubmit(e) {
  //receiving emails
  var str_receivingEmails = [
    'ego.tran@gmail.com',   //0-other
    'ego.ftpin@gmail.com',  //1-marketing
    'ego.bizzin@gmail.com', //2-sales
    'anonym.etor@gmail.com' //3-hr
  ]; 
  //
  checkResponses_v2();
  txt_whatToSend = 
    '(send to ' + txt_whoToSend + ")\n" +
    txt_header + "\n" + 
    txt_response;
  //  
  //txt_whoToSend = str_receivingEmails[0];
  GmailApp.sendEmail(txt_whoToSend, 'Google Form response from ' + str_activeUser, txt_whatToSend);  
}
//
function checkResponses_v2() {
  var form = FormApp.getActiveForm();
  var responses = form.getResponses();
  var response_looking = responses[responses.length - 1];
  //
  var d = new Date();
  txt_response =    
    Utilities.formatDate(d, txt_timeZone, txt_formatDate) + txt +
    Utilities.formatDate(d, txt_timeZone, txt_formatTime) + txt +
    str_activeUser + txt
    ;
  //for (var i = responses.length - 1; i < responses.length; i++) {//*i
  //var itemResponses = responses[i].getItemResponses();
  var itemResponses = response_looking.getItemResponses();
  //
  var str_wtf = itemResponses[0].getResponse();//.getItem();//.asListItem();//.getChoices()[0].getValue();
  txt_whoToSend = dic_recevingEmails[str_wtf.substr(0, 3)];
  //txt_response += txt_whoToSend + txt;
  for (var j = 1; j < itemResponses.length; j++) {     
    var itemResponse = itemResponses[j];      
    txt_response += itemResponse.getResponse() + txt;
  }//for j
  //}//for i
}//checkResponses_v2
