import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Initialize the sheet - reusing the client if already initialized
let doc: GoogleSpreadsheet | null = null;

export async function getDoc() {
    // If doc is set, it means we successfully loaded it previously
    if (doc) return doc;

    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
        throw new Error('Missing Google Sheets environment variables');
    }

    const serviceAccountAuth = new JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        scopes: [
            'https://www.googleapis.com/auth/spreadsheets',
        ],
    });

    const newDoc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await newDoc.loadInfo();

    // Only assign to global variable if loadInfo succeeded
    doc = newDoc;

    return doc;
}
