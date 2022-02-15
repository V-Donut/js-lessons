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
    this.addTitle();
    calculation.addEventListener('click', () => this.start());
    reset.addEventListener('click', () => this.reset());
    screenPlus.addEventListener('click', this.addScreenBlock);
    range.addEventListener('input', (event) => {
      this.changeRollback(event);
    });
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  start: function () {
    if (!this.validateScreens()) {
      return;
    }
    this.addScreens();
    this.addServices();
    this.addPrices();
    this.showResult();
    this.hasCalculation = true;
    this.disableFields();
    this.showReset();
    //this.logger();
  },
  disableFields: function () {
    screens = document.querySelectorAll('.screen');
    screens.forEach((screen) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      select.setAttribute('disabled', true);
      input.setAttribute('disabled', true);
    });
  },
  showReset: function () {
    calculation.style.display = 'none';
    reset.style.display = 'block';
  },
  reset: function () {
    this.removeScreenBlock();
    this.removeServices();
    this.removePrices();
    this.resetRollback();
    this.resetResult();
    this.hasCalculation = false;
    this.enableFields();
    this.hideReset();
  },
  changeRollback: function (event) {
    let percentage = event.target.value;
    rangeValue.textContent = percentage + '%';
    this.rollback = percentage;
    if (this.hasCalculation) {
      this.addPrices();
      this.showResult();
    }
  },
  showResult: function () {
    total.value = this.screenPrice;
    totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
    fullTotalCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
    totalCount.value = this.screenCount;
  },
  validateScreens: function () {
    screens = document.querySelectorAll('.screen');
    let result = true;
    screens.forEach((screen) => {
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
    screens.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;
      this.screens.push({ 
        id: index, 
        name: selectName, 
        price: +select.value * +input.value,
        count: +input.value
      });
    });
  },
  addServices: function () {
    percentItems.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });

    numberItems.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');
      
      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  addScreenBlock: function () {
    screens = document.querySelectorAll('.screen');
    const cloneScreen = screens[0].cloneNode(true);
    const input = cloneScreen.querySelector('input');
    input.value = '';
    screens[screens.length - 1].after(cloneScreen);
  },
  addPrices: function () {
    this.screenPrice = this.screens.reduce((sum, item) => {
      sum += +item.price;
      return sum;
    }, 0);
    this.screenCount = this.screens.reduce((count, item) => {
      count += +item.count;
      return count;
    }, 0);

    this.servicePricesNumber = 0;
    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }
    this.servicePricesPercent = 0;
    for (let key in this.servicesPercent) {
      this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
    }
    this.fullPrice = this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;

    let rollbackSum = this.fullPrice * (this.rollback / 100);
    this.servicePercentPrice = Math.ceil(this.fullPrice - rollbackSum);
  },
  removeScreenBlock: function () {
    screens = document.querySelectorAll('.screen');
    const input = screens[0].querySelector('input');
    input.value = '';
    const select = screens[0].querySelector('select');
    select.value = '';
    screens.forEach(function (item, key) {
      if (key !== 0) {
        screens[key].remove();
      }
    });
  },
  removeServices: function () {
    percentItems.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      check.checked = false;
    });
    this.servicesPercent = {};

    numberItems.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      check.checked = false;
    });
    this.servicesNumber = {};
  },
  removePrices: function () {
    this.screenPrice = 0;
    this.screenCount = 0;
    this.servicePricesNumber = 0;
    this.servicePricesPercent = 0;
    this.fullPrice = 0;
    this.rollback = 0;
    this.servicePercentPrice = 0;
  },
  resetRollback: function () {
    range.value = 0;
    rangeValue.textContent = 0 + '%';
  },
  resetResult: function () {
    total.value = 0;
    totalCountOther.value = 0;
    fullTotalCount.value = 0;
    totalCountRollback.value = 0;
    totalCount.value = 0;
  },
  hideReset: function () { 
    calculation.style.display = 'block';
    reset.style.display = 'none';
  },
  enableFields: function () {
    screens = document.querySelectorAll('.screen');
    screens.forEach((screen) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      select.removeAttribute('disabled');
      input.removeAttribute('disabled');
    });
  },
  logger: function () {
    for (let key in this) {
      if (typeof this[key] === 'function') {
        console.log('Метод: ' + key);
      } else {
        console.log('Ключ: ' + key);
      } 
    }

    console.log(this.fullPrice);
    console.log(this.servicePercentPrice);
    console.log(this.screens);
  }
};

appData.init();
