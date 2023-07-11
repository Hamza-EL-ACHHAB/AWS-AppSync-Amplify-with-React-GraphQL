import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listPosts } from './../src/graphql/queries';
export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);
  async function fetchPosts() {
    const postData = await API.graphql({
      query: listPosts,
    });
    setPosts(postData.data.listPosts.items);
  }
  return (
    <div>
      <h1 className="text-3xl font-bold underline">s s!</h1>
      {<p>{posts.map((post, index) => post.title)}</p>}
    </div>
  );
}
