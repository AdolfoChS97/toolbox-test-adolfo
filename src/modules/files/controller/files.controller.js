const filesService = require('../service/files.service');

class FilesController {

    async getFiles(authorization, fileName = undefined){
        try {
            const files = fileName != undefined ? [fileName] : await filesService.getFileNames(authorization);
            const fileDetails = await Promise.allSettled(
                files.map(
                    (file) => filesService.getFileDetails(authorization, file)
                    ,[]
                )
            );
            return fileDetails.map(({ status, value }, index) => {
                if(status != 'rejected') return filesService.processLines(value.data, files[index]);
            } , []);
        } catch (e) {
            throw e;
        }
    }

    async getFileList(authorization) {
        try {
            return await filesService.getFileNames(authorization);
        } catch (e) {
            throw e;
        }
    }


}

module.exports = new FilesController();