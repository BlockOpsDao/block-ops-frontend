import React, { useState } from "react"
import { useEthers, useSendTransaction, useEtherBalance } from "@usedapp/core"
import { formatEther } from '@ethersproject/units'
import { BigNumber, utils } from "ethers"
import { LoadingSpinner } from "./LoadingSpinner"
import xlg from '../x-lg.svg'
import check from '../check-lg.svg'
import eth_logo from './images/ethereum-eth-logo.png'
import { AnalyticEventTracker } from "./AnalyticEventTracker";


export const DonationWidget = () => {
    const gaEventTracker = AnalyticEventTracker('DonationWidget');

    const { account } = useEthers()
    const { sendTransaction, state } = useSendTransaction()
    const balance = useEtherBalance(account)
    const etherBalance = balance === undefined ? 0 : balance
    const weiBalance = balance === undefined ? 0 : BigNumber.from(balance)
    const status = state.status
    const address = '0x2615e4520418848893f9F0d69Ecc84084119D0E5'


    const [amount, setAmount] = useState<number | string | Array<number | string>>(0)
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount = event.target.value === "" ? "" : Number(event.target.value)
        setAmount(newAmount)
    }

    const cardStyle = {
        width: '18rem',
    };
      

    const send = () => {
        let amountInWei = utils.parseEther(amount.toString())
        if (BigNumber.from(weiBalance) > amountInWei) {
            console.log('Sending Transaction')
            sendTransaction({ to: address, value: amountInWei })
        } else {
            console.log('Not enough Eth')
        }
        gaEventTracker('sent_donation')
    }

    const DonationResponse = () => {
        if (status === "None") {
            return <></>
        } else if (status === "Mining") {
            return <LoadingSpinner />
        } else if (status === "Success" ) {
            gaEventTracker('donation_success')
            return <img src={ check } className="mt-3" alt="checkmark" />
        } else {
            gaEventTracker('donation_failed')
            console.log(status, state)
            return <img src={ xlg } className="mt-3" alt="failure x" />
        }
    }
  
    return (
        <div className="card mx-auto d-block rounded-1 input-group mb-3" style={ cardStyle } >
            <img src={ eth_logo } className="card-img-top img-fluid" alt="cryptocurrency logo you are donating" />
            <div className="card-body">
                <h5 className="card-title">Donate</h5>
                <p className="card-text">All donations are greatly appreciated!</p>
                <p>Your Balance: {formatEther(etherBalance)}</p>
                <input onChange={ handleInputChange }></input><br />
                <button type="button" className="btn btn-primary mt-3" onClick={() => send()}>Send Ether</button>
                <br />
                <DonationResponse />
            </div>
        </div>
    )

}