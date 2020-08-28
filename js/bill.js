// Imports
import data from './data.js';
import constants from './constants.js'

// UI Controls
const tableRecordsUI = document.querySelector(
  "#medical-bill-calculator > tbody"
);
const selectAllRecordsUI = document.querySelector(
  "#select-all-records > input"
);
const grandTotalUI = document.querySelector("#grand-total");
const discountedAmountUI = document.querySelector("#discounted-amount");

function updateUI(ui, value) {
  ui.innerHTML = value;
}

function calculate() {
  let grandTotal = data.getGrandTotal();
  let discountedAmount = data.getDiscountedAmount(grandTotal);
  updateUI(grandTotalUI, grandTotal);
  updateUI(discountedAmountUI, discountedAmount);
}

function getSelectedRecords() {
  let records = document.querySelectorAll("tbody > tr > td > input");
  let selectedRecords = [];
  for (let i = 0; i < records.length; i++) {
    let record = records[i];
    if (record.checked) selectedRecords.push(record);
  }
  return selectedRecords;
}

function deleteSelected() {
  let selectedRecords = getSelectedRecords();
  for (let i = 0; i < selectedRecords.length; i++) {
    selectedRecords[i].parentElement.parentElement.remove();
  }
  selectedRecords = [];
  selectAllRecordsUI.checked = false;
}

function createNewRecord(name = "", quantity = "", price = "") {
  const record = document.createElement("tr");
  const checkboxField = document.createElement("td");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList = "checkbox";

  const nameField = document.createElement("td");
  nameField.classList = "name";
  nameField.contentEditable = true;
  nameField.innerHTML = name;

  const quantityField = document.createElement("td");
  quantityField.classList = "quantity";
  quantityField.contentEditable = true;
  quantityField.innerHTML = quantity;

  const priceField = document.createElement("td");
  priceField.classList = "price";
  priceField.contentEditable = true;
  priceField.innerHTML = price;

  const totalPriceField = document.createElement("td");
  totalPriceField.classList = "totalPrice";
  totalPriceField.innerHTML = data.getTotalPrice(quantity, price);

  checkboxField.appendChild(checkbox);
  record.appendChild(checkboxField);
  record.appendChild(nameField);
  record.appendChild(quantityField);
  record.appendChild(priceField);
  record.appendChild(totalPriceField);

  tableRecordsUI.appendChild(record);

  return record;
}

function addNewEntry() {
  const record = createNewRecord();
  const quantityField = record.querySelector(".quantity");
  const priceField = record.querySelector(".price");
  const totalPriceField = record.querySelector(".totalPrice");

  quantityField.addEventListener("input", () => {
    updateTableUI(quantityField, priceField, totalPriceField);
  });

  priceField.addEventListener("input", () => {
    updateTableUI(quantityField, priceField, totalPriceField);
  });
}

function selectAll() {
  let state = this.checked;
  const records = document.querySelectorAll("tbody > tr > td > input");
  for (let i = 0; i < records.length; i++) {
    records[i].checked = state;
  }
}

function saveFile() {
  let medData = data.getMedicineData();
  medData = JSON.stringify(medData, null, 2);
  let mimeType = "application/json;charset=utf-8";
  let blob = new Blob([medData], { type: mimeType });
  saveAs(blob, `med-table-records.json`);
}

function updateTableUI(quantityUI, priceUI, totalPriceUI) {
  let quantity = parseInt(quantityUI.innerHTML);
  let price = parseFloat(priceUI.innerHTML);
  let totalPrice = data.getTotalPrice(quantity, price);
  updateUI(totalPriceUI, totalPrice);
}

function getDataFromServer() {
  let data = '';
  let xhr = new XMLHttpRequest();
  xhr.open('GET', constants.DATA_URL, false);
  xhr.onload = function() {
    if(this.status === 200) {
      data = this.responseText;
    }
  }
  xhr.send();
  return data;
}

function loadData() {
  let data = localStorage.getItem("med-table-records");
  if (!data) data = getDataFromServer();
  data = JSON.parse(data);

  for (let i = 0; i < data.length; i++) {
    let name = data[i].name;
    let quantity = data[i].quantity;
    let price = data[i].price;
    let record = createNewRecord(name, quantity, price);
    const quantityField = record.querySelector(".quantity");
    const priceField = record.querySelector(".price");
    const totalPriceField = record.querySelector(".totalPrice");
    quantityField.addEventListener("input", () => {
      updateTableUI(quantityField, priceField, totalPriceField);
    });
    priceField.addEventListener("input", () => {
      updateTableUI(quantityField, priceField, totalPriceField);
    });
  }
}

export default {
  loadData,
  selectAll,
  addNewEntry,
  deleteSelected,
  calculate,
  saveFile,
};
