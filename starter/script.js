'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ''; //to clear the old things form the container; all the html tags will be included; we use innerhtml as a setter
  //to sort the movements in ascending order we need to create acopy of the movements array and then to sort its elements
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  //we cannot use the movements original cause the sort will then order the actual underlying array, the actual movements array as it is in the account object; we do not want to sort the original underlying data

  movs.forEach(function (mov, i) {
    //looping over the movements array, and then to create a html which looks like in ex=> to copy 1 mov row cause this is what we want to create in each iteration of the loop with the current data
    const type = mov > 0 ? 'deposit' : 'withdrawal'; //to know it s a deposit or withdrawal
    const html = `                                 
  <div class="movements__row">                  
  <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
  <div class="movements__value">${mov}€</div>
</div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html); //to attach the html into this container(movements) element and for that we use insertAdjacentHTML method => we re call this m on movements class on which we want to add anew movemenyt row
  });
};

//151.COMPUTING USERNAMES + calculating the balance with reduce m
const calCdisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDislaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`; //to remove the sign and get the absolute v, we use the Math m
  //to pay out an interest every time is a deposit in the bank acc; 1.2% from the deposited amount
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1; //the bank will pay an int if it s greater or equal with 1 euro
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

console.log(account1.movements);

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      // .map(function (name) {
      .map(name => name[0])
      // return name[0];
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  //DISPLAY MOVEMENTS
  displayMovements(acc.movements);
  //DISPLAY BALANCE
  calCdisplayBalance(acc);
  //DISPLAY SUMMARY
  calcDislaySummary(acc);
};

//stw

//to get each of the letters=> loop over the array and then take the 1 letter in each iteration and add them into a new array and then will join that array and we d end up with a string of stw
//to compute an username for each account names

//158. IMPLEMENTING LOGIC
//EVENT HANDLER
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  //PREVENT FORM FROM SUBMITTING
  e.preventDefault();
  console.log('LOGIN'); //flash login cause the button is in a form element, so in HTML, the default behavior when we click the submit button is for the page to reload-> we need to stop that-and for that we need to give the function the event parameter; we can call a method preventDefault on that event-will prevent this form from submiting

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value //to fill in the username in the login input
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //THIS PIN PROPERTY ONLY WE READ in case the current account actually exists
    //DISPLAY UI MESSAGE
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 100;
    //AS WE LOGIN IN TO GET RID OFF THE DATA FROM INPUT
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //for displaying the movements inside the login f, we need to move from above, from their hardcoded form there: acea tranzitie de la un cont la altul, to calculate these values automaticaly, from one account to another
    //DISPLAY MOVEMENTS
    // displayMovements(currentAccount.movements);
    // //DISPLAY BALANCE
    // calCdisplayBalance(currentAccount);
    // //DISPLAY SUMMARY
    // calcDislaySummary(currentAccount);

    //the current UI

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  //prevent from submitting, usually when we have button
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);

  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, receiverAcc); //to find the account to which we want to transfer the money, we need find m

  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 && //to see if the current balance is greater than the amount and if the receiver name exists to find out their name which should be diff from the
    //current acc username
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    //DOING THE TRANSFER
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    //UPDATE UI
    updateUI(currentAccount);
  } //the AMOUNT TO BE > 0 AND THE CURRENT BALANCE TO BE GREATER OR EQUAL THE AMOUNT THAT WE RE TRYING TO TRANSFER
  //receiverAcc.username !==(to be equal), diff from currentAccount-
});

//REQUEST LOAN
//OUR BANK SAYS THAT it will grant a loan only if there is at least one deposit wth at least 10% of the requested loan ammount
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount / 10)) {
    //ADD A MOVEMENT
    currentAccount.movements.push(amount);

    //UPDATE THE UI
    updateUI(currentAccount);

    inputLoanAmount.value = '';
  } //if 1 lement from movements array is at least true, so greater than 10% of the requested amount then all from condition will become true
});

//CLOSE ACCOUNT-FIND INDEX
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('delete');

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    //DELETE ACCOUNT
    accounts.splice(index, 1);

    //HIDE UI

    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// Slice method
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2)); //ramane tot ce e de la index 2 in colo
console.log(arr.slice(2, 4)); //4 is not gonna be included, as in strings
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
//to do shallow copy
console.log(arr.slice());
console.log([...arr]);

// //SPLICE
// console.log(arr.splice(2));
// arr.splice(-1);
// arr.splice(1, 2); //the element with the index 1 wil be deletaed also the following 2 elements// 2 how many elements will be deleted//the nr of elements to be deleted
// console.log(arr);
// const lista = [1, 2, 3, 4, 5];
// console.log(lista);
// lista.splice(2, 2);
// console.log(lista);

