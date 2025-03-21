import React from  'react';
import AppLayout from '../components/AppLayout';
import   Head   from 'next/head';

const Signup = () =>{
   return (
      <>
         <Head>
            <meta charSet="utf-8" />
            <title> Signup | TheJoA</title>
         </Head>
         <AppLayout> 회원가입페이지 </AppLayout>
      </>
   );
}
export default Signup;