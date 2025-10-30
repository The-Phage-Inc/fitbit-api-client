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

// セッション保管用のDBモック
const database = new DatabaseMock();

// 認可URLを取得してブラウザにリダイレクト
app.get('/auth', (req, res) => {
  // FitbitClientのインスタンスを作成
  const client = new FitbitClient({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  });
  const session = client.oauth.createSession(REDIRECT_URI, true);
  database.saveSession(session);

  const authorizationUrl = client.oauth.getAuthorizationUrl([
    'profile',
    'weight',
    'activity',
    'heartrate',
    'sleep',
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
    // トークンをDBに保存
    database.saveRefreshToken(token.refreshToken);

    // 成功メッセージを返す
    res.send('認証に成功しました。');
    console.log('認証に成功しました。');
    console.log(
      'こちらにsleepから睡眠記録を閲覧できます。 http://localhost:3000/fitbit/sleep',
    );
    console.log(
      'HRVSummaryはこちらから閲覧できます。 http://localhost:3000/fitbit/heartrate/summary',
    );
    console.log(
      'HRVIntradayはこちらから閲覧できます。 http://localhost:3000/fitbit/heartrate/intraday',
    );
  } catch (error) {
    console.error(error);
    res.status(500).send('認証エラーが発生しました');
  }
});

// 睡眠記録を取得するサンプル
app.get('/fitbit/sleep', async (req, res) => {
  // トークンを取得
  const refreshToken = database.findRefreshToken();
  if (!refreshToken) {
    res.status(400).send('トークンがありません');
    return;
  }

  // FitbitClientのインスタンスを作成
  const client = new FitbitClient({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    token: { refreshToken },
  });

  // アクセストークンの更新
  await client.auth.refreshAccessToken();

  // オフセットを取得
  const profile = await client.profile.getProfile();

  // 睡眠記録を取得
  const sleep = await client.sleep.getSleepLog(
    '2025-10-01',
    profile.user.offsetFromUTCMillis,
  );
  res.status(200).json(sleep);
});

app.get('/fitbit/heartrate/summary', async (req, res) => {
  // トークンを取得
  const refreshToken = database.findRefreshToken();
  if (!refreshToken) {
    res.status(400).send('トークンがありません');
    return;
  }

  // FitbitClientのインスタンスを作成
  const client = new FitbitClient({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    token: { refreshToken },
  });

  // アクセストークンの更新
  await client.auth.refreshAccessToken();

  const hRVSummary = await client.heartRate.getHRVSummary('2024-10-07');
  res.status(200).json(hRVSummary);
});

app.get('/fitbit/heartrate/intraday', async (req, res) => {
  // トークンを取得
  const refreshToken = database.findRefreshToken();
  if (!refreshToken) {
    res.status(400).send('トークンがありません');
    return;
  }

  // FitbitClientのインスタンスを作成
  const client = new FitbitClient({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    token: { refreshToken },
  });

  // アクセストークンの更新
  await client.auth.refreshAccessToken();

  const hRVIntraday = await client.heartRate.getHRVIntraday('2024-10-07');
  res.status(200).json(hRVIntraday);
});

// サーバー起動
app.listen(3000, () => {
  console.log('こちらから認証を行ってください。 http://localhost:3000/auth');
});
