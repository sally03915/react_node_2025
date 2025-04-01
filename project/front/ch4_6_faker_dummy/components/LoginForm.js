import React, { useState, useCallback, useMemo } from 'react';
import { Form } from 'antd';
import Link from 'next/Link';
import { Button, Input, Row, Col } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';   //##
import { LOG_IN_REQUEST } from '../reducers/user'; //##

const ButtonWrapper = styled.div`
   margin-top:10px;
`;
//const LoginForm = ({setIsLoggedIn}) => {
const LoginForm = () => {
   const dispatch = useDispatch();
   const { logInLoading } = useSelector((state) => state.user);

   const [email, onChangeEmail] = useInput('');
   const [password, onChangePassword] = useInput('');

   const style = useMemo(() => ({ padding: '5%' }), []);


   const onSubmitForm = useCallback(() => {
      console.log(email, password);
      //setIsLoggedIn(true);
      //dispatch(loginRequestAction({ id, password }));
      dispatch({
         type: LOG_IN_REQUEST,
         data: { email, password },
      });
   }, [email, password]);

   return (
      <Form style={style} onFinish={onSubmitForm}>
         <div>
            <label htmlFor="user-email">아이디</label>
            <br />
            <Input id="user-email" name="user-email" value={email} onChange={onChangeEmail} required />
         </div>
         <div>
            <label htmlFor="user-password">비밀번호</label>
            <br />
            <Input id="user-password" name="user-password" value={password} onChange={onChangePassword} required />
         </div>
         <ButtonWrapper>
            <Button type="primary" htmlType="submit" loading={logInLoading} >로그인</Button>
            <Link href="/signup" legacyBehavior><a><Button>회원가입</Button></a></Link>
         </ButtonWrapper>
      </Form>
   )
};

//LoginForm.propTypes = {    setIsLoggedIn : PropTypes.func.isRequired  }

export default LoginForm;