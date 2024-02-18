import React from 'react';
import Item from "./Item";

type List = {
    token_address: string,
    tokenId: number,
    name: string,
    avatar: string
}

type ListProps = {
    list: Array<List>
    register: (tokenId: number, token_address: string) => void;
};


const RegisterForLeaseList: React.FC<ListProps> = ({list, register} : ListProps) => {
    return (
        <div className="flex space-x-4 justify-center">
            {list.map(item => <Item key={item.token_address} name={item.name} token_address={item.token_address} tokenId={item.tokenId} avatar={item.avatar} register={register}/>)}
        </div>
    );
};

export default RegisterForLeaseList;
