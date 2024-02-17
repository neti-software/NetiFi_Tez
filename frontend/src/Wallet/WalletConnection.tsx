// Import necessary modules from React and @taquito/taquito
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import {
  NetworkType,
  BeaconEvent,
  defaultEventCallbacks,
} from "@airgap/beacon-dapp";

type ButtonProps = {
  Tezos: TezosToolkit; // TezosToolkit instance for interacting with the Tezos blockchain
  setContract: Dispatch<SetStateAction<any>>;
  setWallet: Dispatch<SetStateAction<any>>; // Function to update wallet state
  setUserAddress: Dispatch<SetStateAction<string>>;
  setUserBalance: Dispatch<SetStateAction<number>>; 
  setStorage: Dispatch<SetStateAction<number>>; 
  contractAddress: string; // Address of the smart contract
  setBeaconConnection: Dispatch<SetStateAction<boolean>>; // Function to update beacon connection state
  setPublicToken: Dispatch<SetStateAction<string | null>>; // Function to update public token state
  wallet: BeaconWallet; // BeaconWallet instance for wallet connectivity
};

const ConnectButton = ({
  Tezos,
  setContract,
  setWallet,
  setUserAddress,
  setUserBalance,
  setStorage,
  contractAddress,
  setBeaconConnection,
  setPublicToken,
  wallet,
}: ButtonProps): JSX.Element => {
  const setup = async (userAddress: string): Promise<void> => {
    setUserAddress(userAddress); 
    const balance = await Tezos.tz.getBalance(userAddress);
    setUserBalance(balance.toNumber());
    // Create a contract instance for the smart contract at the specified address
    const contract = await Tezos.wallet.at(contractAddress);
    const storage: any = await contract.storage(); // Get the contract storage
    setContract(contract); 
    setStorage(storage); 
  };

  const connectWallet = async (): Promise<void> => {
    try {
      await wallet.requestPermissions({
        network: {
          type: NetworkType.GHOSTNET,
        },
      });

      const userAddress = await wallet.getPKH();
      await setup(userAddress); 
      setBeaconConnection(true); 
    } catch (error) {
      console.log(error); 
    }
  };

  useEffect(() => {

    (async () => {
debugger;
       wallet = new BeaconWallet({
        name: "NetiFi_Tez",
        network: {
          type: NetworkType.GHOSTNET,
          rpcUrl: "https://ghostnet.smartpy.io"
        }
      });
      console.log(wallet);

      Tezos.setWalletProvider(wallet); 
      setWallet(wallet); 
      const activeAccount = await wallet.client.getActiveAccount();
      if (activeAccount) {
        const userAddress = await wallet.getPKH(); 
        await setup(userAddress); 
        setBeaconConnection(true);
      }
    })();
  }, []);

    return (
        <button
            onClick={connectWallet}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Connect Wallet</button>


    );
};

export default ConnectButton;
