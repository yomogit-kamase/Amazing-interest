# Amazing Interest

経営・ブランディング・ITの専門家が、提案から実行まで支援するチームのランディングページです。

デザイン改訂では、[GMOマーケティングコネクト](https://www.gmo-c.jp/lp/marketing-connect/)の成果を先に示すファーストビュー、課題から解決へ進む構成、図解、反復CTA、ターコイズを基調としたトーンを参考にしています。コード・画像・文章・商標・実績値は転用していません。

公開URL: https://yomogit-kamase.github.io/Amazing-interest/

## 構成

- `lp/index.html`: ページの内容
- `lp/styles.css`: レイアウトとスマートフォン対応
- `lp/script.js`: メニュー、フォーム入力確認
- `lp/assets/`: オリジナルのイラスト画像（人物は架空）
- `.github/workflows/pages.yml`: GitHub Pagesへの自動デプロイ

ビルドや外部ライブラリは不要です。`lp/index.html`をブラウザで開くか、`lp`を静的サーバーで配信してください。

## 更新・公開

`main`へプッシュするとGitHub Actionsが`lp`のみをGitHub Pagesへ公開します。Actionsから手動実行も可能です。
CSS・JavaScriptを変更した場合は、`index.html`にある各ファイルURLの`?v=`を更新してください。

## フォームの状態

フォームは入力確認用で、申し込みを送信しません。入力内容の送信・保存処理はありません。
現在は検索エンジンのインデックス対象外（`noindex`）ですが、ページとリポジトリは誰でも閲覧できます。
実際の受付開始には、運営情報・個人情報の取り扱いの掲載、受信処理とスパム対策の実装・検証が必要です。

営業リスト・調査資料・ローカル作業ファイルは、このリポジトリの公開対象に含めません。
