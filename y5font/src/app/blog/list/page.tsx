/* eslint-disable @typescript-eslint/no-explicit-any */

import { fetchBlogPosts } from '@/lib/api/blog-post';
import BlogCard from '../_components/blog-card';

export default async function BlogListPage() {
  const blogPosts = await fetchBlogPosts();

  const formatDateTime = (isoString: string) => {
    const [date, time] = isoString.split('T');
    const formattedTime = time.split('.')[0];
    return { date, formattedTime };
  };
  return (
    <div className="w-full h-auto flex flex-col items-center overflow-y-auto scrollbar-hide">
      <header className="px-4 pt-2">
        <h1 className="text-2xl font-bold text-dunamuMain">CredIT Blog Post</h1>
      </header>
      <main className="w-[90%] grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-4 scrollbar-hide">
        {blogPosts.map((post: any) => (
          <BlogCard
            key={post.id}
            id={post.id}
            title={post.title}
            textarea={post.content}
            author={post.accountAddress}
            date={formatDateTime(post.createdAt).date}
            time={formatDateTime(post.createdAt).formattedTime}
          />
        ))}
      </main>
    </div>
  );
}
