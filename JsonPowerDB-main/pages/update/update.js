$("#user").focus();
function validateAndGetFormData() {
    var recordnumberVar = $("#recordnumber").val();
    if (recordnumberVar === "") {
      alert("Record Number is Required");
      $("#recordnumber").focus();
      return "";
    } 
  var firstnameVar = $("#firstname").val();
  if (firstnameVar === "") {
    alert("First Name is Required");
    $("#firstname").focus();
    return "";
  }
  var lastnameVar = $("#lastname").val();
  if (lastnameVar === "") {
    alert("Last Name is Required");
    $("#lastname").focus();
    return "";
  }
  var usernameVar = $("#username").val();
  if (usernameVar === "") {
    alert("Username is Required");
    $("#username").focus();
    return "";
  }
  var emailVar = $("#email").val();
  if (emailVar === "") {
    alert("Email id is Required");
    $("#email").focus();
    return "";
  }
  var cityVar = $("#city").val();
  if (cityVar === "") {
    alert("City is Required");
    $("#city").focus();
    return "";
  }
  var stateVar = $("#state").val();
  if (stateVar === "") {
    alert("State is Required");
    $("#state").focus();
    return "";
  }
  var pincodeVar = $("#pincode").val();
  if (pincodeVar === "") {
    alert("Pincode is Required");
    $("#pincode").focus();
    return "";
  }
  
  var jsonStrObj = {
      [recordnumberVar]:{
    firstname: firstnameVar,
    lastname: lastnameVar,
    username: usernameVar,
    email: emailVar,
    city: cityVar,
    state: stateVar,
    pincode: pincodeVar,
      }
  };
  return JSON.stringify(jsonStrObj);
}


// This method is used to create PUT Json request.
function createUPDATERequest(connToken, jsonObj, dbName, relName) {
  var putRequest =
    "{\n" +
    '"token" : "' +
    connToken +
    '",' +
    '"dbName": "' +
    dbName +
    '",\n' +
    '"cmd" : "UPDATE",\n' +
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
    $("#recordnumber").val(""); 
  $("#firstname").val("");
  $("#lastname").val("");
  $("#username").val("");
  $("#email").val("");
  $("#city").val("");
  $("#state").val("");
  $("#pincode").val("");
 
  $("#recordnumber").focus();
}


function updateEmployee() {
  var display = document.getElementById('display');
  document.getElementById("restext").style.display = "block";
  var jsonStr = validateAndGetFormData();
  if (jsonStr === "") {
    return;
  }
  var putReqStr = createUPDATERequest(
    "90938779|-31948831936850569|90945976",
    jsonStr,
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
