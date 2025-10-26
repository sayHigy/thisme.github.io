function myAxios(config) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        // 1.判断是否有查询请求
        if (config.params) {
            const pararObj = new URLSearchParams(config.params)
            const queryString = pararObj.toString()
            config.url += `?${queryString}`
        }
        //3.传入请求方式和目标资源位置
        xhr.open(config.method || 'GET', config.url)
        xhr.addEventListener('loadend', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.response))
            } else{
                reject(new Error(xhr.response))
            }
        })
        // 2.判断是否有传入进去的参数
        if(config.data){
            const jsonStr=JSON.stringify(config.data)
            xhr.setRequestHeader('Content-Type','application/json')
            xhr.send(jsonStr)
        }else{
            xhr.send()
        }
    })
}
