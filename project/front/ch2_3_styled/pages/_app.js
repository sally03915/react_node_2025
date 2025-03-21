import   React  from 'react';
import   PropTypes  from 'prop-types';
import  'antd/dist/antd.css';
import   Head   from 'next/head';

const TheJoA = ({Component}) => {
   return (
      <>
         <Head>
            <meta charSet="utf-8" />
            <title>TheJoA</title>
         </Head>
         <Component />
      </>
   )
};

TheJoA.propTypes = {
   Component : PropTypes.elementType.isRequired,
}

export default TheJoA;