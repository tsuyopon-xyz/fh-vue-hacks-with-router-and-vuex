# エクササイズ

【Firebase連携版】ページ切り替えができる掲示板アプリにVuexを組み込む

(Vue編の「エクササイズ】Firebase連携版ページ切り替えができる掲示板アプリを作る」で作成したアプリに機能追加をする形)

## ステップ1. Vuexの追加と、 テスト実行環境の準備

1. 完成形の動作確認(これから実装するアプリのイメージを把握する)
1. Vue Router編の「エクササイズ】Firebase連携版ページ切り替えができる掲示板アプリを作る」のコードをgit cloneして前回課題の完成形をダウンロードする
    - もしくは自分で作成したアプリを使うのであれば、git cloneの必要は無し
1. Vuexを追加する
1. テストの実行環境の準備をする
    - npm i -D jest
    - package.jsonのscriptsに 「"test": "jest"」を追加
    - Storeのテスト用に予めディレクトリを準備する
        - testのディレクトリ
        - storeのモジュールのディレクトリ

---

## ステップ2. stateのデータ構造の解説とダミーデータの準備

1. ダミーデータを使って、stateの構造を解説
1. 次回はgettersの実装を行い、今回用意したダミーデータを使って、メニューの表示とメッセージ一覧の表示を行う

---

## ステップ3. gettersの機能とテストの実装

1. gettersの実装ファイルとテストファイルを作成する
1. gettersのテストの作成と、機能の実装を行う
1. 実装したgettersをstoreに組み込む
    - modules/channelsにindex.jsでstate, getters, mutations, actionsを最終的に公開出来るようにする
1. ダミーデータでメニュー一覧とメッセージ一覧を表示する
    - SideMenuの修正
    - MessageViewの修正

---

## ステップ4. actionsでメニューデータを取得し、mutationsでstateにセットする

1. mutationsの機能実装とテスト作成
    - setChannelsメソッド
    - setLoadingメソッド
1. actionsの機能実装とテスト作成
    - fetchChannelsメソッド
        - jest.mockの簡単な説明
            - インターネット接続部分を実際のテストでも実行すると、テストに成功したり失敗したりと安定しないテストになる
                - ネット回線が繋がっていない時
                - ネット環境が不安定の時
            - インターネット接続が発生するメソッドを呼び出す時に、仮のデータを必ず返すようにすることで、あたかもインターネット経由でデータを取得したかのように振る舞うことができる
                - 実際にはインターネット接続を行わず、指定したメソッドの戻り値を予め決めた値に設定するだけ
                    - mockResolvedValue を使って、戻り値を固定でセットしている
            - mockResolvedValueのドキュメント
                - https://jestjs.io/docs/ja/mock-function-api#mockfnmockresolvedvaluevalue
1. mutationsとactionsをstoreに組み込む
1. SideMenuの修正
    - dispatchでメニューデータを取得しに行き、stateに保存する
    - gettersを使ってメニュー一覧を取得&表示
    - stateのloadingフラグを使って、読み込み中の時はSideMenuにSpinnerを表示する

## ステップ5. actionsでチャンネルごとのメッセージ一覧を取得し、mutationsでstateにセットする

1. mutationsの機能実装とテスト作成
    - setChannelMessages メソッド
1. actionsの機能実装とテスト作成
    - fetchChannelMessages メソッド
1. MessageViewの修正
    - dispatchでチャンネルごとのメッセージ一覧を取得しに行き、stateに保存する
    - gettersを使ってメッセージ一覧を取得&表示
    - stateのloadingフラグを使って、読み込み中の時はメッセージ一覧表示部分にSpinnerを表示する

## ステップ6. actionsでメッセージを送信して、 mutationsメッセージ一覧を更新する

1. mutationsの機能実装とテスト作成
    - addMessage メソッド
1. actionsの機能実装とテスト作成
    - postMessage メソッド
1. TextBoxの修正
    - postMessage用のloadingフラグを利用
    - dispatchでメッセージを送信
    - propsの削除
1. MessageViewの修正
    - TextBoxのprops削除に伴う、propsを渡している部分のコードを削除

## ステップ7. Vue.setを使うときと、使わなかったときの動作の違いを解説

1. mutations の setChannelMessages メソッドを確認
    - Vue.setを使っている現状の動作を再度確認
    - Vue.setの代わりに直接プロパティ埋め込みしたときの動作を確認
    - stateで各チャンネルの情報を予めセットしていない
        - channel情報はFirestoreから取得してきているため、事前にセットすることが出来ない
            - メニューを動的に増やせる
                - 例としてダミーのチャンネルを増やして再読み込みすると、Firestoreに追加したチャンネルがそのままメニューに追加される
                - 今回は実装していないが、Firestoreにメニューを追加するプログラムを実装すれば、好きなメニューを好きなだけ作れる
    - stateに予め準備していないプロパティを追加する際には、Vue.setを使う必要がある。(新しいプロパティを直接追加するとVueがプロパティの更新を検出できない。)
        - Vueのドキュメント
            - https://jp.vuejs.org/v2/api/#Vue-set
        - Vuexのドキュメント
            - https://vuex.vuejs.org/ja/guide/mutations.html#vue-%E3%81%AE%E3%83%AA%E3%82%A2%E3%82%AF%E3%83%86%E3%82%A3%E3%83%96%E3%81%AA%E3%83%AB%E3%83%BC%E3%83%AB%E3%81%AB%E5%89%87%E3%81%A3%E3%81%9F%E3%83%9F%E3%83%A5%E3%83%BC%E3%83%86%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3