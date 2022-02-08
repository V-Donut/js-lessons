'use strict';

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
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  services: {},
  start: function () {
    appData.asking();
    appData.addPrices();
    appData.getFullPrice();
    appData.getServicePercentPrices();
    appData.getTitle();
    appData.logger();
  },
  asking: function () {
    appData.title = appData.getUserAnswer('Как называется ваш проект?', 'Калькулятор верстки', isString);

    for (let i = 0; i < 2; i++) {
      let name = appData.getUserAnswer('Какие типы экранов нужно разработать?', '', isString);
      let price = appData.getUserAnswer('Сколько будет стоить данная работа?', '', isNumber);
      appData.screens.push({ id: i, name: name, price: price });
    }

    for (let i = 0; i < 2; i++) {
      let name = appData.getUserAnswer('Какой дополнительный тип услуги нужен?', '', isString);
      let price = appData.getUserAnswer('Сколько это будет стоить?', '', isNumber);
      appData.services[name + '_' + i] = +price;
    }

    appData.adaptive = confirm('Нужен ли адаптив на сайте?');
  },
  addPrices: function () {
    appData.screenPrice = appData.screens.reduce(function(sum, item) {
      sum += +item.price;
      return sum;
    }, 0);

    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },
  getUserAnswer: function (message, numb, check) {
    let n;
    do {
        n = prompt(message, numb);
    } while (!check(n));
    return n.trim();
  },
  getFullPrice: function () {
    appData.fullPrice = parseFloat(appData.screenPrice) + appData.allServicePrices;
  },
  getTitle: function () {
    appData.title = appData.title.trim();
    if (!appData.title) {
      return;
    }
    appData.title = appData.title.charAt(0).toUpperCase() + appData.title.toLowerCase().slice(1);
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

appData.start();
