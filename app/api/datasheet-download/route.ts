import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { leadId, datasheetUrl } = await request.json();

    if (!leadId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Lead ID is required'
        },
        { status: 400 }
      );
    }

    if (!datasheetUrl) {
      return NextResponse.json(
        {
          success: false,
          message: 'Datasheet URL is required'
        },
        { status: 400 }
      );
    }

    // Log the download for analytics
    console.log(`Datasheet download triggered for lead: ${leadId}, file: ${datasheetUrl}`);

    // Path to datasheet file (remove leading slash from datasheetUrl)
    const datasheetPath = path.join(process.cwd(), 'public', datasheetUrl.replace(/^\//, ''));

    try {
      // Check if datasheet file exists
      await fs.access(datasheetPath);

      // Read the file
      const datasheetBuffer = await fs.readFile(datasheetPath);

      // Extract filename from URL
      const filename = datasheetUrl.split('/').pop() || 'STELZ-Datasheet.pdf';

      // Return the file as download
      return new NextResponse(datasheetBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${filename}"`,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
    } catch (fileError) {
      console.error('Datasheet file not found:', fileError);
      return NextResponse.json(
        {
          success: false,
          message: 'Datasheet file not found'
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Datasheet download API error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error'
      },
      { status: 500 }
    );
  }
}
