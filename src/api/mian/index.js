import request from "@/api/request.js"

// 获取收藏
function listAction(data) {
  return request({
    url: "/bufan/collect/listAction",
    data
  })
}
// 意见反馈
function  submitAction(data) {
  return request({
    method:"post",
    url: "/bufan/feedback/submitAction",
    data
  })
}
export {
  listAction,
  submitAction
}