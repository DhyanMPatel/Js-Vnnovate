/**
 * File operations using fs (promises)
 */

const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/users.json");

function getUsers() {
  return new Promise((resolve) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          // File doesn't exist, create it with empty array
          fs.writeFile(filePath, "[]", (writeErr) => {
            if (writeErr) return resolve([]);
            return resolve([]);
          });
        } else {
          return resolve([]);
        }
      }
      try {
        resolve(JSON.parse(data));
      } catch (parseErr) {
        resolve([]);
      }
    });
  });
}

function saveUsers(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}

module.exports = { getUsers, saveUsers };
