import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./api/posts";

export const PostsLists2 = () => {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (postsQuery.status === "pending") return <div>Loading...</div>;
  if (postsQuery.status === "error") return <div>Error</div>;
  console.log("postsQuery.status", postsQuery.status);

  return (
    <div>
      <h1>Posts Lists</h1>
      <ol>
        {postsQuery &&
          postsQuery?.data?.map((post) => <li key={post.id}>{post.title}</li>)}
      </ol>
    </div>
  );
};
