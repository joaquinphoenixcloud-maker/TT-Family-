// appwrite.js
import { Client, Account, Databases, Storage, ID, Query } from 'appwrite';

// =================================================================================
// === သင့်ရဲ့ Appwrite ID များကို အတိအကျ ဖြည့်သွင်းပြီးသား ဖြစ်သည် ===
// =================================================================================
const PROJECT_ID = '692a504e001aab41aabd';      
const DATABASE_ID = '632ac8f69902499d38cb';      
const COLLECTION_ID = '692a643a0011a48237cd';  
const BUCKET_ID = '692a6530000db49b8618';      

const client = new Client();
client
    // သင်ပေးပို့သော Endpoint URL (Singapre server) ကို သတ်မှတ်ထားသည်
    .setEndpoint('https://sgp.cloud.appwrite.io/v1') 
    .setProject(PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

// =========================================================================
// ၁။ Login ဝင်ရောက်ခြင်း Function
// =========================================================================
export async function loginUser(email, password) {
    try {
        // Appwrite မှာ Email Session တစ်ခု စတင်ပါ
        await account.createEmailSession(email, password);
        // Login အောင်မြင်ပါက Dashboard စာမျက်နှာသို့ ပို့ပါ
        window.location.href = '/dashboard.html';
    } catch (error) {
        console.error("Login Failed:", error);
        // Login ပုံစံမှာ Error Message ပြသရန်
        throw new Error("Username (သို့မဟုတ်) Password မှားနေပါသည်။");
    }
}

// =========================================================================
// ၂။ Logout ထွက်ခွာခြင်း Function
// =========================================================================
export async function logoutUser() {
    try {
        await account.deleteSession('current');
        window.location.href = '/index.html'; // Login စာမျက်နှာသို့ ပြန်ပို့ပါ
    } catch (error) {
        console.error("Logout Failed:", error);
    }
}

// =========================================================================
// ၃။ ပုံ/ဗီဒီယို Content များကို ဆွဲထုတ်ခြင်း Function
// =========================================================================
export async function getMediaItems() {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [Query.orderDesc('dateAdded')] // dateAdded ကော်လံနဲ့ အသစ်ဆုံးကို အရင် စီပါ
        );
        return response.documents;
    } catch (error) {
        console.error("Failed to fetch media items:", error);
        return [];
    }
}

// =========================================================================
// ၄။ File Link ကို ရယူခြင်း Function
// =========================================================================
export function getFilePreview(fileId) {
    // ဓါတ်ပုံ/ဗီဒီယို ကြည့်ရှုနိုင်ဖို့ Public Link ကို ရယူခြင်း
    return storage.getFilePreview(BUCKET_ID, fileId);
}

// =========================================================================
// ၅။ လက်ရှိ User ကို စစ်ဆေးခြင်း Function
// =========================================================================
export async function checkAuth() {
    try {
        const user = await account.get();
        return user;
    } catch (error) {
        // Login မဝင်ထားရင် Error တက်ပြီး null ပြန်လာပါမယ်
        return null;
    }
}
