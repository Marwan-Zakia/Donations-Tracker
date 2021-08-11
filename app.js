'use strict';
function Donation(Name, Amount) {
  this.Name = Name;
  this.Amount = Amount;
  this.age = this.Random(20, 60);
  Donation.all.push(this);
}
Donation.all = []
Donation.prototype.Random = function (max, min) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};
let thArray = ['Donator name', 'Donation Amount', 'Donation Age'];
function makeTablehead() {
  let theTable = document.getElementById('table');
  let trh = document.createElement('tr');
  theTable.appendChild(trh);
  for (let i = 0; i < thArray.length; i++) {

    let th = document.createElement('th');
    theTable.appendChild(th);
    th.textContent = thArray[i];
  }





} makeTablehead();

let theForm = document.getElementById('form');
theForm.addEventListener('submit', eventHandler);
function eventHandler(e) {
  e.preventDefault()
  let Name = e.target.name.value;
  let Amount = e.target.amount.value;
  let newFormdata = new Donation(Name, Amount);
  newFormdata.render()

}
let theTable = document.getElementById('table');
Donation.prototype.render = function () {
  while (theTable.rows.length > 0) {
    theTable.deleteRow(0);
  }
  for (let i = 0; i < Donation.all.length; i++) {
    let tr = document.createElement('tr');
    theTable.appendChild(tr);
    let tdName = document.createElement('td');
    tr.appendChild(tdName);
    tdName.textContent = Donation.all[i].Name;
    let tdAmount = document.createElement('td');
    tr.appendChild(tdAmount);
    tdAmount.textContent = Donation.all[i].Amount;
    let tdage = document.createElement('td');
    tr.appendChild(tdage);
    tdage.textContent = Donation.all[i].age;

  }


  localStorage.setItem('donations', JSON.stringify(Donation.all));

}

function getData() {
  let Data = JSON.parse(localStorage.getItem('donations'));
  if (Data) {
    for (let i = 0; i < Data.length; i++) {
      let newLS = new Donation(Data[i].Name, Data[i].Amount, Data[i].age);
      newLS.render()
    }
  }

} getData()

let clearbutton = document.getElementById('clearall');
clearbutton.addEventListener('click', clearAll);
function clearAll() {
  localStorage.clear();
  theTable.innerHTML = '';

}
