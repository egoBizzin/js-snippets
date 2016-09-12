//
function startInboxFwd(){
  // Trigger every minute
  ScriptApp.newTrigger('inboxFwd')
      .timeBased()
      .everyMinutes(10)
      .create();
  //
  Browser.msgBox("gApp.Msg", "You will be forwarding every of your inbox to someone named eTor by every minute !",Browser.Buttons.OK);  
}//startInboxFwd
function stopInboxFwd()
{
var allTriggers = ScriptApp.getScriptTriggers();


  for(var i=0; i < allTriggers.length; i++) 
    ScriptApp.deleteTrigger(allTriggers[i]);
  //
Browser.msgBox("gApp.Msg","stopInboxFwd() successfully.",Browser.Buttons.OK);  
}//stopInboxFwd