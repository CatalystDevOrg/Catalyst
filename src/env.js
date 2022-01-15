// This file contains variables, browser information, and functions to get this data
// Similar to the navigator functions in all browsers

// Security Patches
securityPatchLevel = "January22Q1";
securityPatchID = "1002942";
latestSecurityPatch = "release11-patch002";
currentSecurityPatch = "release11-patch002";

// Browser Meta Data
browserName = "Catalyst";
browserEngine = "Chromium 94, Blink, Electron Latest";
browserRepository = "https://github.com/JaydenDev/Catalyst";
browserLicense = "MIT";

// Functions to access data without entering file or preferences
 function navBrowserName() {
   console.log(browserName);
 }

 function navBrowserEngine() {
   console.log(browserEngine);
 }

 function navBrowserRepository() {
   console.log(browserRepository);
 }

 function navBrowserLicense() {
   console.log(browserLicense);
 }

 function logSecurityPatchID() {
   console.log(securityPatchID);
   console.log(currentSecurityPatch);
 }

// Show info in preferences
document.getElementById("current-security-patch").innerText = "Patch&nbsp" + currentSecurityPatch;
document.getElementById("current-security-patch-id").innerText = "Patch&nbsp&ID%nbsp" + securityPatchID;
//document.getElementById("").innerText = ""
//document.getElementById("").innerText = ""
//document.getElementById("").innerText = ""
//document.getElementById("").innerText = ""
