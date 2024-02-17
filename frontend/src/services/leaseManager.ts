import { TezosToolkit } from '@taquito/taquito';
const Tezos = new TezosToolkit('https://ghostnet.smartpy.io');

const nftContractAddress: string = "KT1TDbn6Lgop6MzQf6UaZuThwefWfaoHyvfS";
const leaseManagerContractAddress: string = "KT1VqASL1GpCd6wW23dEsr164Csj3ydM2HMH";

const getRegisteredNfts = async (): Promise<any[]> => {
    const contract = await buildContract(leaseManagerContractAddress);
    const storage = await contract.storage() as any;
    const tokenMetadata = storage.leaseRecordKeys;
    let result = [];
    for (let k = 0; k < tokenMetadata.length; k++) {
        const i = tokenMetadata[k];
        const leaseRecord = await storage.leaseRecords.get(i);
        if (leaseRecord.lease_data.is_leased == false && leaseRecord.leaser == leaseManagerContractAddress) { //registered state
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
        if (leaseRecord.leaser == userAddress && leaseRecord.lease_data.is_leased) {
            result.push({
                due_date: new Date(leaseRecord.lease_data.due_date),
                avatar: 'https://i.seadn.io/s/raw/files/f3564ef33373939b024fb791f21ec37b.png?auto=format&dpr=1&w=3840',
                token_address: leaseRecord.lease_data.token_data.token_address
            })
        }
    }
    return result;
}

const getUserNotLeasedNfts = async (userAddress: string) => {
    const url = `https://api.ghostnet.tzkt.io/v1/tokens/balances?account=${userAddress}&balance.gt=0`;
    try {
        const response = await fetch(url);
        const tokens = await response.json();
        const contract = await buildContract(leaseManagerContractAddress);
        const storage = await contract.storage() as any;
        debugger;
        const filteredTokens = tokens.map(async (t: any) => {
            const isLeasedResult = await isLeased(storage, t.token.contract.address, Number(t.token.tokenId));
            return {
                token: t,
                include: t.token.contract.address === nftContractAddress && !isLeasedResult,
            };
        });

        const resolvedTokens = await Promise.all(filteredTokens);
        const finalFilteredTokens = resolvedTokens.filter(t => t.include).map(t => t.token);
        const nftIds = finalFilteredTokens.map((token: any) => {
            return {
                tokenId: Number(token.token.tokenId),
                token_address: token.token.contract.address,
                avatar: 'https://i.seadn.io/s/raw/files/f3564ef33373939b024fb791f21ec37b.png?auto=format&dpr=1&w=3840',
                name: token.token.metadata ? token.token.metadata.name : ""
            }
        }
        );

        return nftIds;
    } catch (error) {
        console.error('Error fetching NFTs:', error);
        return [];
    }
}

const isLeased = async (storage: any, token_address: string, token_id: number) => {
    debugger;
    const tokenMetadata = storage.leaseRecordKeys;
    for (let k = 0; k < tokenMetadata.length; k++) {
        const i = tokenMetadata[k];
        const leaseRecord = await storage.leaseRecords.get(i);
        const isLeased = leaseRecord.lease_data.is_leased && leaseRecord.lease_data.token_data.token_address == token_address && leaseRecord.lease_data.token_data.token_id == token_id;
        const isRegistered = leaseRecord.leaser == leaseManagerContractAddress;
        if (isLeased || isRegistered) {
            return true;
        }
    }
    return false;
}

const registerNft = async (wallet: any, token_addres: string, token_id: number) => {
    try {
        Tezos.setWalletProvider(wallet);
        const contract = await buildContract(leaseManagerContractAddress);
        const op = await contract.methodsObject.register({ token_address: token_addres, token_id: token_id, lease_contract: leaseManagerContractAddress }).send();
        await op.confirmation(1);
        console.log(`Operation injected: https://ghost.tzstats.com/${op.hash}`)
        const token = await buildContract(token_addres);
        const walletAddress = await wallet.getPKH();
        const op2 = await token.methodsObject.transfer([{ from_: walletAddress, txs: [{ to_: leaseManagerContractAddress, token_id: token_id, amount: 1 }] }]).send();
        await op2.confirmation(1);
        console.log(`Operation injected: https://ghost.tzstats.com/${op2.hash}`)
    } catch (error) {
        debugger;
        console.error(error);
    }
}

const leaseNft = async (wallet: any, token_addres: string, token_id: number) => {
    try {
        debugger;
        Tezos.setWalletProvider(wallet);
        const token = await buildContract(leaseManagerContractAddress);
        const op = await token.methodsObject.lease({ token_address: token_addres, token_id: token_id, lease_contract: leaseManagerContractAddress }).send();
        await op.confirmation(1);
        console.log(`Operation injected: https://ghost.tzstats.com/${op.hash}`)
    } catch (error) {
        console.error(error);
    }
}



const buildContract = async (contractAddress: string) => {
    return Tezos.wallet.at(contractAddress);
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
    getUserLeasedNfts,
    getUserNotLeasedNfts,
    registerNft,
    leaseNft
}