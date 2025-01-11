import BlogCard from '../_components/blog-card';

export default function BlogListPage() {
  return (
    <div className="w-full h-auto flex flex-col items-center overflow-y-auto scrollbar-hide">
      <header className="p-4">
        <h1 className="text-2xl font-bold text-upBitLightBlue">CredIT Blog Post</h1>
      </header>
      <main className="w-[80%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 p-4 scrollbar-hide">
        {[...Array(8)].map((_, idx) => (
          <BlogCard
            key={idx}
            title={`Sample Blog Title ${idx + 1}`}
            textarea={
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            }
            author={`Author ${idx + 1}`}
            date={new Date().toLocaleDateString()}
          />
        ))}
      </main>
    </div>
  );
}
