
type BlogCardProps = {
    title: string;
    textarea: string;
    author: string;
    date: string;
    };

export default function BlogCard({ title, textarea, author, date } : BlogCardProps) {
    return (
      <div className="p-4 flex flex-col gap-2 bg-white shadow-2xl rounded-xl overflow-hidden">
        {/* title */}
        <h1 className="text-dunamuMain text-lg font-bold">{title}</h1>

        {/* text area for article */}
        <div className="h-40">
          <h2 className="text-lg font-normal text-gray-800 mb-2 line-clamp-5">{textarea}</h2>
        </div>
        <p className="text-sm text-gray-500 mb-4">Last Update {date}</p>
        <footer className="flex justify-between items-center text-sm text-gray-600">
            {/* wallet address too long */}
            <span className="text-upBitLightBlue line-clamp-1">by {author}</span>
            <span>❤️</span>
        </footer>
      </div>
    );
  }