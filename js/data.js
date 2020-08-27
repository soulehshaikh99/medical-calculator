function getName(record) {
  return record.querySelector(".name").innerHTML;
}

function getQuantity(record) {
  return parseInt(record.querySelector(".quantity").innerHTML);
}

function getPrice(record) {
  return parseFloat(record.querySelector(".price").innerHTML);
}

function getTotalPrice(quantity, price) {
  let totalPrice = quantity * price;
  totalPrice = totalPrice.toFixed(2);
  return parseFloat(totalPrice);
}

function getGrandTotal() {
  let data = getMedicineData();
  let grandTotal = 0;
  for (let i = 0; i < data.length; i++) {
    let quantity = data[i].quantity;
    let price = data[i].price;
    let totalPrice = getTotalPrice(quantity, price);
    grandTotal += totalPrice;
  }
  grandTotal = grandTotal.toFixed(2);
  grandTotal = parseFloat(grandTotal);
  return grandTotal;
}

function getDiscountedAmount(grandTotal) {
  let discountedAmount = grandTotal * 0.95;
  discountedAmount = Math.round(discountedAmount);
  return discountedAmount;
}

function getMedicineData() {
  const data = [];
  const records = document.querySelectorAll("tbody > tr > td > input");
  for (let i = 0; i < records.length; i++) {
    let record = records[i].parentElement.parentElement;
    let name = getName(record);
    let quantity = getQuantity(record);
    let price = getPrice(record);
    let totalPrice = getTotalPrice(quantity, price);
    data.push({
      name,
      quantity,
      price,
      totalPrice,
    });
  }
  return data;
}

export default {
  getMedicineData,
  getName,
  getQuantity,
  getTotalPrice,
  getGrandTotal,
  getDiscountedAmount,
};
