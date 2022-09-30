'use strict';
//CHALLANGE 1

// const dogsJulia = [3, 5, 2, 12, 7];
// const dogsKate = [4, 1, 15, 8, 3];

// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJuliaCorrected = dogsJulia.slice();
//   dogsJuliaCorrected.splice(0, 5, 5, 2);
//   //   const dogsJk = [...dogsJuliaCorrected, ...dogsKate];
//   const dogsJk = dogsJuliaCorrected.concat(dogsKate);
//   console.log(dogsJk);
//   //3.
//   dogsJk.forEach(function (dog, i) {
//     if (dog >= 3) {
//       console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
//     } else {
//       console.log(`Dog number ${i + 1} is still a puppy `);
//     }
//   });
// };
// // checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// movements.forEach(function (mov, i, arr) {
//  if (mov > 0) {
// console.log(`Movement ${i + 1}:You deposited ${mov}`);
// } else {
// console.log(`Movement ${i + 1}: You windrew ${Math.abs(mov)}`); //math f to take the absolute value, removing the sign
//  }
// })

//2.
// console.log(dogsJulia.slice());
// dogsJulia.splice(0, 5, 5, 2);
// console.log(dogsJulia);

////to do shallow copy
// console.log(arr.slice());
// console.log([...arr]);

// //SPLICE
// // console.log(arr.splice(2));
// arr.splice(-1);
// arr.splice(1, 2); //the element with the index 1 wil be deletaed also the following 2 elements// 2 how many elements will be deleted//the nr of elements to be deleted
// console.log(arr)

// movements.forEach(function (mov, i, arr) {
//   if (mov > 0) {
//     console.log(`Movement ${i + 1}:You deposited ${mov}`);
//   } else {
//     console.log(`Movement ${i + 1}: You windrew ${Math.abs(mov)}`); //math f to take the absolute value, removing the sign
//   }
// });

//CHALLANGE 2

// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));

//   const adults = humanAges.filter(age => age >= 18);
//   console.log(humanAges);
//   console.log(adults);

//   let sum = 0;
//   for (const nr of adults) {
//     sum += nr;
//   }
//   const average = sum / adults.length;
//   console.log(average);
//   const Average = adults.reduce((acc, age) => acc + age, 0) / adults.length;
//   return Average;
//   const average = adults.reduce(
//     (acc, age, i, arr) => acc + age / arr.length,
//     0
//   );
//   return average;
// };

// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1, avg2);
// const balance = movements5.reduce(function (acc, cur, i, arr) {
//   console.log(`iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0); //the intial value of the accumulator in the first loop iteration
// console.log(balance);

//CHALLANGE 3

const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);
