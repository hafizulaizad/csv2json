const fs = require("fs");
// fs.promises
// implement data typing
let result = [];
//Read file
var data = fs.readFileSync("files/material.csv");
//Split rows
var data_array = data.toString().split("\n");
//console.log(data_array);
//Split header
var data_header = data_array[0].split(",");
//console.log(data_header);
//Read each data.
for (let i = 1; i < data_array.length - 1; i++) {
    let data_obj = {};
    let str_temp = data_array[i];
    let data_str = "";
    //console.log(str_temp);
    let flag = 0;
    //Insert insert each data in " "
    for (let ch of str_temp) {
        if (ch === '"' && flag === 0) {
            flag = 1;
        }
        else if (ch === '"' && flag == 1)
            flag = 0;
        if (ch === "," && flag === 0)
            ch = "|";
        if (ch !== '"')
            data_str += ch;
    }
    //Split data with others.
    let properties = data_str.split("|");
    for (let j in data_header) {
        if (properties[j].includes(",")) {
            data_obj[data_header[j]] = properties[j]
                .split(",")
                .map((item) => item.trim());
        }
        else
            data_obj[data_header[j]] = properties[j];
    }
    result.push(data_obj);
}
//result.slice(2, 4);
// filter result
//var sortedRes = result.filter();
const newRes = (...arrCsv) => {
    delete arrCsv["Sample"];
};
let result2 = newRes(result);
console.log(result2);
//req input from user
//let json = JSON.stringify(result);
//fs.writeFileSync("files/output.json", json);
//# sourceMappingURL=index.js.map