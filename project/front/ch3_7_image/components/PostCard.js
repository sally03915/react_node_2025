import  React , {useState , useCallback} from  'react';
import { Card, Button, Avatar, Popover, List, Comment } from 'antd';
import { RetweetOutlined, HeartTwoTone, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import PropTypes  from  'prop-types';
import PostImages  from './PostImages';
import { useSelector } from 'react-redux';
import CommentForm from './CommentForm';
import Link  from 'next/Link';
import PostCardContent  from './PostCardContent';


const PostCard = ({ post }) => {
   const id = useSelector((state) => state.user.me && state.user.me.id);
   const [liked, setLiked] = useState(false);
   const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
   }, []);


   const [commentFormOpened, setCommentFormOpened] = useState(false);
   const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
   }, []);


   return (
      <div>
         <Card  cover={post.Images[0]  && <PostImages images={post.Images} />}
            actions={[
               <RetweetOutlined  key="retweet"  />,
                liked
                ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike} />
                : <HeartOutlined key="heart" onClick={onToggleLike} />,

               <MessageOutlined  key="comment" onClick={onToggleComment} />,
               <Popover          key="more"     content={(
                  <Button.Group>
                    {id && post.User.id === id
                    ? (
                        <>
                        <Button>수정</Button>
                        <Button type="danger">삭제</Button>
                        </>
                    )
                    : <Button>신고</Button>}
                  </Button.Group>
               )}>
                  <EllipsisOutlined />
               </Popover>
            ]}
            >
            <Card.Meta
               avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
               title={post.User.nickname}
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
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.any),
    Images: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
};
export  default PostCard;
