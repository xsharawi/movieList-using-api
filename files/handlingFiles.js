import fs from 'fs';

let jsonData;

const readAFile = (file) => {
  fs.readFile(file, "utf-8", (err, data) => {
    if (err) {
      let ar = []
      return ar;

    } else {
      jsonData = JSON.parse(data);  
      return jsonData;
    }
  });
}

const writeToFile = (file,data) => {
  fs.writeFile(file, data, 'utf-8', (err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
}

const writeToJSON = (file,data) => {
  fs.writeFile(file, JSON.stringify(data), 'utf-8', (err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
}

const appendToFile = (file,data) => {
  fs.appendFile(file, data, "utf-8", (err) => {
    if (err) {
      console.log(err);
    } else {
    }
  })
}

const deleteFile = (file) => {
  fs.unlink(file, (err) => {
    if (err) {
      console.log(err);
    } else {
    }
  })
}

export{
    deleteFile,
    appendToFile,
    writeToFile,
    writeToJSON,
    readAFile,
}