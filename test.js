// const data = require('./data.json');
import data from './data.json'
citySet = new Set();
countrySet = new Set();
locationSet = new Set();

data.forEach(monkeyPoxCase => {
    citySet.add(monkeyPoxCase['City']);
    countrySet.add(monkeyPoxCase['Country']);
    locationSet.add(monkeyPoxCase['Location']);
});
// console.log(citySet)
// console.log(countrySet)
// console.log(locationSet)
// data.sort((a, b) => {
//     return a.Date_onset < b.Date_onset;
// });

const lengthBefore = data.length;
const newArr = data.filter(poxCase => {
    return poxCase.Outcome == 'Death' && poxCase.Status == 'confirmed'; //|| poxCase.Status == 'suspected';
});
const lengthAfter = newArr.length;

newArr.sort((a, b) => {
    return a.Date_confirmation - b.Date_confirmation;
});
// for (let i = newArr.length - 1; i >= newArr.length - 10; i--) {
//     console.log(newArr[i]);
// }
console.log(`length before: ${lengthBefore}`);
console.log(`length after: ${lengthAfter}`);
let date = data[0].Date_confirmation;
let newDate = new Date(date);
console.log(newDate);
console.log(Date.now() > newDate)
// console.log(data[0]);
