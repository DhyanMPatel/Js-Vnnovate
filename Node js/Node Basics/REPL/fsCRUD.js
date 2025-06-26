import fs from 'fs/promises';

export async function writeFile(id, name) {
  try {
    const data = await fs.readFile('message.json', 'utf8');
    const users = JSON.parse(data);
    users.push({ id, name });

    await fs.writeFile('message.json', JSON.stringify(users, null, 2));
  } catch (err) {
    console.log('Error:', err.message);
  }
}

export async function readFile() {
  try {
    const data = await fs.readFile('message.json', 'utf8');
    const users = JSON.parse(data);
    console.log(users);
  } catch (err) {
    console.log('Error:', err.message);
  }
}

export async function updateFile(id, name) {
  try {
    const data = await fs.readFile('message.json', 'utf8');
    const users = JSON.parse(data);
    const user = users.find((user) => user.id === id);

    if (user) {
      user.name = name;
      await fs.writeFile('message.json', JSON.stringify(users, null, 2));
    } else {
      console.log('User not found');
    }
  } catch (err) {
    console.log('Error:', err.message);
  }
}

export async function deleteFile(id) {
  try {
    const data = await fs.readFile('message.json', 'utf8');
    const users = JSON.parse(data);
    const updatedUsers = users.filter((user) => user.id !== id);

    await fs.writeFile('message.json', JSON.stringify(updatedUsers, null, 2));
  } catch (err) {
    console.log('Error:', err.message);
  }
}

