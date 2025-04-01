import React, { useCallback } from 'react';
import { Card, Avatar, Button, Menu, Input, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_OUT_REQUEST } from '../reducers/user'; //##

const UserProfile = () => {

    const { me, logOutLoading } = useSelector((state) => state.user);   //##

    const dispatch = useDispatch();
    const onLogout = useCallback(() => {
        dispatch({
            type: LOG_OUT_REQUEST,
        });
    }, []);

    return (
        <Card
            actions={[
                <div key="sns">TheJoA<br />{me.Posts.length}</div>,
                <div key="followings">팔로잉<br />{me.Followings.length}</div>,
                <div key="followings">팔로워<br />{me.Followers.length}</div>,
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{me.nickname[0]}</Avatar>}
                title={me.nickname} />
            <Button onClick={onLogout} loading={logOutLoading}>로그아웃</Button>

        </Card>
    );
};
export default UserProfile;
