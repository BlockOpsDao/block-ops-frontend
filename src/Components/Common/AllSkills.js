import React, { useState, useEffect } from 'react';
import LoadTokenMetadataByDate from './LoadTokenMetadataByDate';

const AllSkills = () => {

    const [allSkills, setAllSkills] = useState([]);
    const tmpAllSkills = []

    const tokenMetadataByDate = LoadTokenMetadataByDate()

    useEffect(() => {

        if (allSkills.length === 0) {
            for (const [key, value] of Object.entries(tokenMetadataByDate)) {
                let monthSkills = tokenMetadataByDate[key]['projectSkills']
                monthSkills.forEach(s => tmpAllSkills.push(s))
            }
            let unique = [...new Set(tmpAllSkills)];     
            setAllSkills(unique)
        }

    }, [tokenMetadataByDate]);

    return allSkills
}

export default AllSkills;