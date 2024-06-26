import axios from "axios";

export const backendUrl = process.env.PLASMO_PUBLIC_BACKEND_URL;

export const chat = async ({
  userId,
  brainId,
  query,
}: {
  userId: string;
  brainId: string;
  query: string;
}) => {
  const payload = {
    user_id: userId,
    brain_id: brainId,
    query: query,
  };
  try {
    const res = await axios.post(`${backendUrl}/chat`, payload);
    return new Promise((resolve) => resolve(res.data.response));
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

export const createIndex = async (params: {
  userId: string;
  brainId: string;
}): Promise<{ msg: string }> => {
  const payload = {
    brain_id: params.brainId,
    user_id: params.userId,
  };
  try {
    const res = await axios.post(`${backendUrl}/create_index`, payload);
    return new Promise((resolve) => resolve(res.data.message));
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

export const insertContent = async (params: {
  userId: string;
  brainId: string;
  title: string;
  contentUrl: string;
  notes: string;
}): Promise<{ msg: string }> => {
  const payload = {
    brain_id: params.brainId,
    user_id: params.userId,
    title: params.title,
    content_url: params.contentUrl,
    notes: params.notes,
  };
  try {
    const res = await axios.post(`${backendUrl}/insert_content`, payload);
    return new Promise((resolve) => resolve(res.data.message));
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

export const getUserBookmarks = async (params: {
  userId: string;
}): Promise<[]> => {
  const payload = { user_id: params.userId };
  try {
    const res = await axios.post(`${backendUrl}/get_user_bookmarks`, payload);
    return new Promise((resolve) => resolve(res.data.bookmarks));
  } catch (error) {
    console.error("Error posting data:", error);
  }
};
