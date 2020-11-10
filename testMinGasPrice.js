const Web3 = require('web3');
require('dotenv').config();

const providerUrl = process.env.PROVIDER_URL;
const run = async ()=> {
  const web3 = new Web3(providerUrl);

  const lastBlock = await web3.eth.getBlock("latest");
  console.dir(lastBlock);
  console.log('lastBlock.minimumGasPrice =>', lastBlock.minimumGasPrice);
  console.log(`parseInt(lastBlock.minimumGasPrice) * 1.1 =>`, parseInt(lastBlock.minimumGasPrice) * 1.1)

}


run();