import { useEffect } from "react";
import ReactGA from 'react-ga4'

function TrackPages () {

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
      }, []);
    return "";
}
export default TrackPages;