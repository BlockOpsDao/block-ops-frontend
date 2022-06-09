import React from 'react'
import { AnalyticEventTracker } from "./AnalyticEventTracker";

const TweetProject = (args) => {
    const gaEventTracker = AnalyticEventTracker('TweetProject');
    let projectId = String(args['projectId'])
    let projectSkills = args['projectSkills']

    let url = "https://twitter.com/intent/tweet?text=Check%20out%20the%20project%20I%20just%20minted%20via%20%40dao_block!%0A%0AProject%3A%20"
    url += projectId
    url += "%0ARequired%20Skills%3A%0A"
    projectSkills?.map(function(skill, idx){
        if (idx < 4) {
            url += "%0A*%20" + skill
        }
    })
    url += "%0A%23block_ops" 
    url += "%20%23web3" 
    url += "%20%23freelance"
    return (
        <a href={url} data-show-count="false">
            <button type="button" className="btn btn-info btn-label rounded-pill" onClick={() => {gaEventTracker('button_TweetProject', projectId)}}>
                <i className="ri-twitter-line label-icon align-middle rounded-pill fs-16 me-2"></i> Tweet Your Project!
            </button>
        </a>
    )
}
export default TweetProject;