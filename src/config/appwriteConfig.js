import {Client, Databases, Account} from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65a7f8de19329edd5cfa');

export const databases = new Databases(client)
export const account = new Account(client)

export const PROJECT_ID = '65a7f8de19329edd5cfa'
export const COLLECTION_ID = '65a7f9bee9c3732cd850'
export const DATABASE_ID = '65a7f9b27721534c273a'

export default client;
