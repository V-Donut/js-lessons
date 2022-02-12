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

const appData = {
  title: '',
  screens: [],
  screenCount: 0,
  screenPrice: 0,
  adaptive: true,
  rollback: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  hasCalculation: false,
   
  init: function () {
    appData.addTitle();
    calculation.addEventListener('click', appData.start);
    screenPlus.addEventListener('click', appData.addScreenBlock);
    range.addEventListener('input', function (event) {
      appData.changeRollback(event);
    });
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  start: function () {
    if (!appData.validateScreens()) {
      return;
    }
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    //appData.logger();
    appData.showResult();
    appData.hasCalculation = true;
  },
  changeRollback: function (event) {
    let percentage = event.target.value;
    rangeValue.textContent = percentage + '%';
    appData.rollback = percentage;
    if (appData.hasCalculation) {
      appData.addPrices();
      appData.showResult();
    }
  },
  showResult: function () {
    total.value = appData.screenPrice;
    totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount.value = appData.fullPrice;
    totalCountRollback.value = appData.servicePercentPrice;
    totalCount.value = appData.screenCount;
  },
  validateScreens: function () {
    screens = document.querySelectorAll('.screen');
    let result = true;
    screens.forEach(function (screen, index) {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      if (!select.value || !input.value) {
        result = false;
      }
    });
    return result;
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
        price: +select.value * +input.value,
        count: +input.value
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
    appData.screenCount = appData.screens.reduce(function(count, item) {
      count += +item.count;
      return count;
    }, 0);

    appData.servicePricesNumber = 0;
    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }
    appData.servicePricesPercent = 0;
    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
    }
    appData.fullPrice = appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber;

    let rollbackSum = appData.fullPrice * (appData.rollback / 100);
    appData.servicePercentPrice = Math.ceil(appData.fullPrice - rollbackSum);
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
