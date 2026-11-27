// lib/leadCapture.ts
export interface LeadData {
  name: string;
  contactNumber: string;
  projectName: string;
  projectLocation: string;
  timestamp: string;
  source: 'brochure_download' | 'datasheet_download';
  /** Product title, for datasheet requests. */
  product?: string;
  /** Website page the form was submitted from (filled in automatically). */
  page?: string;
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
        page: data.page ?? (typeof window !== 'undefined' ? window.location.pathname : ''),
        timestamp: new Date().toISOString(),
      }),
    });

    // Read the body even for errors, so the visitor sees the server's message
    // ("Invalid contact number format", "Too many requests…") instead of "HTTP error 400".
    const result = (await response.json().catch(() => null)) as LeadCaptureResponse | null;
    if (!response.ok || !result) {
      return {
        success: false,
        message: result?.message || 'Failed to submit your details. Please try again.',
      };
    }
    return result;
  } catch (error) {
    console.error('Lead capture submission error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to submit lead. Please try again.',
    };
  }
}

/**
 * Ask the server which file to download (the admin's uploaded version or the original), then
 * download it directly from that link. The PDFs are 3–17 MB, too large to pass through a
 * Vercel function, so they're no longer fetched through the API.
 */
async function startDownload(endpoint: string, body: Record<string, string>): Promise<void> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const result = await response.json().catch(() => null);
  if (!response.ok || !result?.success || !result.url) {
    throw new Error(result?.message || `Failed to start download: ${response.status}`);
  }

  // Make sure the file exists before "downloading" it, so a missing file shows a clear message
  // instead of saving an error page as a .pdf. Only a definite "not found" stops the download:
  // if the check itself can't run (e.g. the storage bucket's CORS settings block it), go ahead
  // rather than blocking a file that is probably fine.
  const check = await fetch(result.url, { method: 'HEAD' }).catch(() => null);
  if (check && (check.status === 404 || check.status === 403)) {
    throw new Error('Sorry, this file is not available right now. Please contact us and we will send it to you.');
  }

  const a = document.createElement('a');
  a.href = result.url;
  a.download = result.fileName || '';
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export async function triggerBrochureDownload(leadId: string): Promise<void> {
  try {
    await startDownload('/api/brochure-download', { leadId });
  } catch (error) {
    console.error('Brochure download error:', error);
    throw error;
  }
}

export async function triggerDatasheetDownload(leadId: string, datasheetUrl: string): Promise<void> {
  try {
    await startDownload('/api/datasheet-download', { leadId, datasheetUrl });
  } catch (error) {
    console.error('Datasheet download error:', error);
    throw error;
  }
}
