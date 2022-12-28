const request = require('../../../utils/requests');

class FilesService {
    
    async getFileNames(authorization){
        const { data: { files } } = await request.get(
            `${process.env.REMOTE_SERVER_URL}/v1/secret/files`,
            'get',
            { authorization: authorization },
            {}
        );
        return files;
    }

     getFileDetails(authorization, fileName){
        return request.get(
            `${process.env.REMOTE_SERVER_URL}/v1/secret/file/${fileName}`,
            'get',
            { authorization: authorization },
            {}
        );
    }

    processLines(lines, fileName){
        const [ properties, ...data ] = lines.split('\n');
        const [ file, text, number, hex ] = properties.split(',');
        const result = { file: `${fileName}`, lines: [] };
        if(data.length == 0) return { file: `${fileName}`, lines: [] };
        data.forEach(line => {
            const [first, second, third, fourth ] = line.split(',');
            result.lines.push({ [file]: first, [text]: second, [number]: third, [hex]: fourth });
        });
        return result;
    }
}

module.exports = new FilesService();