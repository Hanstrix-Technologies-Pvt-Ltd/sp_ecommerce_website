// lib/leadCapture.ts
export interface LeadData {
  name: string;
  contactNumber: string;
  projectName: string;
  projectLocation: string;
  timestamp: string;
  source: 'brochure_download';
}

export interface LeadCaptureResponse {
  success: boolean;
  message: string;
  leadId?: string;
}

export async function submitLeadCapture(data: LeadData): Promise<LeadCaptureResponse> {
  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        source: 'brochure_download',
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Lead capture submission error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to submit lead. Please try again.',
    };
  }
}

export async function triggerBrochureDownload(leadId: string): Promise<void> {
  try {
    const response = await fetch('/api/brochure-download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ leadId }),
    });

    if (!response.ok) {
      throw new Error(`Failed to trigger download: ${response.status}`);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'STELZ-Multiparking-Brochure.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Brochure download error:', error);
    throw error;
  }
}
