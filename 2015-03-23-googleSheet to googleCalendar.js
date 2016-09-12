//
//https://docs.google.com/spreadsheets/d/1kwZen3mqAoZAmUmGKJh-m0-9FtIwagB29m-V6MsXfvo/edit?usp=sharing
/
var i_yearDelta = 2;
var dateMin_const = new Date(new Date().getYear()-i_yearDelta, 1, 1);
var dateMax_const = new Date(new Date().getYear()+i_yearDelta, 12, 31);
var dateMin;// = dateMin_const;
var dateMax;// = dateMax_const;
var txt = '-';
var i_rowStart = 2;
var cal;
//
function vCalEvent_findById(id){
  //Logger.clear();
  Logger.log('\nvCalEvent_findById()-----------------------------------------------\n');
  //
  var i_count = 0;
  var cal = CalendarApp.getDefaultCalendar();
  var events_found;
  //
  var dt = dateMin;
  while (dt <= dateMax){
    //events_found = cal.getEventsForDay(dt, {search:id});
    //if (events_found.length > 0)
      //return events_found[0];
    //
    events_found = cal.getEventsForDay(dt);
    if (events_found.length > 0)
      Logger.log(vstr_formatDate(dt) + ' -- ' + events_found.length + ' results');
    for (var i = 0; i < events_found.length; i++){
      i_count++;
      if (events_found[i].getTag('id') == id){
        //Logger.log(i_count);
        return events_found[i];
      }//if
    }//for
    i_count++;
    dt = vdt_addDaysFromDate(dt, 1);
  }//
  //
  Logger.log('count = ' + i_count);
  return null;
}
//
function onChange(e){
  //Logger.log("onChange() event fired on " + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss'));
  //calTest_Elance();
  v_calculateDates();
}
//
function v_doWork() {  
  v_calculateDates();
  //[0]-owner
  //[1]-projectName
  //[2]-type
  //[3]-desc
  //[4]-dueDate
  //[5]-estimatedCompletionDate
  //[6]-status
  //[7]-notes
  //[8]-uniqueID  
  var sheet = SpreadsheetApp.getActiveSheet();
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();
  //
  var cal = CalendarApp.getDefaultCalendar();
  //
  var title;//["T"YPE-dueDate-Owner] Description-of-deliverable/milestone
  var desc;//=notes
  var dateStart;//=dateEstimatedCompletion;
  var dateDueDate;
  var location;//
  var id;
  //
  var row;
  var eventFound;
  var event;
  for (var i = i_rowStart; i <= numRows - 1; i++) {
    row = values[i];//current row
    //
    dateDueDate = vstr_formatDate(row[4]);
    title = row[3];//title = '[' + row[2] + txt + dateDueDate + txt + row[0] + '] ' + row[3];
    dateStart = row[5];
    desc = row[7];    
    location = '';
    id = row[8];
    //if (id != '') title += ' (' + id + ')';
    //
    if (id == ''){
      event = cal.createAllDayEvent(title, dateStart, {description:desc,location:location});
      event.setTag('id', event.getId());
      //
      sheet.getRange(i+1, 9).setValue(event.getId());
    }//if
    else //if id not empty
    {
      eventFound = vCalEvent_findById(id);
      //
      if (eventFound != null){//if found, update values
        eventFound.setTitle(title);
        eventFound.setTime(dateStart, dateStart);
        eventFound.setDescription(desc);
        eventFound.setAllDayDate(dateStart);
      }//if found
      else{//if not found, create new
        event = cal.createAllDayEvent(title, dateStart, {description:desc,location:location});
        //
        event.setTag('id', event.getId());
        event.setTag('id',id);
      }//else
    }//else
  }//for
}//function
//
function onOpen() {
  Logger.clear();
  /**
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [{
    name : "Read Data",
    functionName : "readRows"
  }];
  spreadsheet.addMenu("Script Center Menu", entries);
  */
  v_calculateDates();
};
function v_calculateDates(){
  var sheet = SpreadsheetApp.getActiveSheet();
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();
  //
  var row;
  dateMin = sheet.getRange("rg_dtMin").getValue();
  dateMax = sheet.getRange("rg_dtMax").getValue();
  for (var i = i_rowStart; i <= numRows - 1; i++) {
    row = values[i];//current row
    //
    if (row[5] < dateMin) dateMin = row[5];
    if (row[5] > dateMax) dateMax = row[5];
  }//for
  //
  if (dateMin < dateMin_const) dateMin = dateMin_const;
  if (dateMax > dateMax_const) dateMax = dateMax_const;
  //
  sheet.getRange("rg_dtMin").setValue(dateMin);
  sheet.getRange("rg_dtMax").setValue(dateMax);
}
//
function v_resetDates(){
  var sheet = SpreadsheetApp.getActiveSheet();
  //
  dateMin = sheet.getRange("rg_dtMin").getValue();
  dateMax = sheet.getRange("rg_dtMax").getValue();
  //
  if (dateMin < dateMin_const) dateMin = dateMin_const;
  if (dateMax > dateMax_const) dateMax = dateMax_const;
  //
  sheet.getRange("rg_dtMin").setValue(dateMin);
  sheet.getRange("rg_dtMax").setValue(dateMax);
}//
//
//
//helpers-start
//
//
function v_clearLog(){ Logger.clear(); }
function vstr_formatDate(dt){
  return Utilities.formatDate(dt, Session.getScriptTimeZone(),"yyyy/MM/dd");
}
function vdt_addDaysFromDate(date,d){
  var result = new Date(date.getTime()+d*(24*60*60*1000));//hour*minute*second*millisecond
  return result;
}
//
//
//helpers-end
//
//
/**
 * Retrieves all the rows in the active spreadsheet that contain data and logs the
 * values for each row.
 * For more information on using the Spreadsheet API, see
 * https://developers.google.com/apps-script/service_spreadsheet
 */
function readRows() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();

  for (var i = 0; i <= numRows - 1; i++) {
    var row = values[i];
    Logger.log(row);
  }
};