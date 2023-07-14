import { Client,  Databases } from 'appwrite';


const client = new Client();

export const PROJECT_ID = '64b1463aed7d80e0eddf'
export const DATABASE_ID = '64b1498a28d3a97da3b8'
export const COLLECTION_ID_MESSAGES = '64b149965b584c04c4e8'


client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('64b1463aed7d80e0eddf');


export const databases = new Databases(client);

export default client;    

