

// const userName = "admin";
// const userPass = "Admin";

var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
function validate(){
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;
if ( username == "Parent" && password == "parent"){
    alert ("הורה התחבר בהצלחה");
    window.location = "budget-tracker.html"; // Redirecting to other page.
    return false;
} else if(username == "Kid" && password == "kid"){
    alert ("ילד/ה התחבר/ה בהצלחה");
    window.location = "kids.html"; // Redirecting to other page.
    return false;
}
else{
attempt --;// Decrementing by one.
alert("נותרו "+attempt+" נסיונות;");
// Disabling fields after 3 attempts.
if( attempt == 0){
document.getElementById("username").disabled = true;
document.getElementById("password").disabled = true;
document.getElementById("submit").disabled = true;
return false;
}
}
}