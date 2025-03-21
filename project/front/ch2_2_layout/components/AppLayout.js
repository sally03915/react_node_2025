import React, { useState }  from  'react';
import PropTypes  from 'prop-types';
import Link  from 'next/Link';
import { Menu, Input, Row, Col } from 'antd';
import UserProfile  from '../components/UserProfile';
import LoginForm   from './LoginForm1_before_styled_component';

const AppLayout = ({ children }) => {
   ////////////// code start
   const [isLoggedIn,setIsLoggedIn ] = useState(false);

    const items = [
            { label: <Link href="/">LOGO</Link>, key: '/' },
            { label: <Link href="/profile">프로필</Link>, key: '/profile' },
            { label: <Input.Search   enterButton  style={{ verticalAlign: 'middle' }} />, key: '/search' },
            { label: <Link href="/signup">회원가입</Link>, key: '/signup' },
          ];
    return (
        <div>
            <Menu  mode="horizontal"  items={items} />
            <Row gutter={8} >
                <Col xs={24} md={6}  >
                    {isLoggedIn ? <UserProfile /> : <LoginForm />}
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