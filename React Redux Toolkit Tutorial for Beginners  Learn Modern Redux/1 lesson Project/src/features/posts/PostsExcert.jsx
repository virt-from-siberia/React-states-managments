import React from "react";

import { PostAuthor } from "./postAuthor";
import { TimeAgo } from "./TimeAgo";
import { ReactionButtons } from "./ReactionButtons";

export const PostsExcert = ({ post }) => {
  return (
    <div>
      <article>
        <b>
          <p>{post.title}</p>
        </b>

        <p>{post.body.substring(0, 100)}</p>
        <p className="postCredit">
          <hr />
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </p>

        <ReactionButtons post={post} />
      </article>
    </div>
  );
};
