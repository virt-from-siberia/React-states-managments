import { useQuery, useQueries } from "@tanstack/react-query";
import { getPosts, getPost } from "./api/posts";

export const PostsLists1 = () => {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    // refetchInterval: 1000,
  });

  // const queries = useQueries({
  //   queries: (postsQuery?.data ?? []).map((post) => {
  //     return {
  //       queryKey: ["post", post.id],
  //       queryFn: () => getPost(post.id),
  //     };
  //   }),
  // });
  // console.log(
  //   "queries.map",
  //   queries.map((q) => q.data)
  // );

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
