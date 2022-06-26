"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const readline = __importStar(require("readline"));
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
//rather than deleting why not copying to new arr
const arr = [];
for (let i = 0; i < result.length; i++) {
    const transformedObj = {
        ProcessedOn: new Date(),
        PartNumber: result[i]["Part No"],
        PressingNumber: result[i]["Lot No"],
        MeasuredValue01: result[i]["Measuring point"],
        MeasuredValue02: result[i]["Measuring value"],
        Criteria: result[i]["Criterion internal"],
        MaterialName: getMaterialName(),
        ResourceName: getOperationName(),
        OperationName: getResourceName(),
    };
    arr.push(transformedObj);
}
console.log(arr);
function getMaterialName() {
    const ql = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    ql.question("Material Name:", function (matname) {
        return matname; // do somthing with result
    });
    return "gg";
}
function getOperationName() {
    return "ayam";
}
function getResourceName() {
    return "ayam";
}
// console.log(newRes(result));
//req input from user
let json = JSON.stringify(arr);
fs.writeFileSync("files/output.json", json);
//NOTE q2
const q2 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
q2.question("ResourceName", function (resname) {
    console.log(`Oh, so your Resource is ${resname}`); // do somthing with result
});
const q3 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
q3.question("Operation Name n 1.TrackIn 2.TrackOut 3.Rework", function (opname) {
    console.log(`Oh, so your Operation is ${opname}`); // do somthing with result
    switch (opname) {
        case "1":
        //DatabaseObject.OperationName = opname;
    }
});
//TODO display result in console.
//TODO Skip the line if “Result” column value is ‘False’
//TODO Exception handling for avoiding unexpected errors
//# sourceMappingURL=index.js.map