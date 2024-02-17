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
  setWalletInstance: Dispatch<SetStateAction<any>>; // Function to update wallet state
  setUserAddress: Dispatch<SetStateAction<string>>;
  wallet: BeaconWallet; // BeaconWallet instance for wallet connectivity
};

const ConnectButton = ({
  Tezos,
  setWalletInstance,
  setUserAddress,
  wallet,
}: ButtonProps): JSX.Element => {
  const setup = async (userAddress: string): Promise<void> => {
    setUserAddress(userAddress); 
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
    } catch (error) {
      console.log(error); 
    }
  };

  useEffect(() => {

    (async () => {

      wallet = new BeaconWallet({
        name: "NetiFi_Tez",
        network: {
          type: NetworkType.GHOSTNET,
          rpcUrl: "https://ghostnet.smartpy.io"
        }
      });

      Tezos.setWalletProvider(wallet); 
      setWalletInstance(wallet); 
      const activeAccount = await wallet.client.getActiveAccount();
      if (activeAccount) {
        const userAddress = await wallet.getPKH(); 
        await setup(userAddress); 
      }
    })();
  }, []);

    return (
        <button onClick={connectWallet} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Connect Wallet</button>
    );
};

export default ConnectButton;
