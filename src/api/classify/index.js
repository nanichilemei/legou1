import request from "@/api/request.js"

function indexaction() {
  return request({
    url: "/bufan/category/indexaction",
  })
}

function currentaction(data) {
  return request({
    url: "/bufan/category/currentaction",
    data
  })
}

export {
  indexaction,
  currentaction
}