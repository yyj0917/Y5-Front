import { ArticleForm } from '../_components/article-form';

export default function ArticleWritePage() {
  return (
    <div className="mt-16 w-full flex flex-col gap-6 justify-center items-center">
      <header className="text-2xl md:text-xl text-upBitBlus font-bold">
        <h1>Transparent Article Writing</h1>
      </header>
      <section className="w-[50%] h-auto flex flex-col justify-center items-center">
        <ArticleForm />
      </section>
    </div>
  );
}
