import { NextResponse } from 'next/server';
import { getDoc } from '@/lib/googleSheets';

export async function GET() {
    try {
        const doc = await getDoc();
        const sheet = doc.sheetsByIndex[0]; // Access the first sheet
        const rows = await sheet.getRows();

        const guests = rows.map(row => ({
            name: row.get('name'),
            guests: parseInt(row.get('guests'), 10),
            attending: row.get('attending'),
            message: row.get('message'),
            timestamp: row.get('timestamp'),
        }));

        return NextResponse.json({
            count: guests.length, // Or calculate total guests if needed: guests.reduce((sum, g) => sum + g.guests, 0)
            guests: guests
        });
    } catch (error) {
        console.error('Error reading from Google Sheets:', error);
        return NextResponse.json({ count: 0, guests: [], error: 'Failed to fetch data' });
    }
}


export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body || !body.name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        const newGuest = {
            name: body.name,
            guests: body.guests || 1,
            attending: body.attending || 'yes',
            message: body.message || '',
            timestamp: new Date().toISOString()
        };

        const doc = await getDoc();
        const sheet = doc.sheetsByIndex[0];

        // Check if headers exist, if not set them
        let headersLoaded = false;
        try {
            await sheet.loadHeaderRow();
            headersLoaded = true;
        } catch (e) {
            // If loading headers fails (e.g. empty sheet), we'll set them below
        }

        if (!headersLoaded || sheet.headerValues.length === 0) {
            await sheet.setHeaderRow(['name', 'guests', 'attending', 'message', 'timestamp']);
        }

        await sheet.addRow(newGuest);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error adding to Google Sheets:", error);
        return NextResponse.json({ error: 'Failed to save guest' }, { status: 500 });
    }
}
