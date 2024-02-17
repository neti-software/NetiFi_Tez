import { TezosToolkit } from '@taquito/taquito';
const Tezos = new TezosToolkit('https://ghostnet.smartpy.io');

const nftContractAddress: string = "KT1JvMfCt618vPN4h8TyNreneoCVqfk7swUn";
const leaseManagerContractAddress: string = "KT1VqASL1GpCd6wW23dEsr164Csj3ydM2HMH";

const getRegisteredNfts = async (): Promise<any[]> => {
    const contract = await buildContract(leaseManagerContractAddress);
    const storage = await contract.storage() as any;
    const tokenMetadata = storage.leaseRecordKeys;
    let result = [];
    for (let k = 0; k < tokenMetadata.length; k++) {
        const i = tokenMetadata[k];
        const leaseRecord = await storage.leaseRecords.get(i);
        if (leaseRecord.lease_data.is_leased == false){// && leaseRecord.leaser == leaseManagerContractAddress) { //registered state
            const tokenContract = await buildContract(leaseRecord.lease_data.token_data.token_address);
            const tokenStorage = await tokenContract.storage() as any;
            const tokenMetadataEntry = await tokenStorage.token_metadata.get(leaseRecord.lease_data.token_data.token_id.toNumber());
            const tokenNameHex = await tokenMetadataEntry.token_info.get("name");
            const tokenName = hexToAscii(tokenNameHex);

            result.push({
                name: tokenName, token_id: leaseRecord.lease_data.token_data.token_id.toNumber(), token_address: leaseRecord.lease_data.token_data.token_address, avatar:
                    'https://i.seadn.io/s/raw/files/f3564ef33373939b024fb791f21ec37b.png?auto=format&dpr=1&w=3840'
            });
        }
    }
    return result;
}

const getUserLeasedNfts = async (userAddress: string) => {
    const contract = await buildContract(leaseManagerContractAddress);
    const storage = await contract.storage() as any;
    const tokenMetadata = storage.leaseRecordKeys;
    let result = [];
    for (let k = 0; k < tokenMetadata.length; k++) {
        const i = tokenMetadata[k];
        const leaseRecord = await storage.leaseRecords.get(i);
        result.push({
            due_date: new Date(leaseRecord.lease_data.due_date),
            avatar: 'https://i.seadn.io/s/raw/files/f3564ef33373939b024fb791f21ec37b.png?auto=format&dpr=1&w=3840',
            token_address: leaseRecord.lease_data.token_data.token_address
        })
    }
    return result;
}



const buildContract = async (contractAddress: string) => {
    return Tezos.contract.at(contractAddress);
}

const hexToAscii = (hexString: string): string => {
    hexString = hexString.startsWith('0x') ? hexString.substring(2) : hexString;
    let asciiString = '';
    for (let i = 0; i < hexString.length; i += 2) {
        const byteValue = parseInt(hexString.substring(i, i + 2), 16);
        asciiString += String.fromCharCode(byteValue);
    }

    return asciiString;
};
export {
    getRegisteredNfts,
    getUserLeasedNfts
}