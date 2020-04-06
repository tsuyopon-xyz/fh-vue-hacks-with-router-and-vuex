# エクササイズ

【Firebase連携版】ページ切り替えができる掲示板アプリを作る

(Vue編の「【エクササイズ】掲示板アプリとFirebaseを連携する」で作成したアプリに機能追加をする形)

## ステップ1. Vue Routerの追加と、それに伴う不要ファイルの削除と一部ファイルの修正を行う

1. 完成形の動作確認(これから実装するアプリのイメージを把握する)
1. Vue編の「【エクササイズ】掲示板アプリとFirebaseを連携する」のコードをgit cloneして前回課題の完成形をダウンロードする
    - もしくは自分で作成したアプリを使うのであれば、git cloneの必要は無し
1. Vue Routerを追加する
1. Vue Routerを追加した際の不要ファイルの削除とコード一部修正

---

## ステップ2. 今回の課題で行うFirestoreの構造の修正を解説する

1. スライドを使って前回のFirestoreの構成と、今回修正するFirestoreの構成を解説する
1. Firestoreの構成を修正する
    - channels(collection)
        - general(doc)
            - name(field): 全体連絡
            - messages(collection)
                - id: (ランダム値)
                    - メッセージデータ1(doc)
                - id: (ランダム値)
                    - メッセージデータ1(doc)
                - id: (ランダム値)
                    - メッセージデータ1(doc)
        - chat
            - name(field): 雑談部屋
            - messages(collection)
        - self-introduction
            - name(field): 自己紹介
            - messages(collection)

---

## ステップ3. ルーティングの設定と表示を行う

1. 「MessageView.vue」をsrc/viewsディレクトリに移動する
    - Firebaseを使わない方の課題で、「Main.vue → MessageView.vue」という名前に変更
1. ルーティングの設定を行う
    - 以下の設定を行う
        - /:channelId : MessageView
1. App.vueの修正
    - Firebase連携していない方と同じような修正を行う
        - MessageView.vueのstyleを持ってくる
        - router-viewを埋め込む
1. MessageView.vueがうまく動かない場合は、コメントアウトなどをしてとにかくtemplateが表示される所まで修正する

## ステップ4. SideMenuのメニュー情報をFirestoreから引っ張ってくる

1. Firestoreにchannelsの初期情報を設定しておく
1. Firestoreとやり取りするコードを修正・新規作成する
    - 修正
        - src/db/index.js
            - messagesを指定している部分の削除
            - channelsを指定するコードを追加
    - 新規作成
        - src/models/Channel.js
            - channelsコレクション情報を取得する機能の実装
            - Channelインスタンスは「id」「name」プロパティを保持できるようなconstructorを実装する
1. Firestoreから取得したchannelsの情報を使ってメニューをSideMenu動的に生成する
    - 「src/models/Channel.js」を使ってFirestoreからChannel一覧情報を取得してdataにセットする
    - dataにセットしたChannel一覧情報を使って、router-linkを使ってメニューを作る
        - 「/:channelId」の部分はchannelIdを使う(general, chat, self-introductionが入る)
    - Firestoreのchannelsにドキュメントを追加したら、動的にメニューが増えることを確認する
        - 説明用に追加するだけなので、説明が終わったらすぐに削除する
    - SideMenu.vueのスタイルが崩れたらスタイルの調整も行う
1. ページ遷移が出来ているか確認するために「$route.params.channelId」を表示する

---

## ステップ5. general, chat, self-introductionのmessagesを表示するための実装をする

1. 予めchannelそれぞれのmessagesサブコレクションに1件ずつダミーデータを用意する
1. src/db/index.jsに追加実装する
    - channelIdを渡すと、「channels/:channelId/messages」にアクセスできるオブジェクトを返す関数を用意する
1. src/models/Message.jsを修正する
    - 「fetchMessages」メソッドの修正
        - 引数にchannelIdを受け取れるように修正する
        - 引数で受け取ったchannelIdを使って、1つ前に「src/db/index.js」に追加実装した機能を呼び出して、「channels/:channelId/messages」にアクセスできるオブジェクトを取得する
1. src/views/MessageView.vueを修正する
    - 「src/models/Message」の「fetchMessages」メソッド実行時に「channelIdを渡す」
        - $route.params.channelIdを使う
    - 「/:channelId」間のページ遷移でも、各channelのmessagesを取得できるような修正をする
        - watchを使って「$route」を監視する

---

## ステップ6. channel毎のmessagesにデータを送信できるようにする

1. src/models/Message.jsを修正する
    - 「save」メソッドで、channelIdも受け取れるようにする
    - 1つ前のステップで「src/db/index.js」に追加実装した機能を呼び出して、「channels/:channelId/messages」にアクセスできるオブジェクトを取得する
    - 「channels/:channelId/messages」にアクセスできるオブジェクトを使って、channel特有のmessagesにデータを送信する
1. src/components/TextBox.vueを修正する
    - propsに「channelId」を追加する(type:String, required: true)
    - 「src/models/Message.js」の「save」メソッド実行時に、送信データの他にchannelIdも渡すようにする
1. src/views/MessageView.vueを修正する
    - template内でTextBoxに「:channelId="$route.params.channelId"」を追加する