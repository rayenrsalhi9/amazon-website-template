import { dollarFormat } from "../quickActions/dollarFormat.js";

console.log('*** Testing suite 1 : dollarFormat test ***');

console.log('1/ Testing a basic value : ');
if (dollarFormat(2095) === 20.95) {
    console.log('=> passed');
} else console.log('=> failed');

console.log('2/ Testing a value 0 : ');
if (dollarFormat(0) === 0.00) {
    console.log('=> passed');
} else console.log('=> failed');

console.log('3/ Testing random edge values : ');
console.log(dollarFormat(5));
console.log(dollarFormat(2000.5));
console.log(dollarFormat(2000.4));
console.log(dollarFormat(2000.9));

console.log('#'.repeat(40));