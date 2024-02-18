// Import necessary modules from React and @taquito/taquito
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { BeaconWallet } from "@taquito/beacon-wallet";
import {
  NetworkType,
} from "@airgap/beacon-dapp";

type ButtonProps = {
  setWalletInstance: Dispatch<SetStateAction<any>>; // Function to update wallet state
  setUserAddress: Dispatch<SetStateAction<string>>;
};

const ConnectButton = ({
  setWalletInstance,
  setUserAddress
}: ButtonProps): JSX.Element => {

  const [isLoadingCheckConnected, setIsLoadingCheckConnected] = useState<boolean>(true)
  const [beaconConnection, setBeaconConnection] = useState<boolean>(false)
  const [wallet_, setWallet_] = useState<any>(null);
  const setup = async (userAddress: string): Promise<void> => {
    setUserAddress(userAddress);
  };

  const connectWallet = async (): Promise<void> => {
    try {
      await wallet_.requestPermissions({
        network: {
          type: NetworkType.GHOSTNET,
        },
      });

      const userAddress = await wallet_.getPKH();
      await setup(userAddress);
      setBeaconConnection(true)
      setIsLoadingCheckConnected(false)
    } catch (error) {
      console.log(error);
    }
  };

  const disconnectWallet = async (): Promise<void> => {
    await wallet_.disconnect();
    setBeaconConnection(false);
  };

  const checkIfWalletConnected = async (wallet: any): Promise<{ success: boolean }> => {
    try {
      const activeAccount = await wallet.client.getActiveAccount();
      if (!activeAccount) {
        await wallet.client.requestPermissions({
          type: { network: NetworkType.GHOSTNET },
        });
      }
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false
      };
    }
  };

  useEffect(() => {

    (async () => {

      const wallet = new BeaconWallet({
        name: "NetiFi_Tez",
        network: {
          type: NetworkType.GHOSTNET,
          rpcUrl: "https://ghostnet.smartpy.io"
        }
      });

      setWalletInstance(wallet);
      setWallet_(wallet);
      const activeAccount = await wallet.client.getActiveAccount();
      if (activeAccount) {
        const userAddress = await wallet.getPKH();
        await setup(userAddress);
      }
      const isConnected = await checkIfWalletConnected(wallet);
      setBeaconConnection(isConnected.success)
      setIsLoadingCheckConnected(false)
    })();
  }, []);

  return (
    <button
      onClick={beaconConnection ? disconnectWallet : connectWallet}
      type="button"

      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      {isLoadingCheckConnected ? 'Checking connection...' : beaconConnection ? 'Disconnect Wallet' : 'Connect Wallet'}
    </button>


  );
};

export default ConnectButton;
