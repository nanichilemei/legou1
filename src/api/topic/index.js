import request from "@/api/request.js"

function listaction(data) {
  return request({
    url: "/bufan/topic/listaction",
    data
  })
}

function detailaction(data) {
  return request({
    url: "/bufan/topic/detailaction",
    data
  })
}

export {
  listaction,
  detailaction
}