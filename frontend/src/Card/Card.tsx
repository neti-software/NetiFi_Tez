import React from 'react';

const Card: React.FC = () => {
    return (
        <div class="block rounded-lg bg-white shadow-lg dark:bg-neutral-700 w-1/3">
        <a href="#!">
          <img class="rounded-t-lg" src="https://i.seadn.io/s/raw/files/0cb2a10531bca3170be8b8a1473901c4.png?auto=format&dpr=1&w=3840" alt="" />
        </a>
        <div class="p-4">
          <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">#1010</h5>
          <p class="mb-2 text-base text-neutral-400 dark:text-neutral-200">leased until:</p>
        </div>
      </div>
    );
};

export default Card;
