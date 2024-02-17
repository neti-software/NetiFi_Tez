import React from 'react';

type ItemProps = {
    id: number;
    name: string;
    register: void;
};

const Item: React.FC = ({id, name, register}: ItemProps) => {
    return (
        <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-700 w-1/3">
        <a href="#!">
          <img className="rounded-t-lg" src="https://i.seadn.io/s/raw/files/0cb2a10531bca3170be8b8a1473901c4.png?auto=format&dpr=1&w=3840" alt="" />
        </a>
            <p className="mb-2 text-base text-neutral-400 dark:text-neutral-200 text-center">{name}</p>
        <div class="p-4">
            <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => register(id)}>Register</button>
        </div>
      </div>
    );
};

export default Item;
