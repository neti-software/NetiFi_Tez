import React from 'react';
import { Fragment, useState } from 'react'
import { TezosToolkit } from "@taquito/taquito";
import ConnectButton from '../Wallet/WalletConnection'

const Navbar: React.FC = () => {
    const [Tezos, setTezos] = useState<TezosToolkit>(
        new TezosToolkit("https://ghostnet.ecadinfra.com")
      );
      const [contract, setContract] = useState<any>(undefined);
      const [publicToken, setPublicToken] = useState<string | null>(null);
      const [wallet, setWallet] = useState<any>(null);
      const [userAddress, setUserAddress] = useState<string>("");
      const [userBalance, setUserBalance] = useState<number>(0);
      const [storage, setStorage] = useState<any>(undefined);
      const [copiedPublicToken, setCopiedPublicToken] = useState<boolean>(false);
      const [beaconConnection, setBeaconConnection] = useState<boolean>(false);

      // Contract Address
      const contractAddress: string = "KT1JvMfCt618vPN4h8TyNreneoCVqfk7swUn";

    return (
<nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="https://neti-soft.com/" className="flex items-center space-x-3 rtl:space-x-reverse logo">
      <img src="https://neti-soft.com/neti-logo.svg" className="h-8" alt="Neti" />
  </a>
  <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
  <ConnectButton
            Tezos={Tezos}
            setContract={setContract}
            setPublicToken={setPublicToken}
            setWallet={setWallet}
            setUserAddress={setUserAddress}
            setUserBalance={setUserBalance}
            setStorage={setStorage}
            contractAddress={contractAddress}
            setBeaconConnection={setBeaconConnection}
            wallet={wallet}
          />
      <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>

  </div>
</nav>
    );
};

export default Navbar;
