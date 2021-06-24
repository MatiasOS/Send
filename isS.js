const Web3 = require('web3');
require('dotenv').config();

const providerUrl = process.env.PROVIDER_URL;
const run = async ()=> {
  const web3 = new Web3(providerUrl);
  const r = await web3.eth.isSyncing()
  console.log(r)
}


run();
