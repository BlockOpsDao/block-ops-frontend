import React from 'react'
import { AnalyticEventTracker } from "./AnalyticEventTracker";

const TweetSubmission = (args) => {
    const gaEventTracker = AnalyticEventTracker('TweetProject');
    let projectId = String(args['projectId'])
    let projectName = String(args['projectName'])
    let tokenMetadataURI = String(args['tokenMetadataURI'])
    let url = "https://twitter.com/intent/tweet?text=Check%20out%20my%20submission%20for%20Project%3A%20"

    url += projectId
    url += "%20%7C%20"
    url += projectName
    url += "%20I%20just%20minted%20via%20%40dao_block!%0A%0AMetadata%20Link%3A%20"
    url += tokenMetadataURI
    url += "%20"
    url += "%0A%23block_ops" 
    url += "%20%23web3" 
    url += "%20%23freelance"
    return (
        <a href={url} data-show-count="false">
            <button type="button" className="btn btn-info btn-label rounded-pill" onClick={() => {gaEventTracker('button_TweetSubmission', projectId)}}>
                <i className="ri-twitter-line label-icon align-middle rounded-pill fs-16 me-2"></i> Tweet Your Submission!
            </button>
        </a>
    )
}
export default TweetSubmission;