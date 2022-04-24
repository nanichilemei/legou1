import request from "@/api/request.js"

function submitAction(data) {
  return request({
    method: "post",
    url: "/bufan/order/submitAction",
    data
  })
}
function detailAction(data) {
  return request({
    url: "/bufan/order/detailAction",
    data
  })
}

export {
  submitAction,
  detailAction
}