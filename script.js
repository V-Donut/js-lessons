'use strict';

const appData = {
  title: '',
  screens: '',
  screenPrice: 0,
  adaptive: true,
  rollback: 25,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  service1: '',
  service2: '',
  start: function () {
    appData.asking();
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice();
    appData.servicePercentPrice = appData.getServicePercentPrices();
    appData.title = appData.getTitle();
    appData.logger();
  },
  logger: function () {
    for (let key in appData) {
      if (typeof appData[key] === 'function') {
        console.log('Метод: ' + key);
      } else {
        console.log('Ключ: ' + key);
      } 
    }
  },
  asking: function () {
    appData.title = appData.getUserAnswer('Как называется ваш проект?', 'Калькулятор верстки', appData.isString);
    appData.screens = appData.getUserAnswer('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные', appData.isString);
    appData.screenPrice = +appData.getUserAnswer('Сколько будет стоить данная работа?', '15000', appData.isNumber);
    appData.adaptive = confirm('Нужен ли адаптив на сайте?');
  },
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num) && num.toString().indexOf(' ') === -1;
  },
  isString: function (str) {
    if (!!!parseInt(str) == false || str == null) {
      return false;
    } else {
      return str.trim();
    }
  },
  getUserAnswer: function (message, numb, check) {
    let n;
    do {
        n = prompt(message, numb);
    } while(!check(n));
    return n.trim();
  },
  getAllServicePrices: function () {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        appData.service1 = appData.getUserAnswer('Какой дополнительный тип услуги нужен?', 'Метрика', appData.isString);
      } else if (i === 1) {
        appData.service2 = appData.getUserAnswer('Какой дополнительный тип услуги нужен?', 'Отправка форм', appData.isString);
      }
      sum += +appData.getUserAnswer('Сколько это будет стоить?', '1000', appData.isNumber);
    }
    return sum;
  },
  getFullPrice: function () {
    return parseFloat(appData.screenPrice) + appData.allServicePrices;
  },
  getTitle: function () {
    appData.title = appData.title.trim();
    if (!appData.title) {
      return appData.title;
    }
    appData.title = appData.title.charAt(0).toUpperCase() + appData.title.toLowerCase().slice(1);
    return appData.title;
  },
  getServicePercentPrices: function () {
    let rollbackSum = appData.fullPrice * (appData.rollback / 100);
    return Math.ceil(appData.fullPrice - rollbackSum);
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
  }
};

appData.start();
