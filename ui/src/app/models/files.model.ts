import { invalidFile, validFile } from "../interfaces/selector.interface";

export class Files {



    constructor(file: validFile | invalidFile) {

        if (file.valid) {

        } else {
            if (!file.MIME) {
                const a = file as unknown as error
                a.error
            } else {
                
            }
        }

    }

}