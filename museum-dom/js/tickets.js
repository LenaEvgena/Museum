//booking popup
const buyButton = document.querySelector('.tickets__button');
const overlay = document.querySelector('.overlay');
const bookCard = document.querySelector('.book__popup');
const closeButton = document.querySelector('.book_closing');

buyButton.addEventListener('click', () => {
  openBookCard();
});

overlay.addEventListener('click', (e) => {
  const isClickInside = bookCard.contains(e.target);
  if (isClickInside) {
    return;
  } else {
    removeActiveClasses();
  }
});

closeButton.addEventListener('click', () => {
  removeActiveClasses();
});

function openBookCard() {
  bookCard.classList.add('open');
  overlay.classList.add('active');
}

function removeActiveClasses() {
  bookCard.classList.remove('open');
  overlay.classList.remove('active');
}


//кол-во билетов
//tickets
const basicMinus = document.querySelectorAll('.basic_minus-func');
const basicPlus = document.querySelectorAll('.basic_plus-func');
const basicCount = document.querySelectorAll('.basic_count-func');
const seniorMinus = document.querySelectorAll('.senior_minus-func');
const seniorPlus = document.querySelectorAll('.senior_plus-func');
const seniorCount = document.querySelectorAll('.senior_count-func');
const radioInputs = document.querySelectorAll('.radio');
const ticketsTotalPrice = document.querySelectorAll('.tickets__total-func');
//booking
const formTicketType = document.querySelector('.type_form-func');
const basicEntryPrice = document.querySelectorAll('.basic-price_form-func');
const basicEntryTotal = document.querySelector('.basic-total_form-func');
const seniorEntryPrice = document.querySelectorAll('.senior-price_form-func');
const seniorEntryTotal = document.querySelector('.senior-total_form-func');
const basicEntryCount = document.querySelector('.basic-count_form-func');
const seniorEntryCount = document.querySelector('.senior-count_form-func');
const select = document.querySelector('.selections');

let ticketType, basicTicketAmount, seniorTicketAmount, totalPrice;

checkData();
function checkData() {
  if (localStorage.ticketType) {
    ticketType = localStorage.getItem('ticketType');
    document.getElementById(`${ticketType}`).setAttribute('checked', 'checked');
  } else {
    ticketType = null || 'permanent';
    localStorage.setItem('ticketType', 'permanent');
  }

  if (localStorage.basicTicketAmount) {
    basicTicketAmount = +localStorage.getItem('basicTicketAmount');
    basicCount.forEach(item => {
      item.value = basicTicketAmount;
    });
  } else {
    basicTicketAmount = 0;
    localStorage.setItem('basicTicketAmount', basicTicketAmount);
  }

  if (localStorage.seniorTicketAmount) {
    seniorTicketAmount = +localStorage.getItem('seniorTicketAmount');
    seniorCount.forEach(item => {
      item.value = seniorTicketAmount;
    });
  } else {
    seniorTicketAmount = 0;
    localStorage.setItem('seniorTicketAmount', seniorTicketAmount);
  }

  if (localStorage.totalPrice) {
    totalPrice = +localStorage.getItem('totalPrice');
    ticketsTotalPrice.forEach(item => {
      item.innerText = totalPrice;
    });
  } else {
    totalPrice = 0;
    localStorage.setItem('totalPrice', totalPrice);
  }
}

function setPlusBasicTicketCount(button) {
  if (basicTicketAmount >= 20) return;
  basicTicketAmount++;
  button.forEach(item => {
    item.value = basicTicketAmount;
  });
  localStorage.setItem('basicTicketAmount', basicTicketAmount);
}
function setMinusBasicTicketCount(button) {
  if (basicTicketAmount <= 0) return;
  basicTicketAmount--;
  button.forEach(item => {
    item.value = basicTicketAmount;
  });
  localStorage.setItem('basicTicketAmount', basicTicketAmount);
}
function setPlusSeniorTicketCount(button) {
  if (seniorTicketAmount >= 20) return;
  seniorTicketAmount++;
  button.forEach(item => {
    item.value = seniorTicketAmount;
  });
  localStorage.setItem('seniorTicketAmount', seniorTicketAmount);
}
function setMinusSeniorTicketCount(button) {
  if (seniorTicketAmount <= 0) return;
  seniorTicketAmount--;
  button.forEach(item => {
    item.value = seniorTicketAmount;
  });
  localStorage.setItem('seniorTicketAmount', seniorTicketAmount);
}

