import smartpy as sp
from smartpy.templates import fa2_lib as fa2

t = fa2.t
#Thezos NFT Rental - Gaming NFT Item Rentals
#Author: Neti - Blockchain Development Company, Poland
#Website: www.neti-soft.com

@sp.module
def LeaseNFT():
    nft_to_lease: type = sp.record(
        token_address=sp.address, token_id=sp.nat, lease_contract=sp.address
    )
    nft_lease_status: type = sp.record(token_id=sp.nat, status=sp.string)
    nft_operator: type = sp.record(
        token_address=sp.address,
        token_id=sp.nat,
        lease_contract=sp.address,
        owner=sp.address,
    )
    nft_transfer: type = sp.record(
        token_address=sp.address, token_id=sp.nat, from_=sp.address, to_=sp.address
    )
    nft_status: type = sp.record(
        token_id=sp.nat, status=sp.string, token_address=sp.address
    )

    class LeaseManager(sp.Contract):
        def __init__(self, admin):
            self.data.leaseRecords = sp.big_map()
            self.data.leaseDutation = 60 * 3
            self.data.admin = admin
            self.data.leaseRecordKeys = []

        @sp.private(with_storage="read-only")
        def build_operator(self, operator_data):
            sp.cast(operator_data, nft_operator)

            operator_perm = sp.record(
                owner=operator_data.lease_contract,
                operator=operator_data.lease_contract,
                token_id=operator_data.token_id,
            )
            add_op_variant = sp.variant.add_operator(operator_perm)

            contract = sp.contract(
                t.update_operators_params,
                operator_data.token_address,
                "update_operators",
            )
            return sp.record(contract=contract, params=[add_op_variant])

        @sp.private(with_storage="read-only")
        def build_lease_status(self, status_data):
            sp.cast(status_data, nft_status)
            contract = sp.contract(
                nft_lease_status, status_data.token_address, "set_lease_status"
            )
            return sp.record(
                contract=contract,
                params=sp.record(
                    status=status_data.status, token_id=status_data.token_id
                ),
            )

        @sp.private(with_storage="read-only")
        def build_transfer(self, transfer_data):
            sp.cast(transfer_data, nft_transfer)
            contract = sp.contract(
                t.transfer_params, transfer_data.token_address, "transfer"
            )
            tx = sp.record(
                to_=transfer_data.to_,
                token_id=transfer_data.token_id,
                amount=sp.nat(1),
            )

            transfer = sp.record(from_=transfer_data.from_, txs=[tx])
            return sp.record(contract=contract, params=[transfer])

        @sp.entrypoint
        def register(self, nft_data):
            sp.cast(nft_data, nft_to_lease)
            leaseRecordsKey = sp.sha256(sp.pack((nft_data.token_address, nft_data.token_id)))
            if not self.data.leaseRecords.contains(leaseRecordsKey): 
                self.data.leaseRecordKeys.push(leaseRecordsKey)
            self.data.leaseRecords[
                leaseRecordsKey
            ] = sp.record(
                lease_data=sp.record(
                    token_data=nft_data,
                    is_leased=False,
                    due_date=sp.add_seconds(sp.now, self.data.leaseDutation),
                ),
                owner=sp.sender,
                leaser=nft_data.lease_contract,
            )

            operatorTrx = self.build_operator(
                sp.record(
                    token_address=nft_data.token_address,
                    token_id=nft_data.token_id,
                    lease_contract=nft_data.lease_contract,
                    owner=sp.sender,
                )
            )

            leaseStatusTrx = self.build_lease_status(
                sp.record(
                    token_address=nft_data.token_address,
                    token_id=nft_data.token_id,
                    status="OPEN",
                )
            )
            transferTrx = self.build_transfer(
                sp.record(
                    token_address=nft_data.token_address,
                    token_id=nft_data.token_id,
                    from_=sp.sender,
                    to_=nft_data.lease_contract,
                )
            )
            sp.transfer(
                operatorTrx.params, sp.tez(0), operatorTrx.contract.unwrap_some()
            )

            sp.transfer(
                leaseStatusTrx.params, sp.tez(0), leaseStatusTrx.contract.unwrap_some()
            )

        @sp.entrypoint
        def lease(self, nft_data):
            sp.cast(nft_data, nft_to_lease)

            transferTrx = self.build_transfer(
                sp.record(
                    token_address=nft_data.token_address,
                    token_id=nft_data.token_id,
                    from_=nft_data.lease_contract,
                    to_=sp.sender,
                )
            )

            sp.transfer(
                transferTrx.params, sp.tez(0), transferTrx.contract.unwrap_some()
            )

            self.data.leaseRecords[
                sp.sha256(sp.pack((nft_data.token_address, nft_data.token_id)))
            ].leaser = sp.sender
            self.data.leaseRecords[
                sp.sha256(sp.pack((nft_data.token_address, nft_data.token_id)))
            ].lease_data.is_leased = True

        @sp.entrypoint
        def unlease(self, nft_data):
            sp.cast(nft_data, nft_to_lease)
            leaseRecordsKey = sp.sha256(sp.pack((nft_data.token_address, nft_data.token_id)))
            owner = self.data.leaseRecords[
                leaseRecordsKey
            ].owner
            assert sp.sender == self.data.admin, "NOT_LEASE_MANAGER_ADMIN"
            leaser = self.data.leaseRecords[
                leaseRecordsKey
            ].leaser
            

            transfer1Trx = self.build_transfer(
                sp.record(
                    token_address=nft_data.token_address,
                    token_id=nft_data.token_id,
                    from_=leaser,
                    to_=nft_data.lease_contract,
                )
            )

            transfer2Trx = self.build_transfer(
                sp.record(
                    token_address=nft_data.token_address,
                    token_id=nft_data.token_id,
                    from_=nft_data.lease_contract,
                    to_=owner,
                )
            )

            leaseStatusTrx = self.build_lease_status(
                sp.record(
                    token_address=nft_data.token_address,
                    token_id=nft_data.token_id,
                    status="CLOSED",
                )
            )
            sp.transfer(
                transfer1Trx.params, sp.tez(0), transfer1Trx.contract.unwrap_some()
            )

            sp.transfer(
                transfer2Trx.params, sp.tez(0), transfer1Trx.contract.unwrap_some()
            )

            sp.transfer(
                leaseStatusTrx.params, sp.tez(0), leaseStatusTrx.contract.unwrap_some()
            )

            self.data.leaseRecords[
                sp.sha256(sp.pack((nft_data.token_address, nft_data.token_id)))
            ].lease_data.is_leased = False

    class LeaseOnlyPolicy(main.AdminInterface):
        def __init__(self, lease_contract):
            main.AdminInterface.__init__(self)
            self.private.policy = sp.record(
                name="lease-only-policy", supports_operator=True, supports_transfer=True
            )
            self.data.lease_contract = lease_contract
            self.data.status = sp.big_map()
            self.data.operators = sp.cast(
                sp.big_map(), sp.big_map[t.operator_permission, sp.unit]
            )

        @sp.private(with_storage="read-only")
        def check_tx_transfer_permissions_(self, params):
            sp.cast(
                params,
                sp.record(
                    from_=sp.address,
                    to_=sp.address,
                    token_id=sp.nat,
                ),
            )
            if (
                self.data.status.contains(params.token_id)
                and self.data.status[params.token_id] == "OPEN"
            ):
                assert (
                    self.data.lease_contract == params.from_
                ) or self.data.lease_contract == params.to_, "FA2_TX_DENIED"
            else:
                assert (sp.sender == params.from_) or self.data.operators.contains(
                    sp.record(
                        owner=params.from_, operator=sp.sender, token_id=params.token_id
                    )
                ), "FA2_NOT_OPERATOR"

        @sp.private(with_storage="read-only")
        def is_operator(self, operator_permission):
            sp.cast(self.data.operators, sp.big_map[t.operator_permission, sp.unit])
            return self.data.operators.contains(operator_permission)

        @sp.entrypoint
        def set_lease_status(self, status):
            sp.cast(status, nft_lease_status)
            assert self.is_administrator_(), "FA2_NOT_ADMIN"
            self.data.status[status.token_id] = status.status

    class GameItem(main.Admin, LeaseOnlyPolicy, main.Nft, main.MintNft):
        def __init__(self, metadata, ledger, token_metadata, lease_contract, admin):
            main.MintNft.__init__(self)
            main.Nft.__init__(self, metadata, ledger, token_metadata)
            LeaseOnlyPolicy.__init__(self, lease_contract)
            main.Admin.__init__(self, admin)

