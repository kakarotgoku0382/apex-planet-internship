function addTask() {
  const input = document.getElementById('todo-input');
  const task = input.value.trim();
  if (!task) return;

  const li = document.createElement('li');
  li.textContent = task;

  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.onclick = () => li.remove();
  li.appendChild(delBtn);

  document.getElementById('todo-list').appendChild(li);
  input.value = '';
}

let total = 0;

function addToCart(product, price, qtyId) {
  const qtyInput = document.getElementById(qtyId);
  if (!qtyInput) {
    alert('Quantity input not found!');
    return;
  }

  const qty = parseInt(qtyInput.value);

  if (isNaN(qty) || qty <= 0) {
    alert('Please enter a valid quantity');
    return;
  }

  const cost = qty * price;
  const li = document.createElement('li');
  li.textContent = `${product} × ${qty} = ₹${cost}`;
  document.getElementById('cart-list').appendChild(li);

  total += cost;
  document.getElementById('cart-total').textContent = `Total: ₹${total}`;
}