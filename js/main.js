var keys = {
  '0': { 0: 'q', 1: 'w', 2: 'e', 3: 'r', 4: 't', 5: 'y', 6: 'u', 7: 'i', 8: 'o', 9: 'p', length: 10 },
  '1': { 0: 'a', 1: 's', 2: 'd', 3: 'f', 4: 'g', 5: 'h', 6: 'j', 7: 'k', 8: 'l', length: 9 },
  '2': { 0: 'z', 1: 'x', 2: 'c', 3: 'v', 4: 'b', 5: 'n', 6: 'm', length: 7 },
  'length': 3
}
var hash = {
  q: 'www.qq.com',
  w: 'www.weibo.com',
  e: 'www.ele.me',
  r: 'www.rails365.net',
  t: 'www.tencent.com',
  y: 'www.yy.com',
  u: 'www.uc.cn',
  i: 'www.iqiyi.com',
  o: 'oppo.cn',
  p: 'piao.qunar.com/',
  a: 'acfun.cn',
  s: 'sm.ms',
  d: 'www.douyu.com',
  f: 'www.facebook.com',
  g: 'www.google.com',
  h: 'www.hao6v.com',
  j: 'javascript.ruanyifeng.com',
  k: 'www.kaikeba.com',
  l: 'lol.qq.com',
  z: 'www.zhihu.com',
  x: 'xiedaimala.com',
  c: 'www.chungold.com',
  v: 'v.qq.com',
  b: 'www.baidu.com',
  n: 'www.namesilo.com',
  m: 'www.meiyou.com'
}
//取出localStorage中的zzz对应的hash
var hashInLocalStorage = JSON.parse(localStorage.getItem('zzz') || 'null')
if (hashInLocalStorage) {
  hash = hashInLocalStorage
}


index = 0
while (index < keys['length']) {
  div = document.createElement('div')
  div.className = 'row'
  main.appendChild(div)

  row = keys[index]
  index2 = 0
  while (index2 < row['length']) {
    kbd = document.createElement('kbd')
    kbd.textContent = row[index2]
    kbd.className = 'key'
    div.appendChild(kbd)
    img = document.createElement('img')
    if (hash[row[index2]]) {
      img.src = "http://" + hash[row[index2]] + "/favicon.ico"
    } else {
      img.src = "https://i.loli.net/2018/07/17/5b4d556e20650.jpg"
    }
    kbd.appendChild(img)
    //生成button按钮
    button = document.createElement('button')
    button.textContent = '编辑'
    kbd.appendChild(button)
    button.id = row[index2]


    button.onclick = function (handleKeyboard) {
      button2 = handleKeyboard['target']
      img2 = button2.previousSibling
      key = handleKeyboard['target']['id'] //得到 qwer...m
      goingWebsite = prompt('输入你将要进入的网地址(不需要输入http://哦)')
      hash[key] = goingWebsite
      img2.src = 'http://'+goingWebsite+'/favicon.ico'
      localStorage.setItem('zzz', JSON.stringify(hash))


    }
    index2++
  }
  index++
}

/*获取键盘监听事件*/
document.onkeypress = function (handleKeyboard) {
  //  console.log(handleKeyboard['key'])
  key = handleKeyboard['key']    //q wer
  website = hash[key]  //获取相关字母对应的网站
  //location.href = "http://"+website  //进入一个网站
  window.open('http://' + website, '_blank')
}