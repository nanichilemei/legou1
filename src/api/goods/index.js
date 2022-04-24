import request from "@/api/request.js"

function detailaction(data) {
  return request({
    url: "/bufan/goods/detailaction",
    data
  })
}
function addcollect(data) {
  return request({
    method:"post",
    url: "/bufan/collect/addcollect",
    data
  })
}
function addCart(data) {
  return request({
    method: "post",
    url: "/bufan/cart/addCart",
    data
  })
}
export {
  detailaction,
  addcollect,
  addCart
}