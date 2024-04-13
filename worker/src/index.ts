import { createClient } from "redis";

const client = createClient();

async function main() {
  await client.connect();
  while (true) {
    const response = await client.brPop("submissions", 0);
    console.log(response);
    //simulate running users' code
    await new Promise((resolve) => setTimeout(resolve, 1000));
    //send to pubsub probably ?
    console.log("Evaluated submission");
  }
}

main();
