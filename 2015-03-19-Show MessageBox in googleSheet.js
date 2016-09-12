function helloGoogleScript(){
  var ui = SpreadsheetApp.getUi(); // Same variations.
  //
  var str_name = SpreadsheetApp.getActive().getRange('A1').getValue();
  var i_scoreTotal = SpreadsheetApp.getActive().getRange('C1').getValue();
  var i_scorePassing = SpreadsheetApp.getActive().getRange('B1').getValue();
  var i_scoreGot = SpreadsheetApp.getActive().getRange('A10').getValue();
  //
  var i_rank = SpreadsheetApp.getActive().getRange('A12').getValue();
  var i_candidateCount = SpreadsheetApp.getActive().getRange('B2').getValue();
  ui.alert('Congratulations, ' + str_name +
           '!\nYou PASS the test for registration to our training programme.' + 
           '\n'+
           '\nYour final score is : ' + i_scoreGot + '/' + i_scoreTotal + ' ( ' + i_rank + ' out of ' + i_candidateCount + ' candidates)' +
           '\nThe passing score is : ' + i_scorePassing + '/' + i_scoreTotal
          );
}