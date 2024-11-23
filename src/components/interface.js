import request from "@/utils/request.js";

export default {
    getDict(code) {
        return request({
            url: `/dict/get?code=${code}`,
            method: 'GET',
        });
    },
    register(form) {
        return request({
            url: `/user/register`,
            method: 'POST',
            data: form,
        })
    },
    getRandomCurrentLocation() {
        return request({
            url: `/dict/getRandomCurrentLocation`,
            method: 'GET',
        })
    }
}