import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000';

type BlogPosts = {
  title: string;
  textarea: string;
  userwallet: string;
  privateKey: string;
  source: string[];
};
// 지갑 주소로 작성한 글 조회 api
export async function PostBlogPosts(BlogData: BlogPosts) {
  try {
    const response = await axios.post(`${baseURL}/article/news`, {
      title: BlogData.title,
      content: BlogData.textarea,
      accountAddress: BlogData.userwallet,
      ACCOUNT_PRIVATE_KEY: BlogData.privateKey,
      reference: BlogData.source,
    });
    return response.data;
  } catch (error) {
    throw new Error('error');
  }
}
