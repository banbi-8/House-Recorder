# House-Recorder

### 概要

家計簿アプリ。
Webアプリケーションとして作成。
家計を助けるために勉強しながら開発してみる。

### 開発環境
- OS：Mac Mojave
- ブラウザ：Google Chorome
- IDE:VSCode
- ローカルサーバー：MAMP(Machintosh apache mysql php)

### 使用言語・技術
- Javascript
- MySQL
- PHP
- apache

### 開発手順
1. MAMPでwebサーバーを起動
2. vscodeでF5で起動

### リリース手順
- herokuで公開
  - herokuはjavascriptアプリの公開ができなかったのでphpアプリとして公開(index.phpでindex.htmlを読み込む)
  - mysqlがdefaultでは使用できないのでアドオンを追加(参考：https://blog.nakamu.life/posts/heroku-mysql)
- terminalで`heroku login`を実行
- repositoryのURLが表示されるので、sousetreeからpush
