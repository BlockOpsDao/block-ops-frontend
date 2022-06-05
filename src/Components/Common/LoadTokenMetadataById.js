import React, { useState, useEffect } from 'react';
import CallOpsNFT from '../../Components/Common/CallOpsNFT';
import { utils, BigNumber } from 'ethers'
import LoadMetadata from './LoadMetadata';


const LoadTokenMetadataById = () => {

    const totalSupply = CallOpsNFT("totalSupply") ?? undefined
    const [tokenMetadataById, setTokenMetadataById] = useState({});
    const tmpTokenMetadataById = {}

    const datemappings = {
        1: 'Jan',
        2: 'Feb',
        3: 'Mar',
        4: 'Apr',
        5: 'May',
        6: 'Jun',
        7: 'Jul',
        8: 'Aug',
        9: 'Sep',
        10: 'Oct',
        11: 'Nov',
        12: 'Dec'
    }

    const tokenMetadata = LoadMetadata()

    useEffect(() => {

        if (Object.keys(tokenMetadataById).length === 0) {
            tokenMetadata.forEach(function(row) {

                let owner = row[1]
                let amountOfEthInNFT = row[2] !== undefined ? Number(utils.formatEther(BigNumber.from(row[2]))) : 0
                let creator = row[3]
                let tokenId = row[4].toNumber()
                let projectState = row[5] === 0 ? "New" : row[5] === 1 ? "Active" : "Closed"
                let numberOfSubmissions = row[6] !== undefined ? row[6].length : 0
                let projectSubmissions = row[6]
                let ipfsURI = row[7]
                let projectTitle = row[8]
                let projectDescription = row[9]
                let projectPriority = row[10]
                let projectSkills = row[11] 
                let projectDeadline = new Date(row[12])
                let ipfsImageURI = row[13]

                let year = Number(String(projectDeadline.getYear()).slice(1,4))
                let month = datemappings[projectDeadline.getUTCMonth()]
                let monthdate = String(month) + "-" + String(year)

                if (!(tokenId in tmpTokenMetadataById)) {
                    tmpTokenMetadataById[tokenId] = {
                        "owner": owner,
                        "amountOfEthInNFT": amountOfEthInNFT,
                        "creator": creator,
                        "tokenId": tokenId,
                        "projectState": projectState,
                        "numberOfSubmissions": numberOfSubmissions,
                        "ipfsURI": ipfsURI,
                        "projectTitle": projectTitle,
                        "projectDescription": projectDescription,
                        "projectPriority": projectPriority,
                        "projectSkills": projectSkills,
                        "projectDeadline": projectDeadline,
                        "ipfsImageURI": ipfsImageURI,
                        "projectSubmissions": projectSubmissions,
                        "monthdate": monthdate
                    }
                }
            })
            if (Object.keys(tmpTokenMetadataById).length > 0) {
                setTokenMetadataById(tmpTokenMetadataById)
            }
        }
        
    }, [totalSupply]);

    return tokenMetadataById
}
export default LoadTokenMetadataById;