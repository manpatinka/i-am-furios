import { parseISO, formatDistanceToNow } from "date-fns";

const TimeAgo = ({ timestamp }) => {
    let timeAgo = '';
    if(timestamp) {
        // Convert string '2023-01-23M11:30:30' to date:
        //=> Mon Jan 23 2023 11:30:30
        const date = parseISO(timestamp);

        //0 ... 30 secs	=> less than a minute
        //44 mins ... 30 secs ... 89 mins 30 secs => about an hour
        //etc
        const timePeriod = formatDistanceToNow(date);
        timeAgo = `${timePeriod} ago`;
    }

    //&nbsp;  -non-breacking space
    return ( 
        <span title={timestamp}>
          &nbsp; <i>{timeAgo}</i>
        </span>
     );
}
 
export default TimeAgo;