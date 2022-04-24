import request from "@/api/request.js"

function detailaction(data) {
  return request({
    url: "/bufan/brand/detailaction",
    data
  })
}
function listaction(data) {
  return request({
    url: "/bufan/brand/listaction",
    data
  })
}

export {
  detailaction,
  listaction
}