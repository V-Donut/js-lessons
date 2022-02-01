'use strict';

let title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
let screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
let screenPrice = +prompt('Сколько будет стоить данная работа?', 10000);
let rollback = 25;
let adaptive = confirm('Нужен ли адаптив на сайте?');
let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?');

const allServicePrices = function getAllServicePrices(price1, price2) {
  return price1 + price2;
};

function getFullPrice(price1, price2) {
  return price1 + price2;
}

let fullPrice = getFullPrice(screenPrice, allServicePrices(servicePrice1, servicePrice2));

function getTitle(title) {
  title = title.trim();
  if (!title) {
    return title;
  }
  title = title.charAt(0).toUpperCase() + title.toLowerCase().slice(1);
  return title;
}
title = getTitle(title);

const servicePercentPrice = function getServicePercentPrices(fullPrice, rollback) {
  let rollbackSum = fullPrice * (rollback / 100);
  return Math.ceil(fullPrice - rollbackSum);
};

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getRollbackMessage = function () {
  console.log(fullPrice);
  if (fullPrice >= 30000) {
    console.log('Даем скидку в 10%');
  } else if (fullPrice >= 15000 && fullPrice < 30000) {
    console.log('Даем скидку в 5%');
  } else if (fullPrice >= 0 && fullPrice < 15000) {
   console.log('Скидка не предусмотрена');
  } else {
    console.log('Что-то пошло не так');
  }
};

screens = screens.toLocaleLowerCase();
let screensArray = screens.split(', ');
console.log(screensArray);

servicePercentPrice();
getRollbackMessage();

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);
