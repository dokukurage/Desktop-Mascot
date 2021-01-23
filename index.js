const fs = require('fs').promises;
const imgPath = './images/';
const messages = [
  "こんにちは！",
  "少し休憩しましょうか？",
  "あまり根を詰めすぎないでくださいね",
  "もうひと頑張りですね！"
];

function resize(canvas) {
  var displayWidth  = canvas.clientWidth;
  var displayHeight = canvas.clientHeight;

  if (canvas.width  != displayWidth ||
    canvas.height != displayHeight) {
    canvas.width  = displayWidth;
    canvas.height = displayHeight;
  }
}


//ジェネレータ関数・　（function）
async function draw() {
  // canvas準備
  //querySelectorでhtml要素の検出
  const main = document.querySelector('div#main');
  const board = document.querySelector("#board");  //getElementById()等でも可。オブジェクトが取れれば良い。
  if (!board.getContext) {
    alert('キャンバスが取得できませんでした');
    return;
  }
  resize(board);

  let ctx = board.getContext('2d');
  //コードを一時停止？（await）
  //→その後実行するように　変数名"filelist"→ファイルは複数だ
  //データを配列として（imgPath内から）取得（fs.readdir）　その後"="で↑に入れる
  let filelist = await fs.readdir(imgPath);


  //画像は一枚ずつ表示（同時は無理）
  for (let i = 0; i < filelist.length; i++) {
    //Imageは画像読み込みの時のオブジェクト→変数charaに
    let chara = new Image();
    //charaの中にある.srcという部分に設定
    //imgPathでフォルダ「image」の（2行目に記載）中の
    //[i]番目のファイルを読み込む
    chara.src = imgPath + filelist[i];  // 画像のURLを指定
    //読み込みが終わってから（onload）画像を表示（drawImage）
    chara.onload = () => {
      //変数chara内の画像を～の座標に
      //画像128ずつ分下にずらし
      //ctx.drawImage(chara, i *300, 0);
      ctx.drawImage(
        chara,
        board.width - chara.width,
        board.height - chara.height
      );
      console.info(chara.width, chara.height, chara.naturalWidth, chara.naturalHeight);
      console.info(board.width, board.height);
    };
    showBalloon(board.height - chara.height - 150, board.width - chara.width);
  }
}

function showBalloon(top, left) {
  console.info("showBalloon");
  let main = document.querySelector('#main');
  if (child = document.querySelector('div.balloon1')) {
    main.removeChild(child);
  }
  let balloon = document.createElement('div')
  balloon.classList.add("balloon1");
  balloon.appendChild(
    document.createTextNode(choiceMessage())
  );
  balloon.style.top = top;
  balloon.style.left = left;
  main.appendChild(balloon);
}

function choiceMessage() {
  let rnd = Math.floor(
    Math.random() * messages.length
  );
  return messages[rnd]
}

//ページを読み終わったら
window.onload = () => {
  //draw関数を実行してください
  draw();
  setInterval(draw, 3000);
};