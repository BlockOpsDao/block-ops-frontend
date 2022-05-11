import React from 'react'
import { AnalyticEventTracker } from "./AnalyticEventTracker";

const TwitterFollow = () => {
    const gaEventTracker = AnalyticEventTracker('TwitterFollow');
    return (

        <a href="https://twitter.com/dao_block?ref_src=twsrc%5Etfw" data-show-count="false">
            <button type="button" className="btn btn-info btn-label rounded-pill" onClick={() => {gaEventTracker('button_TwitterFollow')}}>
                <i className="ri-twitter-line label-icon align-middle rounded-pill fs-16 me-2"></i> Follow @dao_block
            </button>
        </a>
    )

};
export default TwitterFollow;