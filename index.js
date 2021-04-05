const arguments = process.argv.slice(2);

function findPrime(string, cb1, cb2, cb3) {
  let str = string.split(' ');

  if (+str[0] < 0 || +str[1] < 0) {
    return 'Please provide a positive integer as negative integers cannot be prime';
  }

  if (+str[1] <= +str[0]) {
    return'Input range incorrect';
  }

  return cb1(str, cb2, cb3);
}
  
function createPrimeList(str, cb1, cb2) {
  let primeList = [];

  for (let i = +str[0]; i <= +str[1]; i++) { 
    let count = 0;
    for (let j = 2; j < i; j++) {
      if (i % j === 0) {
        count++;
        break;
      }
    }
    if (count === 0 && i > 1) {
      primeList.push(i);
    }
  }
  
  if (!primeList || !primeList.length) {
    return 'No prime numbers found';
  }

  if (+str[0] >= 0 && +str[1] < 11) {
    return Math.max(...primeList);
  } 

  return cb1(primeList, cb2);
}
   

function findDigitOccurrences(primeList, cb) {
  let digitOccurrences = primeList.join('').split('').sort();
  let count = 1;
  let obj = {};

  for (let i = 0; i < digitOccurrences.length; i++) {
    if (digitOccurrences[i] === digitOccurrences[i + 1]) {
      count++;
      obj[digitOccurrences[i]] = count;
    } else {
      count = 1;
    }
  }
  return cb(obj);
}

// here obj is a callback and we are passing it to another callback function
const highestOccurringDigit = obj => Object.keys(obj).reduce((current, next) => obj[next] < obj[current] ? +current : +next);

console.log(findPrime(String(arguments), createPrimeList, findDigitOccurrences, highestOccurringDigit));
