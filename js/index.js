// Imports
import bill from "./bill.js";
import cache from './cache.js';

// UI Controls
const selectAllRecordsUI = document.querySelector("#select-all-records > input");
const addRecordUI = document.querySelector("#add-medicine-record-btn");
const deleteRecordsUI = document.getElementById("delete-medicine-record-btn");
const calculateUI = document.getElementById("calculate-bill-btn");
const saveChangesUI = document.querySelector("#save-changes-btn");
const deleteCacheUI = document.querySelector("#delete-cache-btn");
const saveFileUI = document.querySelector("#save-file-btn");

// Add funtionality to each UI controls
selectAllRecordsUI.addEventListener("click", bill.selectAll);
addRecordUI.addEventListener("click", bill.addNewEntry);
deleteRecordsUI.addEventListener("click", bill.deleteSelected);
calculateUI.addEventListener("click", bill.calculate);
saveChangesUI.addEventListener("click", cache.saveChanges);
deleteCacheUI.addEventListener("click", cache.deleteCache);
saveFileUI.addEventListener("click", bill.saveFile);

// Load data from either cache or data file on server.
bill.loadData();

// Load font file once html and css has rendered successfully.
window.addEventListener("load", function () {
  const fonts = document.createElement("link");
  fonts.href = "../css/fonts.css";
  fonts.rel = "stylesheet";
  fonts.type = "text/css";
  document.body.appendChild(fonts);
});
