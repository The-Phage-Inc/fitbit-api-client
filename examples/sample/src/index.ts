import * as dotenv from 'dotenv';
import express from 'express';
import { FitbitClient } from 'fitbit-api-client';
import { DatabaseMock } from './database-mock';

// .env.local ファイルから環境変数をロード
dotenv.config({ path: '.env.local' });

const CLIENT_ID = process.env.CLIENT_ID as string;
const CLIENT_SECRET = process.env.CLIENT_SECRET as string;
const REDIRECT_URI = process.env.REDIRECT_URI as string;

if (CLIENT_ID == null || CLIENT_SECRET == null || REDIRECT_URI == null) {
  throw new Error('環境変数が設定されていません');
}

const app = express();
const database = new DatabaseMock();

// 認可URLを取得してブラウザにリダイレクト
app.get('/auth', (req, res) => {
  // FitbitClientのインスタンスを作成
  const client = new FitbitClient({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  });
  const session = client.oauth.createSession(REDIRECT_URI);
  database.saveSession(session);

  const authorizationUrl = client.oauth.getAuthorizationUrl([
    'weight',
    'activity',
    'heartrate',
  ]);

  res.redirect(authorizationUrl);
});

// 認証のコールバック処理
app.get('/auth/callback', async (req, res) => {
  const { code, state } = req.query;

  if (!code || !state) {
    res.status(400).send('Code or state is missing');
    return;
  }

  // stateを使ってセッションを復元
  const sessionFromDb = database.findSessionByState(state as string);
  if (!sessionFromDb) {
    res.status(400).send('無効なセッションです。');
    return;
  }

  // FitbitClientのインスタンスを作成
  const client = new FitbitClient({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    session: sessionFromDb,
  });

  try {
    // OAuthのコールバックを処理し、トークンを取得
    const token = await client.oauth.handleOAuthCallback(
      code as string,
      state as string,
    );
    const successMessage = `認証完了: ${JSON.stringify(token)}`;

    await client.auth.refreshAccessToken();
    await client.auth.getAccessToken();

    // 成功メッセージを返す
    console.log(successMessage);
    res.send(successMessage);
  } catch (error) {
    console.error(error);
    res.status(500).send('認証エラーが発生しました');
  }
});

// サーバー起動
app.listen(3000, () => {
  console.log('こちらから認証を行ってください。 http://localhost:3000/auth');
});
