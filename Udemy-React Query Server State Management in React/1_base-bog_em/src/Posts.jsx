import { useState } from "react";
import { useQuery } from "react-query";

import { PostDetail } from "./PostDetail";

const maxPostPage = 10;

async function fetchPosts(pageNumber) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNumber}`
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  const { data, isError, isLoading, error, refetch } = useQuery(
    ["/posts", currentPage],
    () => fetchPosts(currentPage),
    {
      staleTime: 2000,
    }
  );

  if (isLoading) return <div>loading...</div>;

  if (isError)
    return <div>something went wrong `{error && error.toString()}`</div>;

  return (
    <>
      <ul>
        {data?.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button onClick={() => refetch()}>Refresh Posts</button>
        <button
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button
          disabled={currentPage >= maxPostPage}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next page
        </button>
      </div>
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
