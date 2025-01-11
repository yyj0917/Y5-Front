import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000';

// 지갑 주소로 작성한 글 조회 api - article
export async function fetchUserArticleList(account_address: string, type: string) {
  try {
    const response = await axios.get(`${baseURL}/api/article`, {
      params: {
        account_address: account_address,
        type: type,
      }, // Request Body에 포함
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error('error');
  }
}
// 지갑 주소로 작성한 글 조회 api - blog
export async function fetchUserBlogList(account_address: string, type: string) {
  try {
    const response = await axios.get(`${baseURL}/api/article`, {
      params: {
        account_address: account_address,
        type: type,
      }, // Request Body에 포함
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error('error');
  }
}
