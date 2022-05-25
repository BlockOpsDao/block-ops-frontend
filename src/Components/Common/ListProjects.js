import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { useContractFunction, useCall } from "@usedapp/core";
import map from "../../build/deployments/map.json";
import OpsNFTKovan from "../../build/deployments/42/0x072Cc7F9aBb95780fE3B4Fa4f0333DDf22308E98.json"
import { Icon } from '@iconify/react';
// import DisplayNFT from './DisplayNFT';
import { useState, useEffect } from 'react';
import { AnalyticEventTracker } from './AnalyticEventTracker';
import CallOpsNFT from "../Common/CallOpsNFT";
import { Card, CardBody, Col, Container, Input, Label, Row } from 'reactstrap';
import { useEthers } from "@usedapp/core";
import DisplayNFT from './DisplayNFT';


const ListProjects = () => {

    const { account } = useEthers()
    const isConnected = account !== undefined
    const [loading, setLoading] = useState(true);

    const gaEventTracker = AnalyticEventTracker("ListProjects")
    // const abi = OpsNFTKovan['abi']
    // const opsNFTContractAddress = map[42]["OpsNFT"][0]
    // const opsNFTInterface = new utils.Interface(abi);
    // const contract = new Contract(opsNFTContractAddress, opsNFTInterface);
    // const { state, send, events } = useContractFunction(contract, 'tokenDetails')
    // const { status } = state


    // useEffect(async () => {
    //     try {
    //       // set loading to true before calling API
    //       setLoading(true);
    //       const data = await fetchData();
    //       setData(data);
    //       // switch loading to false after fetch is complete
    //       setLoading(false);
    //     } catch (error) {
    //       // add error handling here
    //       setLoading(false);
    //       console.log(error);
    //     }
    //  }, []);

     

    const totalSupply = CallOpsNFT("totalSupply") ?? undefined

    const [tokenId, setTokenId] = useState(0);
    const tokenDetails = CallOpsNFT("tokenDetails", [tokenId]) ?? undefined
    const tokenOwner = tokenDetails ? tokenDetails[0] : undefined
    const tokenMetadataURI = tokenDetails ? tokenDetails[1] : undefined
    const tokenBounty = tokenDetails ? utils.formatEther(tokenDetails[2]) : undefined
    const tokenCreator = tokenDetails ? tokenDetails[3] : undefined

    const getTotalSupply = () => {
        console.log("totalSupply: ", totalSupply[0].toNumber())
    }
    
    const getTokenDetails = () => {
        console.log("tokenDetails: ", tokenOwner, tokenMetadataURI, tokenBounty, tokenCreator)
    }

    const prepareDisplayNFTInput = () => {
        setLoading(true);
        const nft = <DisplayNFT 
                        owner={tokenOwner}
                        ipfsMetadata={tokenMetadataURI} 
                        valueInETH={tokenBounty} 
                        tokenId={tokenId} 
                        />;
        setLoading(false);
        return nft
    }

    return (
        <Container>

            <Row>
                <Col>
                    <button className="btn btn-primary" onClick={getTotalSupply}>
                        Get Total NFTs
                    </button>
                </Col>
            </Row>
            <Row><br /></Row>

            <Row>
                <Col lg={4}>
                    <Label className="form-label" htmlFor="token-id-input">TokenId</Label>
                </Col>

                <Col lg={4}>
                    <Input type="text" className="form-control" id="token-id-input"
                    placeholder="0" value={tokenId} onChange={(e) => setTokenId(e.target.value)} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <button className="btn btn-primary" onClick={getTokenDetails}>
                        Get Token Details
                    </button>
                </Col>
            </Row>
        <Row>
            <Col lg={4}>
            {
                tokenOwner !== undefined & 
                tokenMetadataURI !== undefined &
                tokenBounty !== undefined &
                tokenCreator !== undefined 
                ? <DisplayNFT 
                    owner={tokenOwner}
                    ipfsMetadata={tokenMetadataURI} 
                    valueInETH={tokenBounty} 
                    tokenId={tokenId} 
                    />
                : <></>
            }
            </Col>
        </Row>
        
    </Container>
        
    )

}
export default ListProjects;