import { useState } from "react";
import { useDispatch } from "react-redux";

import { addNewPost } from "./PostSlice";

const AddPostForm = () => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);

    const canSave = [title, content].every(Boolean) && addRequestStatus === 'idle';

    const onLetItGoClicked = () => {
        try {
            setAddRequestStatus('pending')
            dispatch(addNewPost({title, body: content})).unwrap()

            setTitle('')
            setContent('')
        } catch(err) {
            console.error('Failed to save the post', err)
        } finally {
            setAddRequestStatus('idle')
        }
    }

    return ( 
        <section>
          <h1 className="mainheader">I AM FURIOS</h1>
          <p className="description">Free your head from annoying thoughts</p>
          <form>
            <input 
              id='postTitle'
              name='postTitle'
              type="text" 
              maxLength={30} 
              placeholder='title' 
              required
              onChange={onTitleChanged}
              value={title}
            />
            <textarea 
              name="postContent" 
              id="postContent" 
              cols="30" 
              rows="10" 
              placeholder="What made you so pissed off?" 
              required
              onChange={onContentChanged}
              value={content}
              >
            </textarea>
            <button
              type='button'
              onClick={onLetItGoClicked}
              disabled={!canSave}
            >Let it go</button>
          </form>
        </section>
     );
}
 
export default AddPostForm;