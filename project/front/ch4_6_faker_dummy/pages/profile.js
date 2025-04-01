import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import { useSelector } from 'react-redux';

import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {
   const { me } = useSelector((state) => state.user);

   return (
      <>
         <Head>
            <meta charSet="utf-8" />
            <title> Profile | TheJoA</title>
         </Head>
         <AppLayout>
            <NicknameEditForm />
            <FollowList header="팔로잉" data={me.Followings} />
            <FollowList header="팔로워" data={me.Followers} />
         </AppLayout>
      </>
   );
}
export default Profile;
