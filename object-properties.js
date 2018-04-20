'use strict';
const util = require('util');
/**
 * DEMO PROPERTIES.
 */

//---define properties method 1---
const person1 = {};
person1.fname = 'John';
person1.lname = 'Smith';
person1.getFullName = () => {
  return `${person1.fname} ${person1.lname}`;
};
console.log(`
  ---------------------------------
  Person 1: 
  fname: ${person1.fname} 
  lname: ${person1.lname}
  fullName: ${person1.getFullName()}
  ---------------------------------
`);

//---define properties method 2---
const person2 = {
  fname: 'Anthony',
  lname: 'Johnson',
  getFullName: () => `${person2.fname} ${person2.lname}`
};
console.log(`
  ---------------------------------
  Person 2: 
  fname: ${person2.fname}
  lname: ${person2.lname}
  fullName: ${person2.getFullName()}
  ---------------------------------
`);

//---define properties method 2---
const person3 = {};
Object.defineProperties(person3, {
  fname: {
    value: 'Mike',
    writable: false,
    enumerable: false,
    configurable: false
  },
  lname: {
    value: 'Conover',
    writable: false,
    enumerable: false,
    configurable: false
  },
  getFullName: {
    value: () => `${person3.fname} ${person3.lname}`,
    writable: false,
    enumerable: false,
    configurable: false
  }
});

console.log(`
  ---------------------------------
  Person 2: 
  fname: ${person3.fname}
  lname: ${person3.lname}
  fullName: ${person3.getFullName()}
  ---------------------------------
`);

console.log(
  'Person 3 Property Descriptor: ',
  util.inspect(Object.getOwnPropertyDescriptors(person3), false, null)
);
