import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from './PostsSlice';
import PostExcerpt from './PostExcerpt';

const PostsList = () => {
    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

    useEffect(() => {
        if (postsStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postsStatus, dispatch]);

    let content;
    if (postsStatus === 'loading') {
        return content = <p>'Loading...'</p>;
    } else if (postsStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
        return content = orderedPosts.map(post => <PostExcerpt key={post.id} post={post} />)
    } else if (postsStatus === 'failed') {
        return content = <p>{error}</p>;
    }


    return ( 
          <div>
            {content}
          </div>
     );
}
 
export default PostsList;