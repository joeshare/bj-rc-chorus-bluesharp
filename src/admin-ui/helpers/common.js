module.exports.getWindowSize = function () {
  // Author: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914

  // Modifier:

  return {
    width: window.innerWidth,
    height: window.innerHeight
  }
}
module.exports.getElementSize = function (el, isFragment) {
  // Author: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914

  // Modifier:

  function getSize (el) {
    return {
      width: el.offsetWidth,
      height: el.offsetHeight
    }
  }
  let temp = getSize(el)
  if (temp.width || temp.height) return temp
  // clone the el
  let copy = el.cloneNode(true)
  // ste some style to minimize the influence to the document
  copy.setAttribute('style', 'visibility: hidden; display: block !important; position: absolute !important;')
  let res = null
  // insert it to document
  if (isFragment) document.body.appendChild(copy)
  else console.log(el) && el.parentNode.insertBefore(copy, el)
  res = getSize(copy)
  // remove it
  if (isFragment) document.body.removeChild(copy)
  else el.parentNode.removeChild(copy)
  return res
}
module.exports.deepCopy = function (obj) {
  if (!(obj instanceof Array || obj instanceof Object)) throw new Error('can only deepCopy Array or Object')
  return JSON.parse(JSON.stringify(obj))
}
