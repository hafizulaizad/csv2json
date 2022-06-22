const fs = require("fs");

let result = [];
var data = fs.readFileSync("files/material.csv");

//Split rows
var data_array = data.toString().split("\r");
var data_header = data_array[0].split(",");

for (let i = 1; i < data_array.length - 1; i++) {
  //console.log(i);
  let data_obj = {};
  let str_temp = data_array[i];
  let data_str = "";
  console.log(str_temp);

  let flag = 0;
  for (let ch of str_temp) {
    if (ch === '"' && flag === 0) {
      flag = 1;
    } else if (ch === '"' && flag == 1) flag = 0;
    if (ch === ", " && flag === 0) ch = "|";
    if (ch !== '"') data_str += ch;
  }

  let properties = data_str.split("|");
  console.log(properties);

  for (let j in data_header) {
    if (properties[j].includes(", ")) {
      data_obj[data_header[j]] = properties[j]
        .split(",")
        .map((item) => item.trim());
    } else data_obj[data_header[j]] = properties[j];
  }
  result.push(data_obj);
}

let json = JSON.stringify(result);
console.log(json);
fs.writeFileSync("files/output.json", json);
