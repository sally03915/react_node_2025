import React, {useState, useCallback , useMemo} from 'react';
import {Form} from 'antd';
import Link  from 'next/Link';
import { Button, Input, Row, Col } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { useDispatch , useSelector } from 'react-redux';   //##
import {loginRequestAction} from '../reducers/user'; //##

const ButtonWrapper  = styled.div`
   margin-top:10px;
`;
//const LoginForm = ({setIsLoggedIn}) => {
const LoginForm = () => {
  const dispatch = useDispatch();
  const { isLoggingIn } = useSelector((state) => state.user);   //##

  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');

  const  style= useMemo( () => ({  padding:'5%'  }) , []);


  const onSubmitForm =  useCallback( () => {
      console.log(id, password);
     //setIsLoggedIn(true);
      dispatch( loginRequestAction( { id, password}) );  //##
  } , [id, password]);

  return (
      <Form  style={style}   onFinish={onSubmitForm}>
         <div>
            <label  htmlFor="user-id">아이디</label>
            <br/>
            <Input id="user-id" name="user-id"    value={id}   onChange={onChangeId}    required />
         </div>
         <div>
            <label  htmlFor="user-password">비밀번호</label>
            <br/>
            <Input  id="user-password"  name="user-password"  value={password}     onChange={onChangePassword}    required />
         </div>
         <ButtonWrapper>
            <Button   type="primary"    htmlType="submit"    loading={isLoggingIn} >로그인</Button>
            <Link href="/signup"  legacyBehavior><a><Button>회원가입</Button></a></Link>
         </ButtonWrapper>
      </Form>
   )
};

//LoginForm.propTypes = {    setIsLoggedIn : PropTypes.func.isRequired  }

export default LoginForm;