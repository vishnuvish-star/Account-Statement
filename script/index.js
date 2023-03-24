"use strict";
const inputBoxEl = document.getElementById("transaction-box");
const amountEl = document.getElementById("transaction-amount-box");
const buttonEl = document.getElementById("button");
let historyEl = document.getElementById("history");
let creditEl = document.getElementById("aaa");
let debitEl = document.getElementById("debit");
// console.log(historyEl);

// console.log(inputBoxEl, amountEl, buttonEl);
// event
buttonEl.addEventListener("click", () => {
  const inputBoxValue = inputBoxEl.value;
  const amountValue = amountEl.value;
  // console.log(inputBoxValue, amountValue);
  if (amountValue > 0) {
    console.log((creditEl = `${amountValue}`));
  } else {
    console.log((debitEl = `${amountValue}`));
  }
  let newHistory = document.createElement("p");
  newHistory.className = "history-list";
  newHistory.innerHTML = `<small class="list">${inputBoxValue}</small>
  <small class="list">${amountValue}</small>`;
  historyEl.appendChild(newHistory);
  // console.log(historyEl);
});
