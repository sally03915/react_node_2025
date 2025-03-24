import React   from  'react';
import Link  from 'next/Link';
import PropTypes  from 'prop-types';
import { Menu, Input, Row, Col } from 'antd';

import styled , {createGlobalStyle} from 'styled-components';

import LoginForm from './LoginForm';
import UserProfile  from './UserProfile';

import { useSelector } from 'react-redux';  //##


const SearchInput  = styled(Input.Search)`
    vertical-align: middle;
`;


const Global = createGlobalStyle`
  .ant-row {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  .ant-col:first-child {
    margin-left: 0 !important;
  }
  .ant-col:last-child {
    margin-right: 0 !important;
  }
  .ant-form-item-explain-error {
    font-size: 11px;
  }
`;
const AppLayout = ({ children }) => {
    const { isLoggedIn } = useSelector(state => state.user);

    const items = [
            { label: <Link href="/">LOGO</Link>, key: '/' },
            { label: <Link href="/profile">프로필</Link>, key: '/profile' },
            { label: <SearchInput  enterButton />, key: '/search' },
            { label: <Link href="/signup">회원가입</Link>, key: '/signup' },
          ];
    return (
        <div>
            <Global />
            <Menu  mode="horizontal"  items={items} />
            <Row gutter={8} >
                <Col xs={24} md={6}  >
                    {isLoggedIn ? <UserProfile /> :  <LoginForm />}
                </Col>
                <Col xs={24}  md={12} > {children}  </Col>
                <Col xs={24}  md={6}  >
                    <a href="https://thejoa.com/" target="_blank"
                        rel="noreferrer  noopener">Made by TheJoA</a>
                </Col>
            </Row>
        </div>
    );
};
AppLayout.propTypes = {
   children : PropTypes.node.isRequired,
};
export default AppLayout;