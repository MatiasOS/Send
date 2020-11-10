const { ethers } = require('ethers');
require('dotenv').config();

const providerUrl = process.env.PROVIDER_URL;

const provider = new ethers.providers.JsonRpcProvider(providerUrl);
const mnemonic = process.env.MNEMONIC;
const refillAddress = process.env.REFILL_ADDRESS;
const path = `m/44'/60'/0'/0/`; // add last number later

const VALUE = "0.049"

const run = async () => {
  console.log(await provider.getBlockNumber());

  tx = {
    to: refillAddress,
    value: ethers.utils.parseEther(VALUE),
  }

  for(let i = 0; i < 10; i++) {
    try {
      console.log('********************************************************************************************************')
      let wallet = ethers.Wallet.fromMnemonic( mnemonic  , `${path}${i}` );
      console.log(`i: ${i} || public key: ${wallet.address}`);
      wallet = wallet.connect(provider);
      const balance = await wallet.getBalance();
      console.log("300000000" - balance)
      console.log(`balance: ${ethers.utils.formatEther(balance)}`);
      if(parseFloat(ethers.utils.formatEther(balance)) < parseFloat(VALUE)){
        console.log('Skipping');
        continue;
      }; 
      result = await wallet.sendTransaction(tx);
      console.log(result.hash);
    } catch (e) {
      console.log(e)
      console.error('fails');
    }
  }
}

run();