import {Client, Databases, Account} from 'appwrite';
import keys from './keys.js'

const client = new Client();

client
    .setEndpoint(keys.appwriteurl)
    .setProject(keys.appwriteProjectId);

export const databases = new Databases(client)
export const account = new Account(client)

export const PROJECT_ID = keys.appwriteProjectId
export const COLLECTION_ID = keys.appwriteCollectionId
export const DATABASE_ID = keys.appwriteDatabaseId

export default client;
