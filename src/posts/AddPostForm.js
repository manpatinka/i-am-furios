import { useState } from "react";
import { useDispatch } from "react-redux";

import { addNewPost } from "./PostSlice";

const AddPostForm = () => {
    const dispatch = useDispatch();

    const [content, setContent] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const onContentChanged = e => setContent(e.target.value);

    const canSave = [content].every(Boolean) && addRequestStatus === 'idle';

    const onLetItGoClicked = () => {
        try {
            setAddRequestStatus('pending')
            dispatch(addNewPost({body: content})).unwrap()

            setContent('')
        } catch(err) {
            console.error('Failed to save the post', err)
        } finally {
            setAddRequestStatus('idle')
        }
    }

    return ( 
        <section>
          <h1>I AM FURIOS</h1>
          <p className="description">Free your head from annoying thoughts</p>
          <form>
            <textarea 
              name="postContent" 
              id="postContent" 
              placeholder="What pissed you off?" 
              cols='10'
              rows='5'
              required
              onChange={onContentChanged}
              value={content}
              >
            </textarea>
            <br />
            <button
              className="btn"
              type='button'
              onClick={onLetItGoClicked}
              disabled={!canSave}
            >Let it go</button>
          </form>
        </section>
     );
}
 
export default AddPostForm;