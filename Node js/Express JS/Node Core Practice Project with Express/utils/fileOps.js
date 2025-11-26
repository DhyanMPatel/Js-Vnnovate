/**
 * File operations using fs (promises) - Express version
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Get current directory path in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/users.json");

async function getUsers() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code == "ENOENT") {
      // File doesn't exist, create it with empty array
      await fs.writeFile(filePath, "[]");
      return [];
    }
    return [];
  }
}

async function saveUsers(data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    throw error;
  }
}

export { getUsers, saveUsers };