function totalTicketsCount(type) {
  let totalPrice = 0 || +localStorage.getItem('totalPrice');
  let permanentBasicPrice = 20;
  let temporaryBasicPrice = 25;
  let combinedBasicPrice = 40;
  let permanentSeniorPrice = 10;
  let temporarySeniorPrice = 12.5;
  let combinedSeniorPrice = 20;

  basicEntryCount.innerText = basicTicketAmount;
  seniorEntryCount.innerText = seniorTicketAmount;

  switch (type) {
    case 'permanent':
      formTicketType.innerHTML = 'Permanent exhibition';
      basicEntryPrice.forEach(item => {
        item.innerText = permanentBasicPrice;
      });
      basicEntryTotal.innerText = permanentBasicPrice * basicTicketAmount;
      seniorEntryPrice.forEach(item => {
        item.innerText = permanentSeniorPrice;
      });
      seniorEntryTotal.innerText = permanentSeniorPrice * seniorTicketAmount;
      document.querySelector('.select_permanent').setAttribute('selected', 'selected');
      totalPrice = permanentBasicPrice * basicTicketAmount + permanentSeniorPrice * seniorTicketAmount;
      break;
    case 'temporary':
      formTicketType.innerHTML = 'Temporary exhibition';
      basicEntryPrice.forEach(item => {
        item.innerText = temporaryBasicPrice;
      });
      basicEntryTotal.innerText = temporaryBasicPrice * basicTicketAmount;
      seniorEntryPrice.forEach(item => {
        item.innerText = temporarySeniorPrice;
      });
      seniorEntryTotal.innerText = temporarySeniorPrice * seniorTicketAmount;
      document.querySelector('.select_temporary').setAttribute('selected', 'selected');
      totalPrice = temporaryBasicPrice * basicTicketAmount + temporarySeniorPrice * seniorTicketAmount;
      break;
    case 'combined':
      formTicketType.innerHTML = 'Combined Admission';
      basicEntryPrice.forEach(item => {
        item.innerText = combinedBasicPrice;
      });
      basicEntryTotal.innerText = combinedBasicPrice * basicTicketAmount;
      seniorEntryPrice.forEach(item => {
        item.innerText = combinedSeniorPrice;
      });
      seniorEntryTotal.innerText = combinedSeniorPrice * seniorTicketAmount;
      document.querySelector('.select_combined').setAttribute('selected', 'selected');
      totalPrice = combinedBasicPrice * basicTicketAmount + combinedSeniorPrice * seniorTicketAmount;
      break;
  }
  localStorage.setItem('totalPrice', totalPrice);
  ticketsTotalPrice.forEach(item => {
    item.innerText = totalPrice;
  });
}

basicPlus.forEach(item => {
  item.addEventListener('click', () => {
    setPlusBasicTicketCount(basicCount);
  });
});
basicMinus.forEach(item => {
  item.addEventListener('click', () => {
    setMinusBasicTicketCount(basicCount);
  });
});
seniorPlus.forEach(item => {
  item.addEventListener('click', () => {
    setPlusSeniorTicketCount(seniorCount);
  });
});
seniorMinus.forEach(item => {
  item.addEventListener('click', () => {
    setMinusSeniorTicketCount(seniorCount);
  });
});

radioInputs.forEach(radioInput => {
  radioInput.addEventListener('click', () => {
    ticketType = radioInput.value;
    localStorage.setItem('ticketType', ticketType);
  });
});
select.addEventListener('click', () => {
    ticketType = select.value;
    localStorage.setItem('ticketType', ticketType);
  });

document.querySelector('.tickets__form').addEventListener('click', () => {
  totalTicketsCount(ticketType);
})
document.querySelector('.book__popup').addEventListener('click', () => {
  totalTicketsCount(ticketType);
})


//дата и время
const dateText = document.querySelector('.date_text');
const dateInput = document.querySelector('.input_date');
const date = document.querySelector('.date');
const timeText = document.querySelector('.time_text');
const timeInput = document.querySelector('.input_time');
const timeOption = document.querySelector('.time_select');
const dayForm = document.querySelector('.date_form-func');
const timeForm = document.querySelector('.time_form-func');

dateInput.addEventListener('click', () => {
  dateText.style.display = 'none';
  dateInput.classList.add('shown');
});
dateInput.addEventListener('input', () => {
  let options = {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  };
  let selectedDate = new Date(dateInput.value);
  dayForm.innerText = selectedDate.toLocaleString("en-US", options);
});

timeInput.addEventListener('click', () => {
  timeText.style.display = 'none';
  timeInput.classList.add('shown');
});
timeInput.addEventListener('input', () => {
  // timeForm.innerText = timeInput.value;
  timeForm.innerText = timeOption.value;
});

let today = new Date();
let curr_date = today.getDate();
let curr_month = today.getMonth() + 1;
let curr_year = today.getFullYear();
if (curr_date.toString().split('').length === 1) {
  curr_date = `0${curr_date}`;
}
dateInput.setAttribute('min', `${curr_year}-${curr_month}-${curr_date}`);


//валидация формы
const nameField = document.querySelector('.name_li');
const emailField = document.querySelector('.email_li');
const phoneField = document.querySelector('.phone_li');
const nameInput = document.querySelector('.name_field');
const emailInput = document.querySelector('.email_field');
const phoneInput = document.querySelector('.phone_field');

function checkName() {
  let nameRegexp = /^[a-zа-я\s]{3,15}$/gi;
  if (nameRegexp.test(nameInput.value)) {
    nameField.style.borderColor = 'black';
  } else {
    nameField.style.borderColor = 'red';
    nameInput.value = "Некорректный формат имени!";
  }
}
function checkEmail() {
  let emailRegexp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
  if (emailRegexp.test(emailInput.value)) {
    emailField.style.borderColor = 'black';
  } else {
    emailField.style.borderColor = 'red';
    emailInput.value = "Некорректный формат email!";
  }
}
function checkPhone() {
  let phoneRegexp = /^(\d{2,3})?[- ]?(\d{2,3})?[- ]?(\d{2,3})?[- ]?(\d{2,3})?$/gm;
  // let phoneRegexp = /^$/gm;
  if (phoneRegexp.test(phoneInput.value)) {
    phoneField.style.borderColor = 'black';
    return;
  } else {
    phoneField.style.borderColor = 'red';
    phoneInput.value = "Некорректный формат номера!";
  }
}

nameInput.addEventListener('change', checkName); // на все поля
emailInput.addEventListener('change', checkEmail); // на все поля
phoneInput.addEventListener('change', checkPhone); // на все поля
