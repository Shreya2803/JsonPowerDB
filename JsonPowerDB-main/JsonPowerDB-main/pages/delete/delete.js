
// function validateAndGetFormData() {
//   var recordnumberVar = $("#recordnumber").val();
//   if (recordnumberVar === "") {
//     alert("Record Number is Required");
//     $("#recordnumber").focus();
//     return "";
//   }
  
  
//   var jsonStrObj = JSON.stringify([new String('record'), new Number(recordnumberVar)]);
//   return jsonStrObj;
// }


// This method is used to create PUT Json request.
function createPUTRequest(connToken, recordnum, dbName, relName) {
  var putRequest =
    "{\n" +
    '"token" : "' +
    connToken +
    '",' +
    '"dbName": "' +
    dbName +
    '",\n' +
    '"cmd" : "REMOVE",\n' +
    '"rel" : "' +
    relName +
    '",' +
    '"record": \n' +
    recordnum +
    "\n" +
    "}";
  return putRequest;
}


function executeCommand(reqString, dbBaseUrl, apiEndPointUrl) {
  var url = dbBaseUrl + apiEndPointUrl;
  var jsonObj;
  $.post(url, reqString, function (result) {
    jsonObj = JSON.parse(result);
  }).fail(function (result) {
    var dataJsonObj = result.responseText;
    jsonObj = JSON.parse(dataJsonObj);
  });
  return jsonObj;
}


function resetForm() {
  $("#recordnumber").val("");
 
 
  $("#recordnumber").focus();
}


function deleteEmployee() {
  var display = document.getElementById('display');
  document.getElementById("restext").style.display = "block";
  var recordnum = $("#recordnumber").val(); 

  var putReqStr = createPUTRequest(
    "90938779|-31948831936850569|90945976",
    recordnum,
    "CRUD_Project_DB",
    "user"
  );

  jQuery.ajaxSetup({ async: false });
  var resultObj = executeCommand(
    putReqStr,
    "http://api.login2explore.com:5577",
    "/api/iml"
  );
  
  jQuery.ajaxSetup({ async: true });
  display.innerHTML= JSON.stringify(resultObj);
  window.scrollTo(0, document.body.scrollHeight);
  resetForm();
}
