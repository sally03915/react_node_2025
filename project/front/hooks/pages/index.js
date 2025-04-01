import { useSelector, useDispatch } from 'react-redux'; //##1
import { LOAD_POSTS_REQUEST } from '../reducers/post'; //##2
import React, { useEffect } from 'react';  //#5

import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import AppLayout from '../components/AppLayout';

const Home = () => {
  //##3
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);
  /*
  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, []);
  */
  useEffect(
    () => {
      if (hasMorePosts && !loadPostsLoading) {
        const lastId = mainPosts[mainPosts.length - 1]?.id;
        dispatch({
          type: LOAD_POSTS_REQUEST,
          lastId,
        });
      }
    },
    [hasMorePosts, loadPostsLoading, mainPosts],
  );

  // ##4 스크롤내려서 맨끝으로 갔을때 다시 로딩하는 방법
  useEffect(() => {
    function onScroll() { // 스크롤 위치 어디까지 왔는지 판단.
      //            내가 내리는 길이   +     화면에 보이는높이,             =   브라우저의 총길이
      console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
      //
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) { //아래 300px아래정도오면면
        if (hasMorePosts && !loadPostsLoading) {  // 기존에 로딩이 안될때만 스크롤링 요청
          dispatch({
            type: LOAD_POSTS_REQUEST,
            data: mainPosts[mainPosts.length - 1].id,
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll); // 스크롤 했으면 스크롤 했던 거 remove해야함. 안그러면 메모리가 계속쌓임
    };
  }, [mainPosts, hasMorePosts, loadPostsLoading]);
  //....................
  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((c) => {
        return (
          <PostCard key={c.id} post={c} />
        );
      })}
    </AppLayout>
  );
}
export default Home;