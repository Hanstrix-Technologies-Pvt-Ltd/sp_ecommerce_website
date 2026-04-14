import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { leadId } = await request.json();

    if (!leadId) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Lead ID is required' 
        },
        { status: 400 }
      );
    }

    // Log the download for analytics
    console.log(`Brochure download triggered for lead: ${leadId}`);

    // Path to brochure file
    const brochurePath = path.join(process.cwd(), 'public', 'assets', 'brochure.pdf');

    try {
      // Check if brochure file exists
      await fs.access(brochurePath);
      
      // Read the file
      const brochureBuffer = await fs.readFile(brochurePath);
      
      // Return the file as download
      return new NextResponse(brochureBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="STELZ-Multiparking-Brochure.pdf"`,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
    } catch (fileError) {
      console.error('Brochure file not found:', fileError);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Brochure file not found' 
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Brochure download API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}
