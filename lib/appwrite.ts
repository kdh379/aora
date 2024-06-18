import { Account, Avatars, Client, Databases, ID, Models, Query } from "react-native-appwrite";

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
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

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
      config.databaseId,
      config.userCollectionId,
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
      config.databaseId,
      config.userCollectionId,
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