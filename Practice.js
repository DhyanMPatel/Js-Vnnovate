// function spinWords(string) {
//     return string.split(' ')
//         .map(word => word.length >= 5 ? word.split('').reverse().join('') : word)
//         .join(' ');
// }

// function spinWords(string) {
//     const words = string.split(" ").map((word) => {
//         if (word.length >= 5) {
//             return word.split('').reverse().join('');
//         }
//         return word;
//     });

//     return words.join(" ")
// }

// console.log(spinWords("Hey fellow warriors"));

// console.log("Start"); // 1st
// setTimeout(() => console.log("Timeout 1"), 0); // 4th
// setImmediate(() => console.log("Immediate")); // 3rd
// setTimeout(() => console.log("Timeout 2"), 0); // 5th
// console.log("End"); // 2nd

// import fs from 'fs';
// const start = Date.now();
// // const data = await fs.readFile(`Node js/Node Basics/REPL/message.txt`, "utf8");
// const data = fs.readFileSync(`Node js/Node Basics/REPL/message.txt`, "utf8");
// console.log(data);
// console.log(`File read took ${Date.now() - start}ms`);


/// Use path When read file is at different directory
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const absolutePath = path.resolve();
console.log(absolutePath);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "Node js", "Node Basics", "REPL", "message.txt");

const start = Date.now();
// const data = fs.readFileSync(filePath, "utf8");
// console.log(data);
console.log(`File read took ${Date.now() - start}ms`);