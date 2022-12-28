const filesService = require('./files.service');

class FilesController {

    async getFiles(authorization){
        try {
            const fileNames = await filesService.getFileNames(authorization);
            const fileDetails = await Promise.allSettled(
                fileNames.map(
                    (fileName) => filesService.getFileDetails(authorization, fileName)
                    ,[]
                )
            );
            return fileDetails.map(({ status, value }, index) => {
                if(status != 'rejected') return filesService.processLines(value.data, fileNames[index]);
            } , []);
        } catch (e) {
            throw e;
        }
    }


}

module.exports = new FilesController();