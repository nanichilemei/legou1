import request from '@/api/request'

// 获取历史记录 热门搜索
function indexaction(data) {
  return request({
    url:'/bufan/search/indexaction',
    data
  })
}
// 清空历史记录
function clearhistoryAction(data) {
  return request({
    method:"post",
    url: "/bufan/search/clearhistoryAction",
    data
  })
}
// 搜索商品
function helperaction(data) {
  return request({
    url: "/bufan/search/helperaction",
    data
  })
}
// 添加到历史记录
function addhistoryaction(data) {
  return request({
    method:"post",
    url: "/bufan/search/addhistoryaction",
    data
  })
}

export {
  indexaction,
  clearhistoryAction,
  helperaction,
  addhistoryaction
  
}