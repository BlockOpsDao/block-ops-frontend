import React from 'react'
import { AnalyticEventTracker } from "./AnalyticEventTracker";

const TwitterFeed = () => {
    const gaEventTracker = AnalyticEventTracker('TwitterFeed');
    return (
        <a className="twitter-timeline" data-theme="dark" href="https://twitter.com/dao_block?ref_src=twsrc%5Etfw">
            <button type="button" className="btn btn-info btn-label rounded-pill" onClick={() => {gaEventTracker('button_TwitterFeed')}}>
                <i className="ri-twitter-line label-icon align-middle rounded-pill fs-16 me-2"></i> Tweets by dao_block
            </button>
        </a>
    )

};
export default TwitterFeed;