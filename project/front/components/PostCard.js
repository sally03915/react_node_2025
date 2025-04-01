import React, { useState, useCallback } from 'react';
import { Card, Button, Avatar, Popover, List, Comment } from 'antd';
import { RetweetOutlined, HeartTwoTone, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/Link';


import PropTypes from 'prop-types';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import { REMOVE_POST_REQUEST } from '../reducers/post';
import FollowButton from './FollowButton';


const PostCard = ({ post }) => {
   const dispatch = useDispatch();
   const { removePostLoading } = useSelector((state) => state.post);
   //const id = useSelector((state) => state.user.me && state.user.me.id);
   const [commentFormOpened, setCommentFormOpened] = useState(false);
   const [liked, setLiked] = useState(false);
   const { me } = useSelector((state) => state.user);
   const id = me && me.id;


   const onToggleLike = useCallback(() => {
      setLiked((prev) => !prev);
   }, []);

   const onToggleComment = useCallback(() => {
      setCommentFormOpened((prev) => !prev);
   }, []);


   const onRemovePost = useCallback(() => {
      dispatch({
         type: REMOVE_POST_REQUEST,
         data: post.id,
      });
   }, []);

   return (
      <div>
         <Card cover={post.Images?.[0] && <PostImages images={post.Images} />}
            actions={[
               <RetweetOutlined key="retweet" />,
               liked
                  ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike} />
                  : <HeartOutlined key="heart" onClick={onToggleLike} />,

               <MessageOutlined key="comment" onClick={onToggleComment} />,
               <Popover key="more" content={(
                  <Button.Group>
                     {id && post.User.id === id
                        ? (
                           <>
                              <Button>수정</Button>
                              <Button type="danger" loading={removePostLoading} onClick={onRemovePost}>삭제</Button>
                           </>
                        )
                        : <Button>신고</Button>}
                  </Button.Group>
               )}>
                  <EllipsisOutlined />
               </Popover>
            ]}
            //extra={<FollowButton post={post} />}   ##1
            extra={id && <FollowButton post={post} />}  //##2
         >
            <Card.Meta
               avatar={
                  post.User && post.User.nickname ? (
                     <Avatar>{post.User.nickname[0]}</Avatar>
                  ) : (
                     <Avatar>?</Avatar>
                  )
               }
               title={post.User && post.User.nickname ? post.User.nickname : "Unknown User"}

               description={<PostCardContent postData={post.content} />}
            />
         </Card>
         {commentFormOpened && (
            <>
               <CommentForm post={post} />
               <List
                  header={`${post.Comments.length} 댓글`}
                  itemLayout="horizontal"
                  dataSource={post.Comments}
                  renderItem={(item) => (
                     <li>
                        <Comment
                           author={item.User.nickname}
                           avatar={(
                              <Link href={{ pathname: '/user', query: { id: item.User.id } }}
                                 as={`/user/${item.User.id}`}>
                                 <Avatar>{item.User.nickname[0]}</Avatar>
                              </Link>
                           )}
                           content={item.content}
                        />
                     </li>
                  )}
               />
            </>
         )}
      </div>
   );
};

PostCard.propTypes = {
   post: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), //PropTypes.number,
      User: PropTypes.object,
      content: PropTypes.string,
      createdAt: PropTypes.object,
      Comments: PropTypes.arrayOf(PropTypes.any),
      Images: PropTypes.arrayOf(PropTypes.any),
   }).isRequired,
};
export default PostCard;
