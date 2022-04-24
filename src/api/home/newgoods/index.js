import request from "@/api/request.js"

function goodsList(data) {
  return request({
    url: "/bufan/goods/goodsList",
    data
  })
}

export {
  goodsList
}