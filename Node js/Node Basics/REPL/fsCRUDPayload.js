import fs from 'fs';

export function WriteFileDynamic(data, res) {
  fs.writeFile('message.json', data, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.writeHeader(200, { 'content-type': 'application/json' });
      res.write('Write data Successfully');
      res.end();
    }
  });
}


export function ReadFileDynamic() {
    const data = fs.readFile("message.json", "utf8")
    return data;
}