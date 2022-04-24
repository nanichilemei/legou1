import instance from "../request";
function index() {
  return instance({
    url:"/bufan/index/index"
  })
}
export {
  index
}