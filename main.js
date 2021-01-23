//index.jsからmain.jsに改名
//透明化の話
const electron = require('electron');
const {app, BrowserWindow} = electron
let win;

function createWindow () {
  var size = electron.screen.getPrimaryDisplay().size;
  // ブラウザウィンドウを作成
  win = new BrowserWindow({
    // requireが他のJSで動作するようにelectronを設定
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
    left: 0,
    top: 0,
    width: size.width,   // 最大サイズで表示する
    height: size.height, // 最大サイズで表示する
        frame: false,      // ウィンドウフレームを非表示に
    show: true,
        resizable: false,
//        alwaysOnTop: true,
        transparent: true // 背景を透明に
  });

  // デベロッパーツール自動起動
  // win.webContents.openDevTools();

  // マウス無効化
  //win.setIgnoreMouseEvents(true);

  win.maximize();
  //index.htmlをロード
  win.loadURL(`file://${__dirname}/index.html`);

  //ウィンドウが閉じられると発生
  win.on('closed', () => {
    win = null
  });

}
//Electronが初期化&ブラウザウィンドウを作成する関数を呼ぶ
app.on('ready', createWindow);

//ウィンドウが閉じられると終了
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});