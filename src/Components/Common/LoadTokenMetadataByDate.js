import React, { useState, useEffect } from 'react';
import CallOpsNFT from './CallOpsNFT';
import { utils, BigNumber } from 'ethers'
import LoadMetadata from './LoadMetadata';
import Moment from 'moment';


const LoadTokenMetadataByDate = () => {

    const totalSupply = CallOpsNFT("totalSupply") ?? undefined
    const [tokenMetadataByMonth, setTokenMetadataByMonth] = useState({});
    const tmpTokenMetadataByMonth = {}
    const tokenMetadata = LoadMetadata()

    useEffect(() => {

        if (Object.keys(tokenMetadataByMonth).length === 0) {
            
            tokenMetadata.forEach(function(row) {
                let dt = new Date(row[12])
                let datekey = Moment(dt).format('YYYY-MM-DD')
                
                let amountOfEthInNFT = row[2] !== undefined ? Number(utils.formatEther(BigNumber.from(row[2]))) : 0
                let projectState = row[5] === 0 ? "New" : row[5] === 1 ? "Active" : "Closed"
                let numberOfSubmissions = row[6] !== undefined ? row[6].length : 0
                let projectSkills = row[11] 

                if (datekey in tmpTokenMetadataByMonth) {
                    
                    tmpTokenMetadataByMonth[datekey]['amountOfEthInNFT'] += amountOfEthInNFT
                    tmpTokenMetadataByMonth[datekey]['projectState'][projectState] += 1
                    tmpTokenMetadataByMonth[datekey]['numberOfSubmissions'] += numberOfSubmissions
                    projectSkills.forEach(function(s) {
                        tmpTokenMetadataByMonth[datekey]['projectSkills'].push(s)
                    })
                    tmpTokenMetadataByMonth[datekey]['numberOfProjects'] += 1
                    
                } else {
                    tmpTokenMetadataByMonth[datekey] = {}
                    tmpTokenMetadataByMonth[datekey]['amountOfEthInNFT'] = amountOfEthInNFT
                    tmpTokenMetadataByMonth[datekey]['projectState'] = {}
                    tmpTokenMetadataByMonth[datekey]['projectState']["New"] = 0
                    tmpTokenMetadataByMonth[datekey]['projectState']["Active"] = 0
                    tmpTokenMetadataByMonth[datekey]['projectState']["Closed"] = 0
                    tmpTokenMetadataByMonth[datekey]['projectState'][projectState] += 1
                    tmpTokenMetadataByMonth[datekey]['numberOfSubmissions'] = numberOfSubmissions
                    tmpTokenMetadataByMonth[datekey]['projectSkills'] = projectSkills
                    tmpTokenMetadataByMonth[datekey]['numberOfProjects'] = 1
                    
                }
            })
            if (Object.keys(tmpTokenMetadataByMonth).length > 0) {
                setTokenMetadataByMonth(tmpTokenMetadataByMonth)
            }
        }

        
    }, [totalSupply]);    


    return tokenMetadataByMonth
}
export default LoadTokenMetadataByDate;