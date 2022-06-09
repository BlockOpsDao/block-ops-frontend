import React, { useState, useEffect } from 'react';
import CallOpsNFT from '../../Components/Common/CallOpsNFT';
import { utils, BigNumber } from 'ethers'
import LoadMetadata from './LoadMetadata';


const LoadTokenMetadataByMonth = () => {

    const totalSupply = CallOpsNFT("totalSupply") ?? undefined
    const [tokenMetadataByMonth, setTokenMetadataByMonth] = useState({});
    const tmpTokenMetadataByMonth = {}
    const tokenMetadata = LoadMetadata()

    const datemappings = {
        0: 'Jan',
        1: 'Feb',
        2: 'Mar',
        3: 'Apr',
        4: 'May',
        5: 'Jun',
        6: 'Jul',
        7: 'Aug',
        8: 'Sep',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec'
    }


    useEffect(() => {

        if (Object.keys(tokenMetadataByMonth).length === 0) {
            
            tokenMetadata.forEach(function(row) {
                let dt = new Date(row[12])
                let year = Number(String(dt.getYear()).slice(1,4))
                let month = datemappings[dt.getUTCMonth()]
                let monthdate = String(month) + "-" + String(year)
                
                let amountOfEthInNFT = row[2] !== undefined ? Number(utils.formatEther(BigNumber.from(row[2]))) : 0
                let projectState = row[5] === 0 ? "New" : row[5] === 1 ? "Active" : "Closed"
                let numberOfSubmissions = row[6] !== undefined ? row[6].length : 0
                let projectSkills = row[11] 

                if (monthdate in tmpTokenMetadataByMonth) {
                    
                    tmpTokenMetadataByMonth[monthdate]['amountOfEthInNFT'] += amountOfEthInNFT
                    tmpTokenMetadataByMonth[monthdate]['projectState'][projectState] += 1
                    tmpTokenMetadataByMonth[monthdate]['numberOfSubmissions'] += numberOfSubmissions
                    projectSkills.forEach(function(s) {
                        tmpTokenMetadataByMonth[monthdate]['projectSkills'].push(s)
                    })
                    tmpTokenMetadataByMonth[monthdate]['numberOfProjects'] += 1
                    
                } else {
                    tmpTokenMetadataByMonth[monthdate] = {}
                    tmpTokenMetadataByMonth[monthdate]['amountOfEthInNFT'] = amountOfEthInNFT
                    tmpTokenMetadataByMonth[monthdate]['projectState'] = {}
                    tmpTokenMetadataByMonth[monthdate]['projectState']["New"] = 0
                    tmpTokenMetadataByMonth[monthdate]['projectState']["Active"] = 0
                    tmpTokenMetadataByMonth[monthdate]['projectState']["Closed"] = 0
                    tmpTokenMetadataByMonth[monthdate]['projectState'][projectState] += 1
                    tmpTokenMetadataByMonth[monthdate]['numberOfSubmissions'] = numberOfSubmissions
                    tmpTokenMetadataByMonth[monthdate]['projectSkills'] = projectSkills
                    tmpTokenMetadataByMonth[monthdate]['numberOfProjects'] = 1
                    
                }
            })
            if (Object.keys(tmpTokenMetadataByMonth).length > 0) {
                setTokenMetadataByMonth(tmpTokenMetadataByMonth)
            }
        }

        
    }, [totalSupply]);    


    return tokenMetadataByMonth
}
export default LoadTokenMetadataByMonth;