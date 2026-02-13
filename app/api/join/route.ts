import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const guestsFilePath = path.join(process.cwd(), 'data', 'guests.json');

// Interface for Guest Data
interface Guest {
    name: string;
    guests: number;
    attending: string;
    message: string;
    timestamp: string;
}

// Helper to read data
function readGuests(): Guest[] {
    try {
        if (!fs.existsSync(guestsFilePath)) {
            // Create if it doesn't exist
            fs.mkdirSync(path.dirname(guestsFilePath), { recursive: true });
            fs.writeFileSync(guestsFilePath, JSON.stringify([], null, 2));
            return [];
        }
        const fileContent = fs.readFileSync(guestsFilePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error('Error reading guests:', error);
        return [];
    }
}

// Helper to write data
function writeGuests(guests: Guest[]) {
    try {
        fs.writeFileSync(guestsFilePath, JSON.stringify(guests, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing guests:', error);
        return false;
    }
}

export async function GET() {
    const guests = readGuests();
    // Return count and the list (for the admin view)
    return NextResponse.json({
        count: guests.length,
        guests: guests
    });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body || !body.name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        const newGuest: Guest = {
            name: body.name,
            guests: body.guests || 1,
            attending: body.attending || 'yes',
            message: body.message || '',
            timestamp: new Date().toISOString()
        };

        const guests = readGuests();
        guests.push(newGuest);

        if (writeGuests(guests)) {
            return NextResponse.json({ success: true, count: guests.length });
        } else {
            return NextResponse.json({ error: 'Failed to save guest' }, { status: 500 });
        }
    } catch (error) {
        console.error("Error processing POST:", error);
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
}
