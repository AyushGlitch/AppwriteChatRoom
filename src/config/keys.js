const conf ={
    appwriteurl : String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
}

export default conf