const fs = require('fs').promises;

async function readAll() {
  const fileContent = await fs.readFile('./simpsons.json', 'utf-8');
  const simpsons = JSON.parse(fileContent);
  const strings = simpsons.map(({ id, name }) => `${id} - ${name}`);
  strings.forEach((string) => console.log(string));
}

async function getSimpsonById(id) {
    const fileContent = await fs
      .readFile('./simpsons.json', 'utf-8');
    
    const simpsons = JSON.parse(fileContent);

    id = 1;
  
    const chosenSimpson = simpsons.find((simpson) => Number(simpson.id) === id);
  
    if (!chosenSimpson) {
  
        throw new Error('id não encontrado');

    }
    
    return chosenSimpson;
};

async function main() {
  await readAll();

  const simpson = await getSimpsonById(1);
  console.log(simpson);
}

main();