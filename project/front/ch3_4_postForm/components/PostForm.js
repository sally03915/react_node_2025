import React, { useCallback, useState , useRef } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../reducers/post';

const PostForm = ()=>{
   const {imagePaths}      = useSelector(  (state)=> state.post );
   const dispatch          = useDispatch();
   const imageInput        = useRef();
   const [text , setText]  = useState('');

   const onChangeText = useCallback(  (e)=>{
      setText(e.target.value);
   },[]);

   const onSubmit = useCallback(  ()=>{
      dispatch(addPost);
      setText('');
   } , [] );

   const onClickImageUpload = useCallback(()=>{
      imageInput.current.click();
   } , [imageInput.current]);


   return (
   <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="글쓰기"
      />
      <div>
        <input type="file" name="image" multiple hidden ref={imageInput}   style={{ display: 'none' }} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit">UPLOAD</Button>
      </div>
      <div>
        {imagePaths.map((v, i) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={v} style={{ width: '200px' }} alt={v} />
            <div>
              <Button onClick={onRemoveImage(i)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
   )
};
export default PostForm;