import React, { useState, useEffect } from 'react';
import LoadTokenMetadataByMonth from '../../Components/Common/LoadTokenMetadataByMonth';

const AllSkills = () => {

    const [allSkills, setAllSkills] = useState([]);
    const tmpAllSkills = []

    const tokenMetadataByMonth = LoadTokenMetadataByMonth()

    useEffect(() => {

        if (allSkills.length === 0) {
            for (const [key, value] of Object.entries(tokenMetadataByMonth)) {
                let monthSkills = tokenMetadataByMonth[key]['projectSkills']
                monthSkills.forEach(s => tmpAllSkills.push(s))
            }
            let unique = [...new Set(tmpAllSkills)];     
            setAllSkills(unique)
        }

    }, [tokenMetadataByMonth]);

    return allSkills
}

export default AllSkills;