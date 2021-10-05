const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const transactionDate = document.getElementById('date');
const transactionCat = document.getElementById('category');
const addBtn = document.querySelector('.add-btn');
const clearAllBtn = document.querySelector('.btn-outline-danger');
const tBody = document.querySelector('tbody');
const tableRows = tBody.getElementsByTagName('tr');
const export_button = document.getElementById('export_button');


const DATA_COUNT = 7;
const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};

const data = {
  labels:  [
    'אוכל',
    'לימודים',
    'ביגוד',
    'בית'
  ],
  datasets: [
    {
      label: 'הכנסות',
      data: [65, 59, 80, 81],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
    },
    {
      label: 'הוצאות',
      data: [65, 59, 80, 80],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
    }
  ]
};

const config = {
  type: 'bar',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    }
  },
};

var myChart = new Chart(
  document.getElementById('myChart'),
  config
);

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('אנא מלאו את השדות');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
      date: transactionDate.value,
      category: transactionCat.value
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();
    updateTable();
    text.value = '';
    amount.value = '';
    transactionDate.value = '';
    transactionCat.value = '';

    
  }
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {


  updateTable();
  updateValues()
}

// Update the balance, income and expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = ` ${total} ש״ח`;
  money_plus.innerText = ` ${income} ש״ח`;
  money_minus.innerText = ` ${expense} ש״ח`;
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  updateLocalStorage();

  init();
}

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
function init() {
  list.innerHTML = '';

  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();


form.addEventListener('submit', addTransaction);


function updateTable() {
	const tableData = transactions
		.map((item) => {
      console.log(typeof item.amount)
			return `
    <tr class="${item.amount < 0 ? 'table-danger': 'table-success'}">
    <td><i class="fas fa-trash-alt" style="color: red" onclick="removeTransaction(${
      item.id
    })" ></i></td>
    <td>${item.category}</td>
    <td>${item.date}</td>
    <td>${item.amount} ש״ח</td>
    <td>${item.text}</td>
    </tr>
    `;
		})
		.join('');
    
  tBody.innerHTML = tableData;
  toggleDeleteBtn();
}

updateTable();


function toggleDeleteBtn() {
  for(let tr of tableRows){
    const deleteIcon = tr.querySelector('.fa-trash-alt');
    tr.addEventListener('mouseover', () => {
      deleteIcon.classList.add('showDeleteIcon');
    });
  
    tr.addEventListener('mouseleave', () => {
      deleteIcon.classList.remove('showDeleteIcon');
    });
  
    // deleteIcon.addEventListener('click', deleteItem);
  }
}

function html_table_to_excel(type)
    {
        let data = document.getElementById('tblData');

        let file = XLSX.utils.table_to_book(data, {sheet: "sheet1"});

        XLSX.write(file, { bookType: type, bookSST: true, type: 'base64' });

        XLSX.writeFile(file, 'file.' + type);
    }

export_button.addEventListener('click', () =>  {
    html_table_to_excel('xlsx');
});

// addBtn.addEventListener('click', addTransaction);

function sendEmail() {
  window.open('mailto:pbv.family@gmail.com');
}

