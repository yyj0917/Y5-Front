import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000';

type ArticleNews = {
  title: string;
  textarea: string;
  userwallet: string;
  privateKey: string;
  source: string[];
};
// 지갑 주소로 작성한 글 조회 api
export async function PostArticleNews(articleData: ArticleNews) {
  try {
    const response = await axios.post(`${baseURL}/article/news`, {
      title: articleData.title,
      content: articleData.textarea,
      accountAddress: articleData.userwallet,
      ACCOUNT_PRIVATE_KEY: articleData.privateKey,
      reference: articleData.source,
    });
    return response.data;
  } catch (error) {
    throw new Error('error');
  }
}
