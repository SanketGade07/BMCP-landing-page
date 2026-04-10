const GOOGLE_SHEETS_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL || '';

const logPrefix = (context) => (context ? `[Google Sheets] ${context}` : '[Google Sheets]');

export const sendToGoogleSheets = async (payload, context = '') => {
  if (!GOOGLE_SHEETS_WEBHOOK_URL) {
    console.warn(`${logPrefix(context)} Missing webhook URL. Set NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL in .env.local`);
    return;
  }

  try {
    const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`${logPrefix(context)} Request failed`, response.status, errorText);
    }

    return response;
  } catch (error) {
    console.error(`${logPrefix(context)} Request error`, error);
  }
};
