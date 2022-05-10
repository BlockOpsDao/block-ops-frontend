import React from 'react'
import { AnalyticEventTracker } from "./AnalyticEventTracker";

const EmailUs = () => {
    const gaEventTracker = AnalyticEventTracker('EmailUs');
    return (
        <a href="mailto:zacharybloss@gmail.com">
            <button type="button" className="btn btn-primary btn-label rounded-pill me-1" onClick={() => {gaEventTracker('button_EmailUs')}}><i className="ri-mail-line label-icon align-middle rounded-pill fs-16 me-2"></i> Email Us</button>
        </a>
    )
};
export default EmailUs;