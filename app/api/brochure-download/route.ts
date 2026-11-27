import { NextRequest, NextResponse } from 'next/server';
import { BROCHURE_KEY, resolveDocument } from '@/lib/cms/documents';

export const runtime = 'nodejs';

/**
 * Returns where to download the brochure from (the admin's uploaded version, or the original).
 *
 * The file itself is no longer sent through this function: the brochure is ~17 MB and Vercel
 * functions can't return more than 4.5 MB, so the browser downloads it directly instead.
 */
export async function POST(request: NextRequest) {
  try {
    const { leadId } = await request.json();
    if (!leadId) {
      return NextResponse.json({ success: false, message: 'Lead ID is required' }, { status: 400 });
    }
    const doc = await resolveDocument(BROCHURE_KEY);
    return NextResponse.json({ success: true, url: doc!.url, fileName: doc!.fileName });
  } catch (error) {
    console.error('Brochure download API error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
