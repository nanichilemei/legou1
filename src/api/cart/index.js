import request from "@/api/request.js"

function cartList(data) {
  return request({
    url: "/bufan/cart/cartList",
    data
  })
}
function submitAction(data) {
  return request({
    method: "post",
    url: "/bufan/order/submitAction",
    data
  })
}
function deleteAction(data) {
  return request({
    url: "/bufan/cart/deleteAction",
    data
  })
}
export {
  cartList,
  submitAction,
  deleteAction
}