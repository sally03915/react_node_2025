import React, {useState, useCallback} from 'react';
import {Form} from 'antd';
import Link  from 'next/Link';
import { Button, Input, Row, Col } from 'antd';
import styled from 'styled-components';




const  LoginForm = ()=>{
   const  [id, setId] = useState('');
   const  [password, setPassword] = useState('');

   const onChangeId = useCallback( (e)=>{
      setId(e.target.value);
   } , []);

   const onChangePassword = useCallback( (e)=>{
      setPassword(e.target.value);
   } , []);



   return (
      <Form>
         <div>
            <label  htmlFor="user-id">아이디</label>
            <br/>
            <Input
               name="user-id"
               value={id}
               onChange={onChangeId}
               required />
         </div>
         <div>
            <label  htmlFor="user-password">아이디</label>
            <br/>
            <Input
               name="user-password"
               value={password}
               onChange={onChangePassword}
               required />
         </div>
         <div  style={{ marginTop: '10px' }}>
            <Button
               type="primary"
               htmlType="submit"
               loading={false} >로그인</Button>
            <Link href="/signup"  legacyBehavior><a><Button>회원가입</Button></a></Link>
         </div>
      </Form>
   )
};
export default LoginForm;