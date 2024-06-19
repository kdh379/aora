import { Account, Avatars, Client, Databases, ID, ImageGravity, Models, Query, Storage } from "react-native-appwrite";
import { ImagePickerAsset } from "expo-image-picker";

import type { CreateFormSchemaType } from "@/app/(tabs)/create";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.gombandal.aora",
  projectId: "666ee708000b0ae7e6a3",
  databaseId: "666ee84b002566a2e05e",
  userCollectionId: "666ee86300194c66e807",
  videoCollectionId: "666ee87e00260f57c892",
  storageId: "666ee9a7002bcfd1832f",
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = config;

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(endpoint) // Your Appwrite Endpoint
  .setProject(projectId) // Your project ID
  .setPlatform(platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export interface User extends Models.Document {
  email: string;
  username: string;
  accountId: string;
  avatar: string;
}

interface SignUpProps extends Pick<User, "email" | "username"> {
  password: string;
}

interface SignInProps extends Pick<User, "email"> {
  password: string;
}

export const createUser = async({ email, password, username }: SignUpProps) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username,
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn({ email, password });

    const newUser = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        email,
        username,
        accountId: newAccount.$id,
        avatar: avatarUrl,
      },
    );

    return newUser;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create user", { cause: error });
  }
};

export const signIn = async({ email, password }: SignInProps) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    if (!session) throw Error;

    return session;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to sign in", { cause: error });
  }
};

const getAccount = async() => {
  try {
    // 로그인 정보가 없는 상태에서 요청할 경우 User (role: guests) missing scope (account) 에러 발생
    const currentAccount = await account.get();
    if (!currentAccount) return;

    return currentAccount;
  } catch (error) {
    // 로그인 정보 확인만을 위한 함수로 사용하므로 에러 처리 생략
  }
};

export const getCurrentUser = async(): Promise<User | undefined> => {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) return;

    const result = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal("accountId", currentAccount.$id)],
    );

    if (!result) throw Error;

    const currentUser = result.documents[0];

    return currentUser as User;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get current user", { cause: error });
  }
};

export const signOut = async() => {
  try {
    return await account.deleteSession("current");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to sign out", { cause: error });
  }
};

export interface Post extends Models.Document {
  title: string;
  thumbnail: string;
  prompt: string;
  video: string;
  creator: User;
}

export const getAllPosts = async(): Promise<Post[]> => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
    );

    return posts.documents as Post[];
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get all posts", { cause: error });
  }
};

export const getLatestPosts = async(): Promise<Post[]> => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)],
    );

    return posts.documents as Post[];
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get all posts", { cause: error });
  }
};

export const searchPosts = async(query: string): Promise<Post[]> => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.search("title", query)],
    );

    return posts.documents as Post[];
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get all posts", { cause: error });
  }
};

export const getUserPosts = async(userId: string): Promise<Post[]> => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.equal("creator", userId)],
    );

    return posts.documents as Post[];
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get all posts", { cause: error });
  }
};

const getFilePreview = async(fileId: string, type: "image" | "video") => {
  let fileUrl;
  try {
    if (type === "video") {
      fileUrl = storage.getFileView(storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(storageId, fileId, 400, 400, ImageGravity.Top, 100);
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error("Failed to get file preview", { cause: error });
  }
};

const uploadFile = async(file: ImagePickerAsset, type: "image" | "video") => {
  if (!file) return;

  const { mimeType, fileSize, fileName } = file;
  if (!mimeType || !fileSize || !fileName) throw new Error("Invalid file");

  try {

    const asset = {
      name: fileName,
      type: mimeType,
      size: fileSize,
      uri: file.uri,
    };

    const uploadFile = await storage.createFile(
      storageId,
      ID.unique(),
      asset,
    );

    const fileUrl = await getFilePreview(uploadFile.$id, type);
    return fileUrl;
  } catch (error) {
    new Error("Failed to upload file", { cause: error });
  }
};

export const createVideo = async(formData: CreateFormSchemaType & {userId: string}) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(formData.thumbnail, "image"),
      uploadFile(formData.video, "video"),
    ]);

    const newPost = await databases.createDocument(
      databaseId,
      videoCollectionId,
      ID.unique(),
      {
        title: formData.title,
        prompt: formData.prompt,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        creator: formData.userId,
      },
    );

    return newPost;
  } catch (error) {
    throw new Error("Failed to create video", { cause: error });
  }
};