"use strict";
const balanceEl = document.getElementById("current-balance");
const descriptionBox = document.getElementById("transaction-box");
const amountBox = document.getElementById("transaction-amount-box");
const creditEl = document.getElementById("credit");
const debitEl = document.getElementById("debit");
const trans = document.getElementById("list-of-history");
const buttonEl = document.querySelector("#button");
// console.log(balanceEl, descriptionBox, amountBox, creditEl, debitEl);

//  functions
// initialize function

function init() {
  trans.innerHTML = "";
  transactions.forEach(transactionsDetails);
  // update function called
  update();
}

// Transactions function
function transactionsDetails(transaction) {
  // Transaction is an object,so transaction.amount is positive or negative values thats kept "+"" OR "-"
  const symbols = transaction.amount < 0 ? "-" : "+";
  // ELEMENTS Creations
  const item = document.createElement("li");
  item.classList.add(transaction.amount < 0 ? "expense" : "income");
  // innerHTML change
  item.innerHTML = `${transaction.description}
  <span>${symbols} ${Math.abs(transaction.amount)}</span>
  <button class="btn-delete" onclick="removeTransaction(${
    transaction.id
  })">𐤕</button>`;
  // Append the list items
  trans.appendChild(item);
}

// Remove elements with ID
function removeTransaction(id) {
  // console.log(id);
  // confirm message in condition
  if (confirm("You want to delete the transaction")) {
    // using filter method
    // transaction id is not matched which we give the id ,except the id's bring back then update the transactions variable
    transactions = transactions.filter((transaction) => transaction.id != id);
    // call the function init so,page is reload the remaining data's after the removing data
    init();
    updateLocalStorage();
  } else {
    return;
  }
}
function update() {
  // TOTAL BALANCE UPDATE
  const amounts = transactions.map((transaction) => transaction.amount);
  // Reduce method using total balance amount,here 0 is initial value
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  // update the innerHTML
  balanceEl.innerHTML = `₹ ${total}`;
  // UPDATE CREDIT BALANCE
  // filter the positive values and reduce the single value to accumulate
  const credit = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  // update the innerHTML
  creditEl.innerHTML = `₹ ${credit}`;
  // UPDATE DEBIT BALANCE
  const debit = amounts
    .filter((item) => item < 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  // update the innerHTML
  debitEl.innerHTML = `₹ ${debit}`;
}

function addTransaction(e) {
  e.preventDefault();
  if (descriptionBox.value.trim() == "" || amountBox.value.trim() == "") {
    alert("Invalid Data's");
  } else {
    const transaction = {
      id: uniqueId(),
      description: descriptionBox.value,
      // default input is always STRING SO, convert into the NUMBER
      amount: Number(amountBox.value),
    };
    transactions.push(transaction);
    // 92 line is goes to transactionsDetails function
    transactionsDetails(transaction);
    descriptionBox.value = "";
    amountBox.value = "";
    // update the new values
    update();
    // local storage called in a function
    updateLocalStorage();
  }
}
// unique id create
function uniqueId() {
  return Date.now();
}
buttonEl.addEventListener("click", addTransaction);
window.addEventListener("load", function () {
  // init function called
  init();
});

// Local Storage

function updateLocalStorage() {
  localStorage.setItem("trans", JSON.stringify(transactions));
}
const localStorageItems = JSON.parse(localStorage.getItem("trans"));
let transactions =
  localStorage.getItem("trans") !== null ? localStorageItems : [];
