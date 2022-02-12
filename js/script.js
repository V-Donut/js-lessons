'use strict';

const title = document.getElementsByTagName('h1')[0];
const calculation = document.getElementsByClassName('handler_btn')[0];
const reset = document.getElementsByClassName('handler_btn')[1];
const screenPlus = document.querySelector('.screen-btn');

const percentItems = document.querySelectorAll('.other-items.percent');
const numberItems = document.querySelectorAll('.other-items.number');

const range = document.querySelector('.rollback [type="range"]');
const rangeValue = document.querySelector('.rollback .range-value');

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num) && num.toString().indexOf(' ') === -1;
};

const isString = function (str) {
  if (!!!parseInt(str) == false || str == null) {
    return false;
  } else {
    return str.trim();
  }
};

const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 25,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  init: function () {
    appData.addTitle();
    calculation.addEventListener('click', appData.start);
    screenPlus.addEventListener('click', appData.addScreenBlock);
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  start: function () {
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    //appData.getServicePercentPrices();
    //appData.logger();
    appData.showResult();
  },
  showResult: function () {
    total.value = appData.screenPrice;
    totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount.value = appData.fullPrice;

  },
  addScreens: function () {
    screens = document.querySelectorAll('.screen');

    screens.forEach(function (screen, index) {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;
      appData.screens.push({ 
        id: index, 
        name:selectName, 
        price: +select.value * +input.value 
      });
    });
  },
  addServices: function () {
    percentItems.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    numberItems.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');
      
      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
  },
  addPrices: function () {
    appData.screenPrice = appData.screens.reduce(function(sum, item) {
      sum += +item.price;
      return sum;
    }, 0);

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }
    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
    }
    appData.fullPrice = appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber;
  },
  getUserAnswer: function (message, numb, check) {
    let n;
    do {
        n = prompt(message, numb);
    } while (!check(n));
    return n.trim();
  },
  getServicePercentPrices: function () {
    let rollbackSum = appData.fullPrice * (appData.rollback / 100);
    appData.servicePercentPrice = Math.ceil(appData.fullPrice - rollbackSum);
  },
  getRollbackMessage: function (price) {
    if (price >= 30000) {
      return 'Даем скидку в 10%';
    } else if (price >= 15000 && price < 30000) {
      return 'Даем скидку в 5%';
    } else if (price >= 0 && price < 15000) {
      return 'Скидка не предусмотрена';
    } else {
      return 'Что-то пошло не так';
    }
  },
  logger: function () {
    for (let key in appData) {
      if (typeof appData[key] === 'function') {
        console.log('Метод: ' + key);
      } else {
        console.log('Ключ: ' + key);
      } 
    }

    // console.log(appData.fullPrice);
    // console.log(appData.servicePercentPrice);
    // console.log(appData.screens);
    // console.log(appData.services);
  }
};

appData.init();
