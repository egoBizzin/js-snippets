//
function onOpen() 
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var menuEntries = [ 
    {name: "inbox.fwd()", functionName:"inboxFwd"},
    {name: "startInboxFwd()", functionName: "startInboxFwd"},
    {name: "stopInboxFwd()", functionName: "stopInboxFwd"}
    ];
  ss.addMenu("inbox.fwd()", menuEntries);
}//onOpen