import React from  'react';
import PropTypes  from 'prop-types';
import Link  from 'next/Link';

const AppLayout = ({children}) =>{
    return (
        <div>
            <div>
                <Link href="/" legacyBehavior><a>Logo</a></Link>
                <Link href="/profile" legacyBehavior><a>프로필</a></Link>
                <Link href="/signup" legacyBehavior><a>회원가입</a></Link>
            </div>
            {children}
        </div>
    );
};

AppLayout.propTypes = {
   children : PropTypes.node.isRequired,
};

export default AppLayout;