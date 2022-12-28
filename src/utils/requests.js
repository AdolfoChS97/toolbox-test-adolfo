const axios = require('axios');

class Requests {
    async get(url, method, headers, data){
        return await axios(
            {
                method: method, 
                url:  url,
                data: { ...data },
                headers: { ...headers },
            }
        )
    }
}

module.exports = new Requests();