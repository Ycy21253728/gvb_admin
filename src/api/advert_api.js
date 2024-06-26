import {Service} from "@/services/service";

export function getAdvertListApi(params){
    return Service.get("/api/adverts",{params})
}

// 发布广告
export function createAdvertApi(data){
    return Service.post("/api/adverts", data)
}
// 更新广告
export function updateAdvertApi(id, data){
    return Service.put("/api/adverts/" + id, data)
}