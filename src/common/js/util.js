export function urlParse() {
  let url = window.location.search
  let reg = /[?&][^?&]+=[^?&/]+/g
  let arr = url.match(reg)
  console.log(arr)
  let obj = {}
  if (arr) {
    arr.forEach(elem => {
      let key = elem.substr(1).split('=')[0]
      let value = elem.substr(1).split('=')[1]
      obj[key] = value
    })
  }
  return obj
}
