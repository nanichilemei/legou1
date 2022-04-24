import request from "@/api/request.js"

// 获取地址列表
function getListAction(data) {
  return request({
    url: "/bufan/address/getListAction",
    data
  })
}

// 获取地址详情
function detailAction(data) {
  return request({
    url: "/bufan/address/detailAction",
    data
  })
}
// 保存或添加地址
function saveAction(data) {
  return request({
    method: "post",
    url: "/bufan/address/saveAction",
    data

  })
}
export {
  getListAction,
  detailAction,
  saveAction
}