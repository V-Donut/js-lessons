let title = 'Калькулятор вёрстки';
let screens = 'Простые, Сложные, Интерактивные';
let screenPrice = 15000;
let rollback = 25;
let fullPrice = 50000;
let adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log('Стоимость вёрстки экранов ' + screenPrice + ' рублей');
console.log('Стоимость разработки сайта ' + fullPrice + ' рублей');

screens = screens.toLocaleLowerCase();
let screensArray = screens.split(', ');
console.log(screensArray);

let rollbackPercent = fullPrice * (rollback / 100);
console.log(rollbackPercent);
