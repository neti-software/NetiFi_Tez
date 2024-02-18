import { Injectable } from '@nestjs/common';
import { TezosToolkit } from '@taquito/taquito';
const Tezos = new TezosToolkit('https://ghostnet.smartpy.io');
import { InMemorySigner } from '@taquito/signer';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AppService {

  @Cron("0 */2 * * * *")
  async handleUnlease() {
    const contract = await this.buildContract(process.env.LEASE_CONTRACT_ADDRESS);
    const storage = await contract.storage() as any;
    const tokenMetadata = storage.leaseRecordKeys;
    const len = tokenMetadata.length;
    for(let k = 0;k<tokenMetadata.length;k++){
      const i = tokenMetadata[k];
      const leaseRecord = await storage.leaseRecords.get(i);
      if (leaseRecord.lease_data.is_leased && new Date(leaseRecord.lease_data.due_date) <= new Date()) {
        await this.unlease(leaseRecord.lease_data.token_data.token_address, leaseRecord.lease_data.token_data.token_id);

      }
    }
    if (tokenMetadata.length == 0) {
      console.log("No NFT Leased");
    }
  }

  unlease = async (tokenAddress: string, tokenId: number) => {
    Tezos.setProvider({
      signer: new InMemorySigner(process.env.ADMIN_PRIVATE_KEY),
    });
    const contract = await this.buildContract(process.env.LEASE_CONTRACT_ADDRESS);
    const op = await contract.methodsObject.unlease({ token_address: tokenAddress, token_id: tokenId, lease_contract: process.env.LEASE_CONTRACT_ADDRESS }).send();
    await op.confirmation(1);
    console.log(`Unlease transaction successful: https://ghost.tzstats.com/${op.hash}`);
  }

  buildContract = async (contractAddress: string)  =>{
    return Tezos.contract.at(contractAddress);
  }

}
