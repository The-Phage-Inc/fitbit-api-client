# sample

FitbitAPIを使用したサンプルプログラムです。

## 使い方
1. [Fitbit Developer](https://dev.fitbit.com/apps/new)でアプリケーションを作成し、`client_id`と`client_secret`を取得します。<br/>
    また、リダイレクトURLを`http://localhost:3000/auth/callback`に設定します。
2. `.env`ファイルを`.env.local`にコピーし、以下のように`client_id`と`client_secret`を設定します。
    ```env
    CLIENT_ID=取得したclient_id
    CLIENT_SECRET=取得したclient_secret
    ```
3. 以下のコマンドを実行します。
    ```sh
    npm install
    npm run build
    npm run start
    ```