import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000';

type BlogPosts = {
  title: string;
  textarea: string;
  userwallet: string;
  privateKey: string;
  source: string[];
};
// blog 글 작성 api
export async function PostBlogPosts(BlogData: BlogPosts) {
  try {
    const response = await axios.post(`${baseURL}/article/blog`, {
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
// blog 글 조회 api
export async function fetchBlogPosts() {
  try {
    const response = await axios.get(`${baseURL}/article/blog`);
    return response.data;
  } catch (error) {
    throw new Error('error');
  }
}
// blog 글 상세조회 api
export async function fetchBlogPostsDetail(id: string) {
  try {
    const response = await axios.get(`${baseURL}/article/detail/${id}`, {
      params: {
        type: 'blog',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('error');
  }
}
