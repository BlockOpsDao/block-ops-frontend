import Web3 from "web3";
import { GetEthereum } from "./GetEthereum";

export const GetWeb3 = async () => {

    const ethereum = await GetEthereum()
    let web3

    if (ethereum) {
        web3 = new Web3(ethereum)
    } else if (window.web3) {
        web3 = window.web3
    } else {
        const provider = new Web3.providers.HttpProvider(
            "http://127.0.0.1:8545"
        );
        web3 = new Web3(provider)
    }

    return web3
}