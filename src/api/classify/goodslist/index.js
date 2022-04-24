import request from "@/api/request.js"

function categoryNav(data) {
  return request({
    url: "/bufan/category/categoryNav",
    data
  })
}

function goodsList(data) {
  return request({
    url: "/bufan/goods/goodsList",
    data
  })
}


export {
  categoryNav,
  goodsList
}