// //REVERSE M
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['h', 'f', 'l', 'p', 't'];
// console.log(arr2.reverse());
// console.log(arr2);
//CONCAT
//doesn t mutate the original array
//neither spread op
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]);

// //JOIN
// console.log(letters.join(' - '));

// //THE NEW AT METHOD
// const arr4 = [23, 88, 78];
// console.log(arr[0]);
// console.log(arr.at(0));

// //getting the last element of the array
// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]); //the copy of the array only with the last element, of course we want tha value, so we need to take out that value by doing [0]
// console.log(arr.at(-1));

// console.log('jonas'.at(0));
// console.log('jonas'.at(-1));

// //144.looping arrays foreach
const movements4 = [200, 450, -400, 3000, -650, -130, 70, 1300];
//positive values deposits
//negative ones : withdrawals

for (const movement of movements4) {
  for (const [i, movement] of movements4.entries()) {
    if (movement > 0) {
      console.log(`Movement ${i + 1}:You deposited ${movement}`);
    } else {
      console.log(`Movement ${i + 1}: You windrew ${Math.abs(movement)}`);
    }
  }
}
console.log('--------FOREACH------');
//for looping over the movements array we use
//foreach actually needs a call back f; so forEach is technically a higher order f which requires a call back f in order to tell it what to do
//what the forEach m does is to loop over the array and in each itteration it will execute this call back f
//we give the forEach m instructions by giving it a call back f which contains these intructions
//as forEsch m calls this callback f in each iteration it will pass in the current element of the array as an argument
movements4.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}:You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You windrew ${Math.abs(mov)}`); //math f to take the absolute value, removing the sign
  }
});

// // //145.ForEach with maps and sets
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);
// // // //MAPS
// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value} `);
// });

// // //SETS
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);
// currenciesUnique.forEach(function (value, key, map) {
//   console.log(`${key}: ${value} `);
// });

// //149.DATA TRASNFORMATIONS: MAP, FILTER, REDUCE

// //150.MAP M

// const movements5 = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const eurToUsd = 1.1;
// const movements5USD = movements5.map(function (mov) {
//   return mov * eurToUsd;
// });

// const movements5USD = movements5.map(mov => mov * eurToUsd);

// console.log(movements5);
// console.log(movements5USD);

// const movementsUSDfor = [];
// for (const mov of movements5) movementsUSDfor.push(mov * eurToUsd);
// console.log(movementsUSDfor);

// if (mov > 0) {
//   console.log(`Movement ${i + 1}:You deposited ${mov}`);
// } else {
//   console.log(`Movement ${i + 1}: You windrew ${Math.abs(mov)}`); //math f to take the absolute value, removing the sign
// }
// // });

// const movementsDescriptions = movements5.map(
//   (mov, i) =>
//     `Movement ${i + 1}:You  ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
//       mov
//     )}`
// );

//152.THE FILTER M

//to create an array of deposits
const movements5 = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const deposits = movements5.filter(function (mov) {
//   return mov > 0;
// });
// console.log(movements5);
// console.log(deposits);

// const depositsFor = [];
// for (const mov of movements5) if (mov > 0) depositsFor.push(mov);
// console.log(depositsFor);

// const withdrawals = movements5.filter(function (mov) {
//   return mov < 0;
// });
// console.log(withdrawals);

//153.THE REDUCE M

const balance = movements5.reduce(function (acc, cur, i, arr) {
  console.log(`iteration ${i}: ${acc}`);
  return acc + cur;
}, 0); //the intial value of the accumulator in the first loop iteration
console.log(balance);

// const balance = movements5.reduce((acc, cur) => acc + cur, 0); //the intial value of the accumulator in the first loop iteration
// console.log(balance);

// let balance2 = 0;
// for (const mov of movements5) balance2 += mov;
// console.log(balance2);

//TO ADD THE MAXIMUM VALUE OF AN ARRAY
//-the role of the accumulator is to keep track of the current maximum value

// const max = movements5.reduce((acc, mov) => {
//   if (acc > mov) return acc;
//   else return mov; //return the movement as the next accumulator in the next iteration
// }, movements5[0]); //TO NOT PUT 0 WHEN WE TRY TO FIND THE MAXIMUM OR MINIMUM OF A VALUE
// console.log(max);

//155.THE MAGIC OF CHAINING METHOD
//to take all the movement deposits, then convert them into $ and add them all up; to know how much was deposited into account in US dollars

// const eurToUsd = 1.1;
// //PIPELINE
// const totalDepositsUSD = movements5
//   .filter(mov => mov > 0)
//   .map((mov, i, arr) => {
//     // -we can inspect the current array at any stage of the pipeline using the 3 rd parameter of the callback f(arr from array)
//     console.log(arr);

//     return mov * eurToUsd;
//   })
//   .map(mov => mov * eurToUsd)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositsUSD);

// // //157.THE FIND M
// const firstWithdrawal = movements5.find(mov => mov < 0);
// console.log(movements5);
// console.log(firstWithdrawal);

// //we can find an object in the array based on some property of that object

// console.log(accounts);
// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

// const accounts1 = [];
// for (const account of accounts)
//   if (account.owner === 'Jessica Davis') accounts1.push(account.owner);
// console.log(accounts1);

// // //161. some and every
// console.log(movements5);
// console.log(movements5.includes(-130));

const anyDeposits = movements5.some(mov => mov > 0); //if there s any postivie movements in the array, any nr above 0
console.log(anyDeposits);

// //EVERY
// console.log(movements5.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov > 0));

// //SEPARATE CALLBACKS
// const deposit = mov => mov > 0;
// console.log(movements5.some(deposit));
// console.log(movements5.every(deposit));
// console.log(movements5.filter(deposit));

// //162.THE FLAT AND FLATMAP METHODS
const arr8 = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr8.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));
// the bank itself want s to calculate the overall balance of all the movements of all the accounts
const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);

