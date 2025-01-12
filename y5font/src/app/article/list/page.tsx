import { fetchArticleNews } from '@/lib/api/article-news';
import ArticleCard from '../_components/article-card';

export default async function ArticleListPage() {
    const articles = await fetchArticleNews();

    const formatDateTime = (isoString: string) => {
        const [date, time] = isoString.split("T");
        const formattedTime = time.split(".")[0];
        return { date, formattedTime };
      };
    return (
        <div className="w-full h-auto flex flex-col items-center overflow-y-auto scrollbar-hide">
        <header className="px-4 pt-2">
            <h1 className="text-2xl font-bold text-dunamuMain">CredIT Articles</h1>
        </header>
        <main className="w-[90%] grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-4 scrollbar-hide">
            {articles.map((article : any) => (
            <ArticleCard
                key={article.id}
                id={article.id}
                title={article.title}
                textarea={article.content}
                author={article.accountAddress}
                date={formatDateTime(article.createdAt).date}
                time={formatDateTime(article.createdAt).formattedTime}
            />
            ))}
        </main>
        </div>
  );
}
