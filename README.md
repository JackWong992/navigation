# navigation
思路：
* 大致的数据结构
* [使用JS动态创建键盘按键](#使用JS动态创建键盘按键)
* [监听键盘事件](#监听键盘事件)
   * [通过hash下标获得相应的网站并且进入](#通过hash下标获得相应的网站并且进入)
   * [实现编辑hash对应的网站](#实现编辑hash对应的网站)
   * [localStorage实现用户输入保存](#localStorage实现用户输入保存)
## 构建一个数据结构
1. hash用来存放监听键盘事件对应的网站
```javascript
  var hash = {
    'q': 'qq.com',
    'w': 'weibo.com',
    ...
    'z': 'www.zelaer.com'
  }
```
2. key对象用来管理键盘对应的按键
```javascript
  var keys = {
    '0': {0:'q'....,9: 'p',length: 10},
    '1': {...length: 9},
    '2': {0:'z', .... length: 7},
    'length': 3
  }
```

## 使用JS动态创建键盘按键
```javascript
  index = 0
  while (index<keys['length']){
    userDiv = document.creatElment('div')//生成
    userMain.appendChild( userDiv )//添加

    var rows = keys[index] //第一排数组，第二排数组，第三排数组
    var index2 = 0
    while( index2<rows['length'] ){
      userKbd=document.createElement('kbd')//生成
      userKbd.textContent = rows[index2] //0-9 0-8 0-7  qwer   asd  zxc
      userDiv.appendChild(userKbd)//插入
      index2++
    }
      index++
  }
//外层循环负责实现每一行
//内层循环负责实现每一行键盘的键
//我当时比较难想到的是实现内层循环的 我引入rows变量可以解决。。
```

## 监听键盘事件
```javascript
  document.onkeypress = function(userHandleKey ){
    console.dir(userHandleKey)
  }
/*
altKey: false
bubbles: true
cancelBubble: false
cancelable: true
charCode: 113
code: "KeyQ"
composed: true
ctrlKey: false
currentTarget: null
defaultPrevented: false
detail: 0
eventPhase: 0
isComposing: false
isTrusted: true
key: "q"
keyCode: 113
location: 0
*/
//Q对应的相关的信息
```
### 通过hash下标获得相应的网站并且进入
```javascript
  key = userHandleKey['key']//q w e r
  website = hash[key]
  window.open('http://'+website, '_blank')
```
### 实现编辑hash对应的网站
```javascript
  buttonX = document.createElement(button)
  buttonX.textContent = 'edit'
  buttonX.id = row[index2]
  buttonX.onclick = function(userHandleKey){
     key =  userHandleKey.target.id // q w e r t
     userInputWebsite = prompt('请输入你要到达的网站')
     hash[key] = userInputWebsite //hash[key]对应的网站进入用户输入的网站
  }
  kbd.appendChild( buttonX )
```

## localStorage实现用户输入保存
```javascript
覆盖原始的hash:
  localStorage.setItem('userSaveHash',hash[key])
保存覆盖的hash：
  var hashInLocalStorage = JSON.parse( localStorage.getItem('userSaveHash') || null )
  if( hashInLocalStorage ){
    hash = hashInLocalStorage
  }
```
获取键盘对应网站的favico
```javascript
  webSiteFavicon = document.createElement('img')
  if( hash[row[index2] ){
    webSiteFavicon.src = 'http://'+hash[row[index2]]+'/favicon.ico'
  }else {
    img.src="http://xxx"  //如果获取不到favicon就是用我们自己的事先准备好的图片
  }
  kbd.appendChild( webSiteFavicon )

  //有些网站的favicon是找不到的，或者403错误，所以我们要引入错误判断的机制
  img.onerror = function(e){
    console.log('下载失败啦...')
    e.target.src ="http://xxx" //你事先准备好的图片
  }
```
favico的图标实时更新
```javascript
  buttonX.onclick = function(event){
    button2 = event.target
   img2 = button2.preciousSibling //找到编辑选框前面的img元素
    hash[key] =x 
    img2.src = "http://"+x+'/favico.ico'
    img2.onerror = function(xxx){
      xxx.target.src ="xxx"//你事先准备好的图片
    }
  }
```