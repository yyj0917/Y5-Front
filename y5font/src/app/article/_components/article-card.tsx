import Link from 'next/link';
import './../../globals.css';
import { BadgeEuro } from 'lucide-react';

type ArticleCardProps = {
    id: number;
    title: string;
    textarea: string;
    author: string;
    date: string;
    time: string;
};

export default function ArticleCard({ id, title, textarea, author, date, time }: ArticleCardProps) {
  return (
    <Link href={`/article/list/${id}`}>
      <div className="max-w-[100%] hover-float p-4 flex flex-col gap-2 bg-white shadow-2xl rounded-xl overflow-hidden">
        {/* title */}
        <h1 className="text-dunamuMain text-lg font-extrabold">{title}</h1>

        {/* text area for article */}
        <div className="h-40">
          <h2 className="text-lg font-light text-gray-800 mt-2 line-clamp-5">{textarea}</h2>
        </div>
        <p className="flex justify-between text-sm text-gray-500 mb-4">
          <span>Last Updated</span>
          <span className="text-dunamuMain font-bold flex gap-2">
            <span>{date}</span>
            <span>{time}</span>
          </span>
        </p>
        <footer className="flex justify-between items-center text-sm text-gray-600">
          {/* wallet address too long */}
          <span className="w-[70%] text-dunamuMain overflow-hidden whitespace-nowrap text-ellipsis font-bold">by {author}</span>
          <span className="text-white bg-dunamuMain rounded-full">
            <BadgeEuro />
          </span>
        </footer>
      </div>
    </Link>
  );
}
