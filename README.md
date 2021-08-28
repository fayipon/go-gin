# About this project

練手React + Golang 過程留下的紀錄

這是一個以博奕綜合盤為雛型的project

由於我是React+Golang菜雞,加上這是一人開發 (solo mode)

可以說是我第一個自作的React + golang Project

若有什麼地方不太ok , 煩請告知,並請多多指教

TG @fayitw

# TimeLine

 ✓ 啟動      (2021/08/12)

 ✓ React前端 (2021/08/17)
![image](https://github.com/fayipon/go-gin/blob/main/Demo/001.jpg?raw=true)
![image](https://github.com/fayipon/go-gin/blob/main/Demo/002.jpg?raw=true)

 ✓ 彩票時彩  (2021/08/21 完善)
![image](https://github.com/fayipon/go-gin/blob/main/Demo/003.jpg?raw=true)
![image](https://github.com/fayipon/go-gin/blob/main/Demo/004.jpg?raw=true)

真人  (2021/08/25 完善)
![image](https://github.com/fayipon/go-gin/blob/main/Demo/005.jpg?raw=true)
![image](https://github.com/fayipon/go-gin/blob/main/Demo/006.jpg?raw=true)

體育  

電競  

電子 

棋牌  

後台

# PATCHS
08/13 
1. Login Auth 
2. 前端粗略排版 

08/17
前端頁面
1. 原生游戲, 彩票 , 分分時彩
2. 原生游戲, 體育 , 虛擬賽事
3. 原生游戲, 棋牌 , 待定, 尚未有想法
4. 原生游戲, 電子 , 待定
5. 原生游戲, 真人 , 百家樂
6. 原生游戲, 電競 , 待定

8/19 
原生彩票
1. 注數計算, 下注金額統計, 及立即投注後, 清空已選的按紐
2. 上期獎期開獎號碼監聽及獎期倒數
3. lotttery_bet API (投注接口）

8/20
通用
1. 注冊優化, 現在會判斷用戶是否存在
2. 新增wallet 表, 注冊時即產生新紀錄
3. 預設用戶餘額 999999

8/21
1. remove View/React-bootstarp目錄 
2. login接口現在會回傳數據庫裡的正確餘額
3. lottery_bet 接口 , 現在會正確扣款, 並更新餘額
4. 新增定時任務機制 , 現在彩票會正確派獎
5. 新增帳變紀錄 , 現在彩票下注及派獎, 都會產生帳變紀錄
6. 彩票頁,現在會正確更新獎期

8/22 
1. 真人遊戲頁初步排版
2. 以影片做為真人視訊直播替代品 （因為沒打算做真的真人直播xd）

8/24
1. 真人投注接口實裝
增加了BaccaratOrderModel , BaccaratController

8/25
1. 真人開獎接口/腳本實裝
2. 真人開獎前端流程實裝

8/28
1. 增加websocket接口
2. 新增體育遊戲頁

