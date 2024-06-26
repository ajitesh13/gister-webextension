import axios from "axios";
import { backendUrl } from "./chat";

const proxyUrl = `${backendUrl}/data-proxy`;

export * from "./chat";

export const createUser = async (params: {
  email: string;
  name: string;
  profileImageUrl: string;
  password: string;
}): Promise<{ id: string }> => {
  const payload = {
    email: params.email,
    name: params.name,
    profile_image_url: params.profileImageUrl,
    password: params.password,
  };
  console.log("Payload:", payload);

  try {
    const res = await axios.post(`${proxyUrl}/insertuser`, payload);
    return new Promise((resolve) => resolve(res.data.insert_user_one));
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

export const getUser = async (params: {
  email: string;
}): Promise<{ id: string }> => {
  try {
    const res = await axios.post(`${proxyUrl}/getuserid`, params);
    return new Promise((resolve) => resolve(res.data.user[0]));
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

export const createBrain = async (params: {
  name: string;
}): Promise<{ id: string }> => {
  try {
    const res = await axios.post(`${proxyUrl}/insertbrain`, params);
    return new Promise((resolve) => resolve(res.data.insert_brain_one));
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

export const insertUserBrain = async (params: {
  userId: string;
  brainId: string;
}): Promise<{ id: number }> => {
  const payload = {
    user_id: params.userId,
    brain_id: params.brainId,
  };
  try {
    const res = await axios.post(`${proxyUrl}/insertuserbrain`, payload);
    return new Promise((resolve) => resolve(res.data.insert_user_brain_one));
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

export const getUserBrains = async (userId): Promise<any> => {
  const payload = { user_id: userId };
  try {
    const res = await axios.post(`${proxyUrl}/getuserbrain`, payload);
    return new Promise((resolve) => resolve(res.data.user_by_pk.user_brains));
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

export const createBookmark = async (params: {
  title: string;
  url: string;
  note: string;
  ownerId: string;
}): Promise<{ id: string }> => {
  const payload = {
    title: params.title,
    url: params.url,
    note: params.note,
    owner_id: params.ownerId,
  };
  try {
    const res = await axios.post(`${proxyUrl}/insertbookmark`, payload);
    return new Promise((resolve) => resolve(res.data.insert_bookmark_one));
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

export const insertBrainBookmark = async (params: {
  brainId: string;
  bookmarkId: string;
}): Promise<{ id: string }> => {
  const payload = {
    brain_id: params.brainId,
    bookmark_id: params.bookmarkId,
  };
  try {
    const res = await axios.post(`${proxyUrl}/insertbrainbookmark`, payload);
    return new Promise((resolve) =>
      resolve(res.data.insert_brain_bookmark_one)
    );
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

export const insertChat = async (params: {
  receiverUserId: string;
  senderUserId: string;
  text: string;
  url: string;
  responseSourceUrl: Array<string>;
  chatType: "user" | "system" | "notif";
}): Promise<{ id: string }> => {
  const payload = {
    receiver_user_id: params.receiverUserId,
    sender_user_id: params.senderUserId,
    text: params.text,
    url: params.url,
    response_source_url: params.responseSourceUrl,
    chat_type: params.chatType,
  };
  try {
    const res = await axios.post(`${proxyUrl}/insertchat`, payload);
    return new Promise((resolve) => resolve(res.data.insert_chat_one));
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

export const getBrainChat = async ({
  receiverUserId,
  senderUserId,
  lastCursor,
  pageSize,
}: {
  receiverUserId: string;
  senderUserId: string;
  lastCursor: number;
  pageSize: number;
}): Promise<
  [
    {
      chat_type: "user" | "system" | "notif";
      created_at: string;
      cursor_id: number;
      receiver_user_id: string;
      response_source_url: Array<string>;
      sender_user_id: string;
      text: string;
      url: string;
    },
  ]
> => {
  const payload = {
    receiver_user_id: receiverUserId,
    sender_user_id: senderUserId,
    last_cursor: lastCursor,
    page_size: pageSize,
  };
  try {
    const res = await axios.post(`${proxyUrl}/getbrainchat`, payload);
    return new Promise((resolve) => resolve(res.data.chat));
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

export const getBrainNotif = async ({
  receiverUserId,
  lastCursor,
  pageSize,
}: {
  receiverUserId: string;
  lastCursor: number;
  pageSize: number;
}): Promise<
  [
    {
      chat_type: "user" | "system" | "notif";
      created_at: string;
      cursor_id: number;
      receiver_user_id: string;
      response_source_url: Array<string>;
      sender_user_id: string;
      text: string;
      url: string;
    },
  ]
> => {
  const payload = {
    receiver_user_id: receiverUserId,
    last_cursor: lastCursor,
    page_size: pageSize,
  };
  try {
    const res = await axios.post(`${proxyUrl}/getbrainnotif`, payload);
    return new Promise((resolve) => resolve(res.data.chat));
  } catch (error) {
    console.error("Error posting data:", error);
  }
};