const allMovements = accountMovements.flat();
console.log(allMovements);
const overalBlanace = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(overalBlanace);
// const overalBlanace = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overalBlanace);

//FLATMAP
const overalBlanace2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBlanace2);

//SORTING ARRAYS
//STRINGS
const owners = ['Jonas', 'Magda', 'Philip', 'Radu'];
console.log(owners.sort());
console.log(owners);
//NUMBERS
console.log(movements5);
movements5.sort((a, b) => {
  // return < 0, A, B
  // RETURN > 0, B, A
  // ascending o
  if (a > b) return 1;
  if (b > a) return -1; //a,b 2 consecutive nr s in tha array; a-current value and b-the next value
  // to put the nr s in ascending order
  movements5.sort((a, b) => a - b);
  console.log(movements5);
});

// movements5.sort((a, b) => {
//return < 0, A, B
//RETURN > 0, B, A
//DESCENDING
// if (a > b) return -1;
// if (a < b) return 1;
// });
movements5.sort((a, b) => b - a);
console.log(movements5);

//164.more WAYS OF CREATING AND FILLING ARRAYS
const arr3 = [4, 5, 7, 9];
console.log(new Array(4, 5, 7, 9));
//EMPTY ARRAYS AND FILL METHOD
const x = new Array(5); //creating array with 5 emepty elements
console.log(x);
x.fill(1, 3, 4); //fill the 5 empty spaces with 1 but it starts only at index 3
x.fill(1);
console.log(x); //the final index si not included in the array
arr3.fill(22, 1, 3); //fill the arr3 array with the 22 at the position 1 till 3
console.log(arr3);
//ARRAY FROM
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1); //we are not using the from as a method on the array, instead we are using it on the Array() contructor; array is a function object and on this we call from() m; the callback f is like the one we use in the map m
//first we can pass in an object with the length property and the 2 nd argument is a maping function, it is like the call back f that we apss in into the map() m

//to do the sum of the values from the user interface without using the movements; we do not have them somewhere in our code; we do not have an array containing these values
//we need to get them out from there and do the calculation

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements_value'),
    el => Number(el.textContent.replace('€', '')) //callback f as in map
  );
  console.log(movementsUI);
});
//we used the Array.from to create an array from the result o f the document.querry..whoch is an Nodelist, so is not really an array, but an array like structure and it can be easily converted to an array using Array.from() and as a 2 nd step we enev included a mapping f, which then transforms the initial array, to an array exactly as we wanted, basically convert raw element to its text content and replacing the euro sign with nothing

//166.ARRAY METHODS PRACTICE
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, cur) => acc + cur, 0);
console.log(bankDepositSum);

// 2.
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;

// console.log(numDeposits1000);

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);

console.log(numDeposits1000);

//PREFIXED ++ operator
let a = 10;
console.log(++a);
console.log(a);

//3.
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals);
//4.
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word =>
      exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(' ');
  return capitalize(titleCase);
};
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

//CHALLANGE 4
//1.
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//recommendedFood = weight ** 0.75 * 28.

dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);

//2.
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log(
  `Sarah s dog is eating too ${
    dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'
  }`
);

//3.
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

//4.
//Matilda and
// Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
// too little!
console.log(`${ownersEatTooMuch.join(
  ' and '
)} dogs eat too much and ${ownersEatTooLittle.join(' and ')} dogs eat 
 too little!`);

//5.
console.log(dogs.some(dog => dog.curFood === dog.recFood));

//6.
//current > (recommended * 0.90) && current < (recommended *
// 1.10)
const checkEatingOkay = dog =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;

console.log(dogs.some(checkEatingOkay));

//7.
console.log(dogs.filter(checkEatingOkay));

//8.
const dogsSort = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSort);
