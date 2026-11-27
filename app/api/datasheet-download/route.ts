import { NextRequest, NextResponse } from 'next/server';
import { resolveDocument } from '@/lib/cms/documents';

export const runtime = 'nodejs';

/**
 * Returns where to download a product datasheet from (the admin's uploaded version, or the
 * original), for the datasheet URL the product page sends.
 *
 * SECURITY: only datasheets listed in the product data resolve. The value comes from the
 * browser and is never used as a file path (the old version read any file on the server from
 * a "../" path, including .env and other secrets).
 * Like the brochure, the file isn't sent through this function: datasheets are 3–7 MB, over
 * Vercel's 4.5 MB response limit, so the browser downloads them directly.
 */
export async function POST(request: NextRequest) {
  try {
    const { leadId, datasheetUrl } = await request.json();
    if (!leadId) {
      return NextResponse.json({ success: false, message: 'Lead ID is required' }, { status: 400 });
    }
    const doc = await resolveDocument(datasheetUrl);
    if (!doc) {
      return NextResponse.json({ success: false, message: 'Invalid datasheet' }, { status: 400 });
    }
    return NextResponse.json({ success: true, url: doc.url, fileName: doc.fileName });
  } catch (error) {
    console.error('Datasheet download API error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
