var strEmail = "saoluutaikhoan.service@gmail.com";
var strLabel = "Inbx";
function inboxFwd() 
{
  try
  {
    var label = GmailApp.getUserLabelByName(strLabel);
    var threads = label.getThreads();
    var now = new Date().getTime();
    //
    for(i in threads)
    {      
      threads[i].getMessages()[0].forward(strEmail, {subject:threads[i].getFirstMessageSubject() + " @" +threads[i].getMessages()[0].getFrom()});//2016-09-08
      //GmailApp.sendEmail(strEmail, threads[i].getFirstMessageSubject(), threads[i].getMessages()[0].getFrom());
    }//for
    label.removeFromThreads(threads);
  }//try
  catch(err)
  {
    Logger.log("Error Occured"+ err.toString());
  }//catch
}//sendsms