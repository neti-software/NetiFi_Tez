# NFT lending platform for GameFi that allows users to borrow Game Item represented by NFT

# NeRINE by Neti

[![](https://i.ibb.co/YBKd41Z/995f2fe6-f795-4a6f-b634-5d9a1cf4082a.webp =150x150)](https://github.com/neti-software/NetiFi_Tez) 

## The problem
Hi, we are Neti - a software development boutique hooked on blockchain. We believe that NFT tokens (apart from the art) have a huge utility potential. But why would you have to buy NFT to use it? You can borrow a bike from your friend without any collateral, you can borrow a laptop or jacket. Why not NFT?

## The solution
With the rescue comes **NeRINE - Neti Rental Interface for NFT Ecosystem**. It's the first solution on the market that offers the possibility of safely renting NFTs without the need to pay a deposit while guaranteeing both parties the return of the item on agreed terms. Most importantly, you don't need to lock any deposit; only the amount agreed for renting. Interesting?

## Architecture.
- The owner of the NFT registers the token as "ready to be rented" and specifies the deal's details: time of rent, price, etc. 
- Our "lease manager" (a smart contract) sets itself as the operator. It means it can transfer NFT to other users. 
- The token is placed on the marketplace so that everyone can borrow it just for the agreed price and for an agreed period 
- After borrowing the token, the user can use its utility for the agreed period
- When the rental period finishes, our "leas manger" will ensure that the token is returned to the original owner.

## How is this magic possible?
It works with the usage of Tezos Custom Policy, the functionality that is present only on the Tezos chain. It allows us to set the operator's role to the smart contract for the given NFT and enforce return through that mechanism later on. 

## What is so unique in this approach?
- Users don't need to put collateral to borrow the NFT
- The owner of the NFT has a guarantee that after the agreed period, the token will be returned to him.

Practical use cases for NeRINE? Let's name a few: 
- Items market in the computer gaming industry, which allows you to make money on the items you have in a safe way
- Subscription model through renting NFT, which allows any application to behave like a Web2 SaaS platform
- Safely borrow NFT to a friend (even for free) with the guarantee of return. The NFT can represent tickets, access to some resources, or whatever you need :)

## Where we are
Well, what we built during the hackathon is just proof of technology. We know how to make it work for all NFS on the Tezos chain, and we have ideas on how the approach can be monetized and profitable for NFT creators and also users. For us, it's just the beginning of the story.  

## Table of Contents
- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Key Features](#key-features)
- [Future Enhancements](#future-enhancements)
- [Installation, Setup and Testing](#installation-setup-and-testing)
- [Usage: LeaseManager Contract Entrypoints](#usage-leasemanager-contract-entrypoints)
- [Testing the LeaseManager Contract](#testing-the-leasemanager-contract)
- [Contributing](#contributing)
- [Contact](#contact)
## Technology Stack
- **SmartPy**: A language for developing smart contracts on the Tezos blockchain.
- **Smartpy.io IDE**: An integrated development environment for SmartPy.

## Key Features
1. **NFT Registration in Lease Manager Contract**: 
   - Users have the capability to register their NFTs for rental purposes. Upon successful registration, the NFT's status is set to 'OPEN' for rental, and it becomes non-transferable by the owner. The transfer of the NFT is exclusively managed by the Lease Manager Contract.

2. **Renting NFTs**: 
   - Users can rent NFTs for a predetermined duration as defined in the Lease Manager Contract. During the rental period, the lessee has usage rights but cannot transfer the NFT to other parties.

3. **Returning NFTs**: 
   - Post the expiration of the rental period, the NFT is returned to its original owner by the Lease Manager Contract. Subsequently, the NFT is unlocked and deregistered from the Lease Manager Contract, enabling the owner to transfer it freely.

- **Secondary Market for NFT Rentals**:
   - Future enhancements include the development of a secondary market where users can rent out NFTs they have leased to other users. This will create a dynamic and user-driven rental ecosystem. A modified Tezos wallet will be introduced to facilitate these transactions, ensuring a secure and efficient process. The system will automatically distribute fees between the original NFT owner and the Rental platform, maintaining a fair revenue-sharing model.


## Installation, Setup and Testing
Use the [smartpy.io environment](https://smartpy.io/ide?code=eJzlWltP5DgWfq9f4S1ekpkQQe3MPCCV1GxDj5CmATElzWgQikzFBRaJE8Uu6JrV_vf1LY4vSaiC7hnYrYduYh8fn_Oda@zgsq4aBmgJG1ZvAKSA1pNVU5XtUMpQWReQIQqwol3BWVbgW0HL_5xMGJiLP1I22Vvcoz8rCs4_LcAVIgwWYB_8DEtM7uTYGeelJ@hk73jN7qvmCJwjhjndv4pq@bC8h5iAE_SIiqouOSX4WJU1JJsEXFYFJPlk7zd0SzFDR@Dp6SklfO0@rVYsXVblZPKB1mlZ5esCTXK0Ar8gSBHfOIqPJoD_yIplrMoKMXwE2KZGXHS@pEHLqskjSSN@rHpAJIN53iBK55xA_5noGZyLQQJZAiSvbFkR1sAls2gls9hsq@gog2xNe7YO@CpK8UhZw_HrOFU1aiATwL1AAY@i29BMDCrUkVRPBDXBTCchX0noCr1MwhBi4Y2ZR5INIz2I8aDuAdjJoHh6L_nfsoCUKh_7DAm8Q03ECT9q5LTLiZ9wxSzDBLMsiygqVtac@ImhNIcMphL8KykuVbLf4rushHUUj604WXMFcEX4kn_@dHAAvgOzHyZmgQiKusGPPIajJ8zuOUJVw8WdTxsE8_2KFJtp7Ah7u8ZFbhxNipyA9jET@_oa1OkSUhY5NInjrvHEWWEo@f9lv5lcd3NYp66XJuEaTb3jMuMZ7rJ22F3gmoQ7CNc1e4QNhoQpjfRDquY0mo7mHiqtZGp5@xRCwtJ1zSVDhivNatjAkg4jYWsSRHT7m_psp2MqN4itG2KZzmQNgzBQYs2vXXhu4te7p51RtYuqhzEHtSgSK1vEL7KCn9cdATyowZQil3q6C7LB3iHUAYmGfoSJREbnPkvyVpsuTwZq4TxgFvuu8moLt3VEW7d9HLOvQ5M41ehlNmapYakjzJUjMHM7O2Ze9mU844n65u@SjWSrPon8bCV@sKzWhOmyFx0OW0xy10wdUVUtdveTYxyWLzzM2Zebl@eIlq2fHXgb2GzqChPmOEmD7jBlxj2ErUc8o51OnC5wtKzqQnwd4CgahXs4@_EnUfBruHyIDHvfH7xxnMexu@fNuCuojCE4PBfIagNJaXTtJcRU6Z7PP_E@HPUT5Wu5K9K9T0b5ziSnQmFSPSVDHUgccusZMg0kRSRHTUggeTZGj9G6PdBYLBoZZEJMr53pM@fzwLa94IChR1byAA28oJ_e6723Un9rTOMx1OQOv8o0HwDnFNq3C54uZNOLy9Pz6fPqO1vpxBOobirQ21XbvB0N2V0xzbb3pjGk@D7DmFihl7bFUixAf0YHceJMt7una_LUwDqjVYmiUQ8d3dl1377NPYrd9h8pQpLv6yrQ_5gr7pS19Jv8i3LWqEdYOPa5gz39Al_8O_oEtZduxxRgb0UoRWT6Ci7iolmjreJnTb5CBNm0sg62ofOXwyF3d88FKDcaa8WyjMffFa5OP55dnp2eL7Lzi0V28dv56ZX72tCZ_G_0uP4Edfh@M5RS6xtUyl6gZu8XqJ1TufTy_9_W8@MvF7@enuzYfG5Vxg6fqWOH36Cpsh34r977Gzd0cv@3VC_lm3hwrXBBis1lVeDlJiohJulxXmJyRhhqVnCJxm4Y_Ispr6D2cEvdG4oQKn2Cl9ZSoPFTCwJLNJ9KEeTx3r5aNOUWXNfiEpGa1_G5aBWs8dYn5PhY2Ljmy6wDPXdgYJWK2e0uWcxxuD4tFL1In58YPon1dM1S58gfU4orIinWHPCbsZeO3U5Nl_do@ZCxLwZDaz_a@oUKpYEGK1Bq6FbhmdQbXNmNNf_bpWL_ntIgNnZDgVegx1CeD8jcwQOCRkrbLnqDpZDkwfJrb9WN6PLUKYQr2VHITvWGAwfzgw4@12ZRJ68hIqBqtlktzpTB9NPxLFv8np2cnp_x0uUwQzwnDQttGllfIG9_Ezwdzv36jruU@KkzLnuv7lTBeo3snMYzTS_j0MqxhkU25ZenV8eLC96XvyIwMR28TO0idOjGKgRyl@zSfxo_Zpw@0bZ6lfMvuJxLudH7uCS4SvPuVpXLSbE5llAULkyZEjOyzXV88vnMi7sgXnXUW_GqZdQEdhn@mRcy8dWKVX8TvzYnqpyer5j@6zNHhj@N1@cSMajeZQuU33Vea487TTeQavcVcr3fWAVvJUx3lMLl4inuM_NajoGOw1@l1JpMJjxZT83HRlNAKgYw4bCJZiLLjpRZPuj7CE7CdL0W4IrH7E4QYmEtCyW6RAQ2uFKlW9K1Q9G0NS9Y8HHenVzL75gS@TmTkDgxnxBZgaTULNUnH5xtS5I6n4J09FJBa3u4XIpruGgqJ6xUwdMfrjFqvx5wic1k34LZ6IrZ1Apgg8f3c1cTQ8E94CArc_1VVwkfkHGHSDV2ErI_UFNxyHK@S8m71_khD_VNeVsVav7AktMYxkbLhJafGLouypn598FRp3DbNPzHpbnWst@4w46e_f3GMyRxL35Grw7eve7elOc0FU38X8UfBD3p2E2waI@2kNwUuwN3fPiy1_KGkUveAOu@K949A0H3Mmfd46bNmkSqKnf8EvAICy6vaPB7fKSPUQKykEtms7EM0N4LWwbg8TdgABdgc6Xs@@TwTb19xtDpMNjTDlmrk8Vc_21hey9EApA6k@_1miLuddwWBf5m6viwSmRrcSK5zyGV8G_tyXLxG_TgF_udfGV3AFQu1ove7cZK1gPOpw7Ce5DZ0r2GYNzdrQKlZ33IWx6jzzGGvMXR_p35zuxrOs9sxHv0TUiIpY@eaIxc_FyTtlcqb9OTvHkLjX4f2wqW94jEMyGlZR_SuIuwffB@gumbJGKvAWgbtPQRNXi1iTq@@jhEvOdcH9yAf8z7u76w19uGVaDjK9nMXsFnPgeOlePJfwGjw3BN) to deploy smart contracts and run tests.


# Usage: LeaseManager Contract Entrypoints

The `LeaseManager` contract in the NeRINE has several entrypoints, each requiring specific data inputs. Below are the details for each entrypoint.

## Entrypoint: `register`

### Description
Registers an NFT for rental.

### Required Data
- `token_address`: Address of the NFT token (type: `sp.address`)
- `token_id`: Unique identifier of the NFT (type: `sp.nat`)
- `lease_contract`: Address of the lease contract (type: `sp.address`)

## Entrypoint: `lease`

### Description
Allows a user to lease a registered NFT.

### Required Data
- `nft_data`: A record with the following fields
  - `token_address`: Address of the NFT token (type: `sp.address`)
  - `token_id`: Unique identifier of the NFT (type: `sp.nat`)
  - `lease_contract`: Address of the lease contract (type: `sp.address`)

## Entrypoint: `unlease`

### Description
Returns the leased NFT to the original owner after the rental period.

### Required Data
- `nft_data`: A record with the following fields
  - `token_address`: Address of the NFT token (type: `sp.address`)
  - `token_id`: Unique identifier of the NFT (type: `sp.nat`)
  - `lease_contract`: Address of the lease contract (type: `sp.address`)

Ensure that all data provided to the entrypoints follow the specified types and formats. Incorrect or invalid data may result in transaction failures or unintended behavior.

# Testing the LeaseManager Contract

The `LeaseManager` contract includes several tests to ensure its functionality and robustness. These tests simulate various scenarios to validate the contract's behavior under different conditions. Below is an overview of what each test is designed to accomplish.

## Test: Registering and Leasing NFT

### Objective
To verify that an NFT can be successfully registered for leasing and then leased to a user.

### Procedure
1. A test NFT is created and registered in the `LeaseManager` contract.
2. The test simulates a user leasing the NFT.
3. Checks are performed to ensure the NFT's status changes appropriately and that it cannot be transferred outside the contract's control during the lease.

## Test: Returning Leased NFT

### Objective
To confirm that a leased NFT is correctly returned to the owner after the rental period.

### Procedure
1. An NFT is leased as per the first test.
2. The test simulates the passing of the rental period.
3. The contract's `unlease` function is invoked to return the NFT.
4. Checks are performed to ensure the NFT is returned to the owner and its status updated accordingly.

## Test: Invalid Transfer Attempts

### Objective
To test the contract's ability to prevent invalid transfers of a leased NFT.

### Procedure
1. An NFT is leased to a user.
2. Attempts are made to transfer the NFT to another user, which should be invalid during the lease period.
3. Checks are performed to ensure these transfer attempts fail as expected.

## Test: NFT Status Updates

### Objective
To ensure that the NFT's status is accurately updated throughout the lease process.

### Procedure
1. The status of an NFT is monitored as it goes through registration, leasing, and return.
2. Checks are performed to ensure the status reflects the current state of the NFT (e.g., 'OPEN', 'LEASED').


## Contributing
Contributions to the NeRINE project are welcome. Please follow standard open-source contribution guidelines.

## Contact
For more information:
- **Website**: [www.neti-soft.com](http://www.neti-soft.com)
- **Email**: [contact@neti-soft.com](mailto:contact@neti-soft.com)
