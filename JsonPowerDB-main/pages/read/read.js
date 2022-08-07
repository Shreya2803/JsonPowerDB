
function validateAndGetFormData() {
  var colnameVar = $("#colname").val();
  if (colnameVar === "") {
    alert("Column Name is Required");
    $("#colname").focus();
    return "";
  }
  var colvalueVar = $("#colvalue").val();
  if (colvalueVar === "") {
    alert("column Value is Required");
    $("#colvalue").focus();
    return "";
  }
  
  console.log(colnameVar);
  var jsonStrObj = {
    [colnameVar]: colvalueVar,
  };
  return JSON.stringify(jsonStrObj);
}


// This method is used to create PUT Json request.
function getByKeyRequest(connToken, jsonObj, dbName, relName) {
  var putRequest =
    "{\n" +
    '"token" : "' +
    connToken +
    '",' +
    '"dbName": "' +
    dbName +
    '",\n' +
    '"cmd" : "GET_BY_KEY",\n' +
    '"rel" : "' +
    relName +
    '",' +
    '"jsonStr": \n' +
    jsonObj +
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
  $("#colname").val("");
  $("#colvalue").val("");
 
  $("#colname").focus();
}


function getEmployee() {
  var display = document.getElementById('display');
  document.getElementById("restext").style.display = "block";
  var jsonStr = validateAndGetFormData();
  if (jsonStr === "") {
    return;
  }
  var putReqStr = getByKeyRequest(
    "90938779|-31948831936850569|90945976",
    jsonStr,
    "CRUD_Project_DB",
    "user"
  );
  jQuery.ajaxSetup({ async: false });
  var resultObj = executeCommand(
    putReqStr,
    "http://api.login2explore.com:5577",
    "/api/irl"
  );  
  jQuery.ajaxSetup({ async: true });
  display.textContent= JSON.stringify(resultObj);
  resetForm();
}
