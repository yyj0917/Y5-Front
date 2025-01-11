import { BlogForm } from '../_components/blog-form';

export default function BlogWritePage() {
  return (
    <div className="mt-10 w-full flex flex-col gap-4 justify-center items-center">
      <header className="text-xl md:text-xl text-upBitBlus font-bold">
        <h1>Transparent Blog Writing</h1>
      </header>
      <section className="w-[50%] h-auto flex flex-col justify-center items-center">
        <BlogForm />
      </section>
    </div>
  );
}
