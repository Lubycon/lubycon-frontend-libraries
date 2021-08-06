const { MattermostClient } = require('../dist');
const client = new MattermostClient('3fhez5bubtdsdf8sejicrkouny');

async function main() {
  const response = await client.fetchAllUsers({});
  console.log(response);
}

main();
