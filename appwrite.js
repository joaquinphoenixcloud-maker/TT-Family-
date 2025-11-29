// appwrite.js
import { Client, Account, Databases, Storage, ID, Query } from 'appwrite';

// === သင်၏ Appwrite ID များကို ဒီနေရာတွင် အစားထိုးပါ ===
const PROJECT_ID = 'YOUR_APPWRITE_PROJECT_ID'; // <---- ဒီနေရာမှာ အစားထိုးပါ
const DATABASE_ID = '692a5880002409d389cb';      // <---- ဒီနေရာမှာ အစားထိုးပါ
const COLLECTION_ID = 'YOUR_COLLECTION_ID';  // <---- ဒီနေရာမှာ အစားထိုးပါ (t_family_ ရဲ့ ID)
const BUCKET_ID = 'YOUR_BUCKET_ID';          // <---- ဒီနေရာမှာ အစားထိုးပါ

const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1') // Cloud Appwrite ကို သုံးပါက ဒီအတိုင်းထားပါ
    .setProject(PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

// =========================================================================
// ၁။ Login ဝင်ရောက်ခြင်း
export async function loginUser(email, password) {
    try {
        await account.createEmailSession(email, password);
        // Login အောင်မြင်ပါက Dashboard စာမျက်နှာသို့ ပို့ပါ
        window.location.href = '/dashboard.html';
    } catch (error) {
        console.error("Login Failed:", error);
        throw new Error("Login ဝင်ရောက်မှု မအောင်မြင်ပါ။");
    }
}

// ၂။ Logout ထွက်ခွာခြင်း
export async function logoutUser() {
    try {
        await account.deleteSession('current');
        window.location.href = '/index.html'; // Login စာမျက်နှာသို့ ပြန်ပို့ပါ
    } catch (error) {
        console.error("Logout Failed:", error);
    }
}

// ၃။ ပုံ/ဗီဒီယို Content များကို ဆွဲထုတ်ခြင်း
export async function getMediaItems() {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [Query.orderDesc('dateAdded')] // dateAdded ကို အသစ်ဆုံးကနေ စီရန်
        );
        return response.documents;
    } catch (error) {
        console.error("Failed to fetch media items:", error);
        return [];
    }
}

// ၄။ File Link ကို ရယူခြင်း
export function getFilePreview(fileId) {
    // ဓါတ်ပုံ/ဗီဒီယို ကြည့်ရှုနိုင်ဖို့ Public Link ကို ရယူခြင်း
    return storage.getFilePreview(BUCKET_ID, fileId);
}

// ၅။ လက်ရှိ User ကို စစ်ဆေးခြင်း
export async function checkAuth() {
    try {
        const user = await account.get();
        return user;
    } catch (error) {
        return null;
    }
}
