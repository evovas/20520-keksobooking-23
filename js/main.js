
// Идея взята отсюда https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomNumber(min, max, decimalPlaceNumber) {
  const exponent = Math.pow(10, decimalPlaceNumber);

  min = Math.ceil(min * exponent);
  max = Math.floor(max * exponent);

  return (Math.floor(Math.random() * (max - min + 1)) + min) / exponent;

  //Обработку ошибок типа перемены местами большего и меньшего можно будет выполнить с помощью try..throw..catch
  //Я попробовал, вроде их так отлавливать можно, но пока не знаю как сделать это правильно
}

getRandomNumber(10, 100, 3);

