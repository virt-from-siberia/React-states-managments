/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import { getPost } from "./api/posts";
import { getUser } from "./api/users";

export const Post = ({ id }) => {
  const postQuery = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
  });

  const userQuery = useQuery({
    queryKey: ["user", postQuery.data?.userId],
    queryFn: () => getUser(postQuery.data.userId),
    enabled: !!postQuery?.data?.userId,
  });

  if (postQuery.status === "pending") return <div>Loading...</div>;
  if (postQuery.status === "error") return <div>Error</div>;

  return (
    <div>
      <h1>{postQuery.data.title}</h1>
      <br />
      userId from post : {postQuery.data.userId}
      <br />
      <small>
        {userQuery.isLoading
          ? "Loading user"
          : userQuery.isError
          ? "Error"
          : userQuery.data.name}
      </small>
      <p>{postQuery.data.body}</p>
    </div>
  );
};
