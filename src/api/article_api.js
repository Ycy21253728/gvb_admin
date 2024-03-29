import { Service } from "@/services/service";

export function getCategoryListApi(){
    return Service.get("/api/categorys")
}

export function createArticleApi(data){
    return Service.post("/api/articles",data)
}

export function updateArticleApi(id,data){
    data.id=id
    return Service.put("/api/articles",data)
}

export function getArticleContentApi(id){
    return server.get("/api/articles/content/"+id)
}