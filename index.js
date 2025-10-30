import { menuArray } from './data.js';

const orderDiv = document.getElementById('order');
const messageDiv = document.getElementById('message');
const paymentModal = document.getElementById('paymentModal');
const paymentForm = document.getElementById('payment-form');

let orderArray = [];

function getMenuHtml(){
    let menuHtml = ``
    
    menuArray.forEach(function(item){
      menuHtml += `
  <div class="item">
    <span class="item-emoji">${item.emoji}</span>
    <div class="item-details">
      <h3 class="item-name">${item.name}</h3>
      <p class="item-ingredients">${item.ingredients.join(', ')}</p>
      <p class="item-price">$${item.price}</p>
    </div> 
    <button class="item-add-btn" data-id="${item.id}">&times;</button> 
  </div>
    `;
  }) 
  return menuHtml;
}

function addToOrder(id) {
  const targetItem = menuArray.find(item => item.id == id);
  orderArray.push(targetItem)
}

function removeFromOrder(id) {
  const indexToDelete = orderArray.findIndex((item) => item.id == id);
  orderArray.splice(indexToDelete, 1);
}

function getOrderHtml() {
  let orderTotal = 0;
  orderDiv.innerHTML = '';
  
  if (orderArray.length > 0) {
    let orderHtml = `
    <h3 class="order-title">Your order</h3>
    `
    orderArray.forEach(function(item){
    
      orderHtml += `
      <div class="order-details">
        <h3 class="order-item-name">${item.name}</h3>
        <button class="item-remove-btn" data-id="${item.id}">Remove</button>
        <p class="order-item-price">$${item.price}</p>
      </div> 
      `;
    }) 
    const orderTotal = orderArray.reduce((accumulator, item) => {
      return accumulator + item.price;
    }, 0);
    orderHtml += `
    <div class="order-total">
      <h3 class="order-total-label">Total price:</h3>
      <p class="order-total-price">$ ${orderTotal}</p>
    </div> 
    <button class="complete-order-btn">Complete order</button>
    `;
  orderDiv.innerHTML += orderHtml;
  }
}

function renderMessage(name) {
	messageDiv.innerHTML += 
      `<p class="message">Thanks, ${name}! Your order is on its way!</p>`;
}

function processPaymentForm() {
  paymentForm.addEventListener('submit', (e) => {
    e.preventDefault;
    const paymentFormData = new FormData(paymentForm);
    const name = paymentFormData.get('payee-name');
    paymentModal.style.display = 'none';
    renderMessage(name);
  }) 
}

function renderMenu() {
	document.getElementById('menu').innerHTML = getMenuHtml();
}

renderMenu();

// Events
document.querySelectorAll('.item-add-btn').forEach((btn) => {
	btn.addEventListener('click', (e) => {
		const id = btn.dataset.id;
		addToOrder(id);
		getOrderHtml();
	});
});

document.getElementById('order').addEventListener('click', (e) => {
	if (e.target.classList.contains('item-remove-btn')) {
    const id = e.target.dataset.id;
		removeFromOrder(id);
    getOrderHtml();
	} else if (e.target.classList.contains('complete-order-btn')) {
		paymentModal.style.display = 'block';
	} 
});

document.getElementById('paymentModal').addEventListener('click', () => {
  processPaymentForm();
});

