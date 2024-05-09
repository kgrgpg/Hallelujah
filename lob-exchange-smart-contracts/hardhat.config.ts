import { HardhatUserConfig } from 'hardhat/types';
import '@nomiclabs/hardhat-ethers';

const config: HardhatUserConfig = {
    solidity: '0.8.18',
    networks: {
        base: {
            url: 'https://base-goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID',
            accounts: ['YOUR_PRIVATE_KEY']
        }
    }
};

export default config;
