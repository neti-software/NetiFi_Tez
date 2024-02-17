import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'

import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import beams from './assets/beams.jpeg'
import grid from './assets/grid.svg'
import Navbar from './Nav/Navbar'
import Card from './Card/Card'
import RegisterForLeaseList from "./RegisterForLease";
import './App.css'

const people = [
  {
    id: 1,
    name: 'Bored Ape Yacht Club',
    avatar:
      'https://image.binance.vision/editor-uploads-original/9c15d9647b9643dfbc5e522299d13593.png',
  },
  {
    id: 2,
    name: 'CryptoPunk',
    avatar:
      'https://i.seadn.io/s/raw/files/f3564ef33373939b024fb791f21ec37b.png?auto=format&dpr=1&w=3840',
  }
]

const list = [
  {
    id: 0,
    name: 'name0'
  },
  {
    id: 1,
    name: 'name1'
  },
  {
    id: 2,
    name: 'name2'
  },
  {
    id: 3,
    name: 'name3'
  }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function NFTList() {
  const [selected, setSelected] = useState(people[0])

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
                {people.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <img src={person.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {person.name}
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
  const [count, setCount] = useState(0)

  const register = (id) => {
    console.log('register', id)
  }

  return (
    <>
      <Navbar /> 
      <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
        <img src={beams} alt="" class="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" width="1308" />
        <div class="absolute inset-0 bg-[url(./assets/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div class="relative bg-white px-10 pt-14 pb-12 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-4xl sm:rounded-lg sm:px-14">
        <NFTList />
        <br />
        <div className="flex justify-center">
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Lease</button>
          </div>
          <br />
          <div class="mx-auto max-w-lg">
            <div class="divide-y divide-gray-300/50">
              <div class="space-y-6 pb-8 text-base leading-7 text-gray-600">

              <p class="text-left text-2xl font-bold text-gray-800 mb-4">Your current leases:</p>
                <div class="flex space-x-4 justify-center">
                <Card />
                <Card />

                </div>

                <p className="text-left text-2xl font-bold text-gray-800 mb-4">Register for lease:</p>
                <RegisterForLeaseList list={list} register={register} />
              </div>


            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
