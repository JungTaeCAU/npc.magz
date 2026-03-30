import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, phone, resultType } = req.body;

  if (!name || !phone || !resultType) {
    return res.status(400).json({ message: '필수 항목이 누락되었습니다.' });
  }

  try {
    // Google Sheets 인증
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEET_ID not configured');
    }

    // 현재 시간 (한국 시간)
    const timestamp = new Date().toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    // Google Sheets에 데이터 추가
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'info!A:D',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[timestamp, name, `'${phone}`, resultType]],
      },
    });

    return res.status(200).json({ success: true, message: '참여 완료!' });
  } catch (error) {
    console.error('Google Sheets error:', error);
    return res.status(500).json({ 
      message: '저장 중 오류가 발생했습니다.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
