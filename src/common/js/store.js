function saveToLocal(id, key, value) {
  let seller = window.localStorage._seller_
  if (!seller) {
    seller = {}
    seller[id] = {}
  } else {
    seller = JSON.parse(seller)
    if (!seller[id]) {
      seller[id] = {}
    }
  }
  seller[id][key] = value
  window.localStorage._seller_ = JSON.stringify(seller)
}
function readFromLocal(id, key, def) {
  let seller = window.localStorage._seller_
  if (!seller) {
    return def
  } else {
    seller = JSON.parse(seller)
    if (!seller[id]) {
      return def
    } else {
      return seller[id][key] ? seller[id][key] : def
    }
  }
}

export {saveToLocal,readFromLocal}
