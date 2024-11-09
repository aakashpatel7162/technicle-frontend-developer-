let selectedItems = [];
let itemCount = { 1: 0, 2: 0, 3: 0 }; 

document.addEventListener("DOMContentLoaded", function () {
  const boxes = document.querySelectorAll(".options");
  boxes.forEach(function (box) {
    box.style.display = "none";
  });
  updateTotalPrice();
});

function toggleBox(selectedBoxNumber) {
    const boxNumbers = [1, 2, 3];
  
    boxNumbers.forEach((boxNumber) => {
      const options = document.getElementById(`options${boxNumber}`);
      const box = document.getElementById(`box${boxNumber}`);
  
      if (
        boxNumber === selectedBoxNumber &&
        document.getElementById(`radio${boxNumber}`).checked
      ) {
        box.classList.add("selected");
        options.style.display = "block";
      } else {
        box.classList.remove("selected");
        options.style.display = "none";
      }
    });
  }
  

function addItem(boxNumber) {
  const size = document.getElementById(`size${boxNumber}`).value;
  const color = document.getElementById(`color${boxNumber}`).value;

  if (size && color) {
    const price = getPrice(boxNumber);
    selectedItems.push({ size, color, price });
    itemCount[boxNumber]++;

    document.getElementById(`total-items-box${boxNumber}`).innerText =
      itemCount[boxNumber];
    updateTotalPrice();
  }
}

function addAnotherItem(boxNumber) {
  const optionsDiv = document.getElementById(`options${boxNumber}`);
  const itemCountForBox = itemCount[boxNumber];

  const newItemSelectors = document.createElement("div");
  newItemSelectors.classList.add("item-selector");
  newItemSelectors.innerHTML = `
    <div class="input-row">
      <select id="size${boxNumber}-${itemCountForBox}">
        <option value="">Choose Size</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
      </select>

      <select id="color${boxNumber}-${itemCountForBox}">
        <option value="">Choose Color</option>
        <option value="Red">Red</option>
        <option value="Blue">Blue</option>
        <option value="Green">Green</option>
      </select>

      <button onclick="addItem(${boxNumber})" class="add-item-btn">Add this Item</button>
    </div>
  `;
  optionsDiv.appendChild(newItemSelectors);
}

function getPrice(boxNumber) {
  switch (boxNumber) {
    case 1:
      return 40;
    case 2:
      return 50;
    case 3:
      return 60;
    default:
      return 0;
  }
}


function updateTotalPrice() {
  let totalPrice = 0;
  let totalItems = 0;

  selectedItems.forEach((item) => {
    totalPrice += item.price;
    totalItems++;
  });

  document.getElementById("total-amount").innerText = totalPrice;
  document.getElementById("total-items").innerText = totalItems;
}

function showTotalInfo() {
  const totalPrice = document.getElementById("total-amount").innerText;
  const totalItems = document.getElementById("total-items").innerText;

  alert(`Total Items: ${totalItems}\nTotal Price: $${totalPrice}`);
}
