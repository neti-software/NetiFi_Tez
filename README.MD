
# NeRINE by Neti
**Neti Rental Interface for NFT Ecosystem**

[![](https://i.ibb.co/F8Fy4X1/995f2fe6-f795-4a6f-b634-5d9a1cf4082a-ezgif-com-webp-to-jpg-converter.jpg)](https://github.com/neti-software/NetiFi_Tez) 

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

## Practical use cases for NeRINE? Let's name a few: 
- Items market in the computer gaming industry, which allows you to make money on the items you have in a safe way
- Subscription model through renting NFT, which allows any application to behave like a Web2 SaaS platform
- Safely borrow NFT to a friend (even for free) with the guarantee of return. The NFT can represent tickets, access to some resources, or whatever you need :)

## Where we are
Well, what we built during the hackathon is just proof of technology. We know how to make it work for all NFS on the Tezos chain, and we have ideas on how the approach can be monetized and profitable for NFT creators and also users. For us, it's just the beginning of the story.  

## Table of Contents (for the technical details)
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
Use the [smartpy.io environment](https://smartpy.io/ide?code=eJzlWt1P5DgSf@@_whtekrsQQa9uH5BaWm5gRqOdgRGDdCchFJmOGyw6ThS7YXpX@7@fv@L4IwlpmFnBXh6gY5fLVb8qV5Xt4LKuGgZoCRtWbwGkgNazVVOVbVPGUFmvIUMUYEW7gvN8jW8ELf85mzGwED8yNtu7vEO_VxScvb8EF4gwuAb74AMsMbmVbR85L91BZ3vHG3ZXNUfgDDHM6f69rpb3yzuICThBD2hd1SWnBO@qsoZkm4Iv1RqSYrb3H3RDMUNH4PHxMSN87D6tVixbVuVs9iuts7IqNms0K9AKfEKQIj5xnBzNAH_IiuWsytei@QiwbY246HxIg5ZVU8SSRjysukckh0XRIEoXnED_THUPLkQjgSwFkle@rAhr4JJZtJJZYqZVdJRBtqE9Uwd8FaV4pazh@HWcqho1kAngnqGAR9FNaDoGFepIqkeCmqCnk5CPJHSFnidhCLHwxtwjyYeRHsR4UPcA7HRQPD2X_LdcQ0qVj32GBN6iJuaE7zRy2uXEI1wxzzHBLM9jitarFMCCLwqLRDyiJysgg5m0wYWUmioVbvBtXsI6TsZGnGy4HrgifMgvB@Af4OcBYjk5J5L_nxbhN7QVUlxdzwytWGd1gx94WIgfMbvjoFcNR2ARNQgW@xVZb6PE0f9mg9eF8V2NQvuaiyl9NOpsCSmLHZrUWQHJzBlhKPn_st_yrgc7rDPX8dNwjKbecZhxNndY2@wOcM3LfY7rmj_ABkPClEb6JVN9Gk1Hcw@VVjI1vH0LIWHZpuaSIcOV5jVsYEmHkbA1CYJE@0Q@22hM5QaxTUMs05lAZBAGSqzFlQvPdfJy97SDtHZR9TLmoBZFagWg5FlW8FOFI4AHNYgocqmjXZAN5g6hDkg09CNMJDI6nFqSt9p0oTdQCxcBs8R3lRdbuE1N2rrt65h9HZrUSXDPszHLDEu9wlw5AjO3vWPmZd_GI55Imf4s@Ui06pPIj1bigWW1IUxn0vhw2GKSu2bqiKrSuzufbOOwfOPLnH27fn6MaNn60YFXls22rjBhjpM06BZTZtxD2HrEM9ru1CksXWHtVM4TqdKc3sH5v34R1UINl_exYeRb3mvHRZK43PEKkIoNVA7SBXk5TWNPiOQIBHYczPxZvaF3AYcJhctVMIfHxOm_HndfFeXEHE8FHwWVpDT26SXEVNmrWLzn2xHUT1Rs5KxIl4A55TOTggrTkeoxHarAkpBbT5OpoykiBWpCAsmzMXqM1hoDxdBlIwODENMrwUIXmAJsWxIPuOzISB5UAn_up_e2IJPUn4xpMoaanOGrTE0BcE5x8HrB08k3Ov9yehY9rb4zlQ6Wgeoma75etc0mccjuimk@3ZvGkOLzDGNiLb2sTfBiAPo9PkhSp7udPduQxwbWOa1KFI966OjMrvv2Te5R7Db_SOKUfF@WNf9mrrhT1NIHGs@KWaMeYeHY5w529zN8cWLe_54Vz7WaS5eQCrDXIpQiMnUFF_Gy2aBJ62dDvsMKsml_bN0ps2y7MF9a@WWSm3vyQbmJWWdhsFj451d8X3R2fpl_Oj3@epp_Pj47_nB6kR@ffP54FoVAfD9ZFTunsT9yHb7d0KV0_AEptBeo@dsFaucYLz39_7cmfffp_OvpyY5V6aT8dvhEgjv8AdWW7cB_9dw_uNKT87@mRCq36MG1yzlZb79Ua7zcxiXEJDsWieEjYahZwSUav4Fxl6yXaXu4Zc74ngMQfRyZ1VKg8eMMAku0iKQI8qxyXw2KuAU3tbhkpWafvhA1hNXe@oRsH1s2rvly63TSbRgYpdbstNsnc7avjz5FkdLnJ4ZPar1dscy5v8CU4opIig0H_HpsN7LbEfDyDi3vc_bNYGjNR1u_UEtpoPIKlBq6Inki9AZXmmO7gmmh2L_HNYiNXbfgFegxlOcD3Tmi0rZbvcFQSIpg@JU36loUc@p4wpXsKGSnysCBW4ZBB19os6hj5BARUDVTRosDchC9P57nl__NT07PPvLU5TBDPCYNC@0Ur7ZA3vxm8XQ49@s77lLiUYdf9lzdcYO1v@ycxjNNL@PQyomGRdTf3I4Xx5fnF9FLFiamgzfD3Qodun4LgdwluvRfLYwZp0@0SXs8_7bOuWEcvVxMg3tB76JYb5eE2BxLuT_ClCkxY9tcPRukYL3qVW@tVy2jJrDT8AeeyMRXPVb@Tf3cnKp0erZi@tdnjgx_G8_PJWJQbXLXqLjtvNZud4ru3m8q7PnGMngrYbajFC4XT3GfmVdyDFQc_iil1mzGY3VkvsWK5L0PJhw1UUvk@ZGyyq_6noKTMJ2uBbbiNb8VhFgYywKJLhGBDa5U5pZ0bVMctdYFl7ydFydX8jOvVH7tJQROzRdW1jpqvy5p2cHlUlwRxpHssFY@j2a4xqj9ssElNp19A@ajI@bWEAV5qT7P4aNaeTPnsx0pWZtnOdQhOv9cuKwMBXeHg7ws9CdwJbxHxjdiVeUJENWXb_vg6yOP3xzIgsta8pJ2ccjX_7a8qdaLSPVZocTYy5bbLDg_XHS1ldPzx8FRh1ur4p8uzZVW4tptdhTur0KeIEl6gTR6darudVfDPNKpNcb_Kv4gqFTHLrtF0TRBcpMCD9z24ftsyzIj99gB1n232AaBbofX3VSnIFd5uuPFmx7gmgsrav7Ehq29sLZg44tvADYXFnPX7XvS8CcE9nlBp8NgfTqEcSeLueObYDHPsQOQOkPtZc2GxH5_0utuLQp8l@l4nopiG3F0uM8hlfBP9j8nnvwd_E5uvx0AlYv1oneztSL1gPOp0@4eZCa61xCMu7tVoPS8D3nLY_SZxJC3ONq_Md@Zf0_nmY94j77uCLH00RNVjoufa9L23uR1epLXb6HR72OTYHlDSLgfGPcvJy33kLbd6toHb2ch_RXJvy2psgfU4NU27vjqYw2xX7k6uAY_LfrrtLA6m8Iq0PGFbOYv4LPQ37B3LP4H5JixMg--) to deploy smart contracts and run tests.


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
