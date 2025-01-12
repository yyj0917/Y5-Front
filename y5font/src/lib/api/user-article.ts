import axios from 'axios';

const baseURL = "/api";

// 지갑 주소로 작성한 글 조회 api - article
export async function fetchUserArticleList(account_address: string, type: string) {
  try {
    const response = await axios.get(`${baseURL}/api/article`, {
      params: {
        account_address: account_address,
        type: type,
      }, // Request Body에 포함
    });
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
    return response.data;
  } catch (error) {
    throw new Error('error');
  }
}

// 트랜젝션 해시로 수정 리스트 불러오는 api
export async function fetchUserEditList(transaction_hash: string) {
  try {
    const response = await axios.get(`${baseURL}/article/history`, {
      params: {
        transaction_hash: transaction_hash,
      }, // Request Body에 포함
    });
    return response.data;
  } catch (error) {
    throw new Error('error');
  }
}

type ArticleData = {
  id: string;
  title: string;
  content: string;
  accountAddress: string;
  ACCOUNT_PRIVATE_KEY: string;
  reference: string[];
  type: string;
};
// 글 수정하는 api
export async function updateArticle(articleData: ArticleData) {
  try {
    const response = await axios.post(`${baseURL}/article/update`, {
      id: articleData.id,
      title: articleData.title,
      content: articleData.content,
      accountAddress: articleData.accountAddress,
      ACCOUNT_PRIVATE_KEY: articleData.ACCOUNT_PRIVATE_KEY,
      reference: articleData.reference,
      type: articleData.type,
    });
    return response.data;
  } catch (error) {
    throw new Error('error');
  }
}
