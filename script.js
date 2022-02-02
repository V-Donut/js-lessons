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
let servicePrice;

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {
  title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
  screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');

  do {
    screenPrice = prompt('Сколько будет стоить данная работа?');
  } while (!isNumber(screenPrice));

  adaptive = confirm('Нужен ли адаптив на сайте?');
};

const getAllServicePrices = function () {
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      service1 = prompt('Какой дополнительный тип услуги нужен?');
    } else if (i === 1) {
      service2 = prompt('Какой дополнительный тип услуги нужен?');
    }

    do {
      servicePrice = prompt('Сколько это будет стоить?');
    } while (!isNumber(servicePrice));

    sum += parseFloat(servicePrice);
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
