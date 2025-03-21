import React from  'react';
import PropTypes  from 'prop-types';
import Link  from 'next/Link';
import {Menu} from 'antd';

const AppLayout = ({ children }) => {
    const items = [
            { label: <Link href="/">LOGO</Link>, key: '/' },
            { label: <Link href="/profile">프로필</Link>, key: '/profile' },
            { label: <Link href="/signup">회원가입</Link>, key: '/signup' },
          ];

    return (
        <div>
            <Menu  mode="horizontal"  items={items} />
            {children}
        </div>
    );
};

AppLayout.propTypes = {
   children : PropTypes.node.isRequired,
};

export default AppLayout;