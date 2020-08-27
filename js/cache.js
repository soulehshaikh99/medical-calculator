import data from "./data.js";

function saveChanges() {
  let medData = data.getMedicineData();
  medData = JSON.stringify(medData);
  localStorage.setItem("med-table-records", medData);
}

function deleteCache() {
  localStorage.removeItem("med-table-records");
}

export default {
  saveChanges,
  deleteCache,
};
