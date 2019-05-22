const { add, mul } = require("./common");
const _ = require("lodash");

const sum = add(1, 2);
const mulVal = mul(3, 4);
const arr = _.concat([1, 2], 3);
console.log(sum, mulVal, arr);