if "templates" not in __name__:

    @sp.add_test()
    def test_game_item():
        scenario = sp.test_scenario("GameItem Test", [fa2.t, fa2.main, LeaseNFT])
        admin = sp.test_account("admin")
        recipient = sp.test_account("recipient")
        recipient2 = sp.test_account("recipient2")
        lease_manager = LeaseNFT.LeaseManager(admin.address)


        scenario += lease_manager
        tok0_md = fa2.make_metadata(name="Game Item - Sword", decimals=1, symbol="Sword")

        game_item = LeaseNFT.GameItem(
            sp.big_map(),
            {0: recipient.address},
            [tok0_md],
            lease_manager.address,
            lease_manager.address,
        )
        scenario += game_item

        # transfer nft token to lease contract
        tx = sp.record(
            to_=lease_manager.address,
            token_id=0,
            amount=sp.nat(1),
        )

        transfer = sp.record(from_=recipient.address, txs=[tx])
        game_item.transfer([transfer], _sender=recipient, _valid=True)

        # register nft token in lease contract
        lease_manager.register(
            sp.record(
                token_address=game_item.address,
                token_id=0,
                lease_contract=lease_manager.address,
            ),
            _sender=recipient
        )#.run(sender=recipient)

        # transfer registered nft token to admin user - invalid
        tx = sp.record(
            to_=admin.address,
            token_id=0,
            amount=sp.nat(1),
        )

        transfer = sp.record(from_=recipient.address, txs=[tx])
        game_item.transfer([transfer], _sender=recipient, _valid=False)

        # lease registered nft token by recipient2
        lease_manager.lease(
            token_address=game_item.address,
            token_id=0,
            lease_contract=lease_manager.address,
            _sender=recipient2
        )

        # transfer leased nft token to admin user by recipient2 - invalid
        tx = sp.record(
            to_=admin.address,
            token_id=0,
            amount=sp.nat(1),
        )

        transfer = sp.record(from_=recipient2.address, txs=[tx])
        game_item.transfer([transfer], _sender=recipient2, _valid=False)

        # unlease leased nft token by recipient2 - not valid
        lease_manager.unlease(
            token_address=game_item.address,
            token_id=0,
            lease_contract=lease_manager.address,
            _sender=recipient2,
            _valid=False
        )

        # unlease leased nft token by recipient
        lease_manager.unlease(
            token_address=game_item.address,
            token_id=0,
            lease_contract=lease_manager.address,
            _sender=admin
        )

        # transfer unleased nft token by recipient to admin - valid
        tx = sp.record(
            to_=admin.address,
            token_id=0,
            amount=sp.nat(1),
        )

        transfer = sp.record(from_=recipient.address, txs=[tx])
        game_item.transfer([transfer], _sender=recipient, _valid=True)

        scenario.verify(game_item.data.ledger[0] != lease_manager.address)
        scenario.verify(game_item.data.ledger[0] != recipient.address)
        scenario.verify(game_item.data.ledger[0] != recipient2.address)
        scenario.verify(game_item.data.ledger[0] == admin.address)
