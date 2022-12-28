const axios = require('axios');

class Requests {
    async get(url, method, headers, data){
        try {
            return await axios(
                {
                    method: method, 
                    url:  url,
                    data: { ...data },
                    headers: { ...headers },
                }
            )
        } catch (e) {
            throw e;
        }
    }
}

module.exports = new Requests();