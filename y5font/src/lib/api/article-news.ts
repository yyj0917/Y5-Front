import axios from 'axios';

const baseURL = '/api';

type ArticleNews = {
  title: string;
  textarea: string;
  userwallet: string;
  privateKey: string;
  source: string[];
};
// article 글 작성 api
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

// article 글 조회 api
export async function fetchArticleNews() {
  try {
    const response = await axios.get(`${baseURL}/article/news`);
    return response.data;
  } catch (error) {
    throw new Error('error');
  }
}
// news 글 상세조회 api
export async function fetchArticleNewsDetail(id: string) {
  try {
    const response = await axios.get(`${baseURL}/article/detail/${id}`, {
      params: {
        type: 'news',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('error');
  }
}
