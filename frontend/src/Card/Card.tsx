import React from 'react';
type CardProps = {
  dueDate: Date;
  avatar: string;
};

const Card: React.FC<CardProps> = ({ dueDate, avatar }) => {

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-based
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
  return (
    <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-700 w-1/3">
      <a href="#!">
        <img className="rounded-t-lg" src={avatar} alt="" />
      </a>
      <div className="p-4">
        <p className="mb-2 text-base text-neutral-400 dark:text-neutral-200">Leased until:</p>
        <p>{formatDate(dueDate)}</p>
      </div>
    </div>
  );
};

export default Card;