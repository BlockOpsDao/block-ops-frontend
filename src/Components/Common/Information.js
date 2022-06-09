import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Table } from "reactstrap";
import DisplayNFT from "./DisplayNFT";
import { useEthers } from "@usedapp/core";
import map from "../../build/deployments/map.json"

const Information = () => {

    const { chainId } = useEthers();

    const BlockOpsDescription = () => {
        return (
            <Card>
                <CardHeader className="align-items-center d-flex">
                    <h4 className="card-title mb-0 flex-grow-1">What is BlockOps?</h4>
                </CardHeader>
                <CardBody className="p-4">
                    For the entire sales-pitch, I recommend scrolling through the <a href="/dashboard" className="text text-danger">Dashboard</a> page. 
                    Sales aside, Block Ops provides an alternative way of earning a living for developers and a new work
                    intake process for entities. <br /><br />

                    To play on the "Proof-of-Work"-pun, the BlockOps project uses standard <span className="text text-danger">ERC-721 NFTs</span> to represent both
                    Projects and Submissions. These tokens <span className="text text-danger">live on the Ethereum blockchain</span> forever, and are intended to be used as a "Proof-of-Work"-token. <br /><br />

                    <span className="text text-info">
                        Developers now can truly showcase their actual work rather than wasting time trying to pass tests on LinkedIn or LeetCode.<br /><br />
                        Project creators get to skip the lengthy recruiting process. 
                    </span>
                </CardBody>
            </Card>
        )
    }

    const GenesisNFT = () => {
        return (
            <DisplayNFT 
                owner="0x2615e4520418848893f9F0d69Ecc84084119D0E5" 
                ipfsMetadata="https://block-ops.infura-ipfs.io/ipfs/bafyreidlcksw57yogy2tmc5ueypf3wlhocweb62ewswvttyg56kxwyy6zm/metadata.json"
                valueInETH="0"
                tokenId="0"
            />
        )
    }

    const etherscanAddress = (tokenAddress) => {
        if (chainId !== undefined) {
            if (chainId === 42) {
                return "https://kovan.etherscan.io/token/" + tokenAddress
            } else if (chainId === 1) {
                return "https://etherscan.io/token/" + tokenAddress
            }
        }
    }

    const AddTokenToWallet = () => {
        const tokenAddress = chainId !== undefined ? map[chainId]['OpsNFT'][0] : undefined
        const tokenSymbol = "OPS"
        const tokenDecimals = 0;
        const metamaskGuide = "https://metamask.zendesk.com/hc/en-us/articles/360015489031-How-to-add-unlisted-tokens-custom-tokens-in-MetaMask"

        return (
            <Card>
                <CardHeader className="align-items-center d-flex">
                    <h4 className="card-title mb-0 flex-grow-1">Display Your BlockOps NFTs</h4>
                </CardHeader>
                <CardBody className="p-4">
                    The big Web3 Wallets like MetaMask, TrustWallet, and CoinbaseWallet won't begin automatically importing your NFTs until BlockOps gains more traction,
                    but in the meantime we can add them manually.<br /><br /> 
                    
                    <span className="text text-warning">Note: All Submissions & Projects are living on the Ethereum Blockchain. All we are doing here is importing the Contract Address into your wallet so that you can display them.</span> <br /><br />

                    MetaMask has some fantastic documentation on this process, so if you're using MetaMask please follow this guide:
                    <ul>
                        <li><a href={metamaskGuide} className="text text-danger">{metamaskGuide}</a></li>
                    </ul>

                    If you are not using MetaMask, I've left the necessary contract details below for you to import into your wallet of choice:<br /><br />

                    <Table>
                        <thead>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Token Address</td><td><a href={etherscanAddress(tokenAddress)} className="text text-danger">{tokenAddress}</a></td>
                            </tr>
                            <tr>
                                <td>Token Symbol</td><td>{tokenSymbol}</td>
                            </tr>
                            <tr>
                                <td>Token Decimals</td><td>{tokenDecimals}</td>
                            </tr>
                        </tbody>
                    </Table>

                </CardBody>
            </Card>
        )
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container>
                    <Row>
                        <Col sm={12} md={6}>
                            {BlockOpsDescription()}
                            {AddTokenToWallet()}
                        </Col>
                        <Col sm={12} md={6}>
                            {GenesisNFT()}
                        </Col>
                        <Col sm={12}>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}
export default Information;