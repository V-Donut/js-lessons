'use strict';

let title;
let screens;
let screenPrice;
let adaptive;
let rollback = 25;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let service1;
let service2;

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

const getUserAnswer = function (message, numb, check) {
    let n;
    do {
        n = prompt(message, numb);
    } while(!check(n));
    return n.trim();
};

const asking = function () {
  title = getUserAnswer('Как называется ваш проект?', 'Калькулятор верстки', isString);
  screens = getUserAnswer('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные', isString);
  screenPrice = +getUserAnswer('Сколько будет стоить данная работа?', '15000', isNumber);
  adaptive = confirm('Нужен ли адаптив на сайте?');
};

const getAllServicePrices = function () {
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      service1 = getUserAnswer('Какой дополнительный тип услуги нужен?', 'Метрика', isString);
    } else if (i === 1) {
      service2 = getUserAnswer('Какой дополнительный тип услуги нужен?', 'Отправка форм', isString);
    }
    sum += +getUserAnswer('Сколько это будет стоить?', '1000', isNumber);
  }

  return sum;
};

function getFullPrice() {
  return parseFloat(screenPrice) + allServicePrices;
}

function getTitle() {
  title = title.trim();
  if (!title) {
    return title;
  }
  title = title.charAt(0).toUpperCase() + title.toLowerCase().slice(1);
  return title;
}

const getServicePercentPrices = function () {
  let rollbackSum = fullPrice * (rollback / 100);
  return Math.ceil(fullPrice - rollbackSum);
};

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getRollbackMessage = function () {
  if (fullPrice >= 30000) {
    return 'Даем скидку в 10%';
  } else if (fullPrice >= 15000 && fullPrice < 30000) {
    return 'Даем скидку в 5%';
  } else if (fullPrice >= 0 && fullPrice < 15000) {
    return 'Скидка не предусмотрена';
  } else {
    return 'Что-то пошло не так';
  }
};

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();
title = getTitle();

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

screens = screens.toLowerCase();
console.log(screens);

console.log(getRollbackMessage());
console.log(servicePercentPrice);
