import { Fragment, useEffect, useState, Dispatch, SetStateAction } from 'react'
import { Listbox, Transition } from '@headlessui/react'

import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import beams from './assets/beams.jpeg'
import Navbar from './Nav/Navbar'
import Card from './Card/Card'
import RegisterForLeaseList from "./RegisterForLease";
import './App.css'
import { getRegisteredNfts, getUserLeasedNfts, getUserNotLeasedNfts, registerNft, leaseNft } from './services/leaseManager'

function classNames(...classes : any) {
  return classes.filter(Boolean).join(' ')
}
type NFTListProps = {
  nfts: any[]
  setSelectedToLease: Dispatch<SetStateAction<any>>;
}
function NFTList({ nfts, setSelectedToLease }: NFTListProps) {
  const [selected, setSelected] = useState<any>(null)
  useEffect(() => {
    if (nfts && nfts.length > 0) {
      setSelected(nfts[0]);
    }
  }, [nfts]);
  useEffect(() => {
    if (selected) {
      setSelectedToLease(selected);
    }
  }, [selected, setSelectedToLease]);
  if (!selected) {
    return <div>Loading NFTs...</div>;
  }

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Lease new:</Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <img src={selected.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                <span className="ml-3 block truncate">{selected.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {nfts.map((nft) => (
                  <Listbox.Option
                    key={nft.token_address}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={nft}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <img src={nft.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {nft.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

function App() {
  const [walletInstance, setWalletInstance] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [nfts, setNfts] = useState<any>(null);
  const [userNfts, setUserNfts] = useState<any>([]);
  const [userNotLeasedNfts, setUserNotLeasedNfts] = useState<any>([]);
  const [selectedToLease, setSelectedToLease] = useState<any>(null);


  useEffect(() => {
    const fetchNFTs = async () => {
      const registeredNfts = await getRegisteredNfts();
      setNfts(registeredNfts);
      if (userAddress != "") {
        const userNfts = await getUserLeasedNfts(userAddress);
        const notLeased = await getUserNotLeasedNfts(userAddress);
        setUserNfts(userNfts);
        setUserNotLeasedNfts(notLeased);
      }
    };

    fetchNFTs();
  }, [userAddress]);


  const register = async (tokenId: number, token_address: string) => {
    await registerNft(walletInstance, token_address, tokenId);
  }

  const leaseNftHandler = async () =>{
    await leaseNft(walletInstance, selectedToLease.token_address, selectedToLease.token_id)
  }

  return (
    <>
      <Navbar setWalletInstance={setWalletInstance} setUserAddress={setUserAddress} />
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
        <img src={beams} alt="" className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" width="1308" />
        <div className="absolute inset-0 bg-[url(./assets/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="relative bg-white px-10 pt-14 pb-12 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-4xl sm:rounded-lg sm:px-14">
          <NFTList nfts={nfts} setSelectedToLease={setSelectedToLease} />
          <br />
          <div className="flex justify-center">
            <button type="button" hidden={!selectedToLease} onClick={leaseNftHandler} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Lease</button>
          </div>
          <br />
          <div className="mx-auto max-w-lg">
            <div className="divide-y divide-gray-300/50">
              <div className="space-y-6 pb-8 text-base leading-7 text-gray-600">

                <p className="text-left text-2xl font-bold text-gray-800 mb-4">Your current leases:</p>
                <div className="flex space-x-4 justify-center">
                  {
                    userNfts.map((nft: any) => (
                      <Card key={nft.token_address} dueDate={nft.due_date} avatar={nft.avatar} />
                    ))
                  }
                </div>

                <p className="text-left text-2xl font-bold text-gray-800 mb-4">Register for lease:</p>
                <RegisterForLeaseList list={userNotLeasedNfts} register={register} />
              </div>


            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
