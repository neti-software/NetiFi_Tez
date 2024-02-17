import React from 'react';
import Item from "./Item";

type List = {
    id: number,
    name: string
}

type ListProps = {
    list: Array<List>
    register: void;
};


const RegisterForLeaseList: React.FC = ({list, register} : ListProps) => {
    return (
        <div className="flex space-x-4 justify-center">
            {list.map(item => <Item key={item.id} id={item.id} name={item.name} register={register}/>)}
        </div>
    );
};

export default RegisterForLeaseList;
