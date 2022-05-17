import React from 'react'
import { AnalyticEventTracker } from "./AnalyticEventTracker";

const TwitterTweet = () => {
    const gaEventTracker = AnalyticEventTracker('TwitterTweet');
    return (
        <a href="https://twitter.com/intent/tweet?screen_name=dao_block&ref_src=twsrc%5Etfw" data-show-count="false">
            <button type="button" className="btn btn-info btn-label rounded-pill" onClick={() => {gaEventTracker('button_TwitterTweet')}}>
                <i className="ri-twitter-line label-icon align-middle rounded-pill fs-16 me-2"></i> Send Us Tweet
            </button>
        </a>
    )

};
export default TwitterTweet;