import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import "./App.css";

const POSTS = [
  {
    id: 1,
    title: "title 1",
    content: "content 1",
  },
  {
    id: 2,
    title: "title 2",
    content: "content 2",
  },
];

function App() {
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POSTS]),
  });

  const newPostMutation = useMutation({
    mutationFn: (title) =>
      wait(1000).then(() =>
        POSTS.push({
          id: crypto.randomUUID(),
          title: `${title}`,
          content: `content ${crypto.randomUUID()}`,
        })
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  if (postsQuery.isLoading) return <div>Loading...</div>;
  if (postsQuery.isError) return <div>Error</div>;

  return (
    <div>
      {postsQuery.data.map((post) => (
        // <Post key={post.id} post={post} />
        <div key={post.id}>{post.title}</div>
      ))}
      <button
        disabled={newPostMutation.isLoading}
        onClick={() => newPostMutation.mutate("new post")}
      >
        add new
      </button>
    </div>
  );
}

function wait(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

export default App;
