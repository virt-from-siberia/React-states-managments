import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchPosts,
  getPostsError,
  getPostsStatus,
  selectAllPOsts,
} from "./postsSlise";

import { PostsExcert } from "./PostsExcert";

export const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPOsts);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  useEffect(() => {
    if (postsStatus === "idle") dispatch(fetchPosts());
  }, [postsStatus, dispatch]);

  let content;
  if (postsStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postsStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostsExcert key={post.id} post={post} />
    ));
  } else if (postsStatus === "failed") content = <p>{postsError}</p>;

  return (
    <section>
      <h6>Posts</h6>
      {content}
    </section>
  );
};
