declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_PROJECT_ID: string;
      EXPO_PUBLIC_PROJECT_ID: string;
      EXPO_PUBLIC_DATABASE_ID: string;
      EXPO_PUBLIC_USER_COLLECTION_ID: string;
      EXPO_PUBLIC_VIDEO_COLLECTION_ID: string;
      EXPO_PUBLIC_BOOKMARK_COLLECTION_ID: string;
      EXPO_PUBLIC_STORAGE_ID: string;
    }
  }
}

export {};