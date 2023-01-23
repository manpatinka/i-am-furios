import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";


const PostExcerpt = ({ post }) => {
    return ( 
        <div className="post">
        <p>{post.body.substring(0, 100)}</p> 
        <p className="posted">
          <TimeAgo timestamp={post.date} />
        </p>
        <ReactionButtons post={post} />
        </div>
     );
}
 
export default PostExcerpt;