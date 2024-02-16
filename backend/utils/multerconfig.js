
import multer, { MulterError } from "multer";


const acceptedMimeTypes = ["image/jpeg", "image/jpg" , "image/png", "image/tiff", "image/webp" ]



export const getMulterObject = ()=>{

const fileFilter = (req, file, cb)=>{

    if(acceptedMimeTypes.includes(file.mimetype)){
        cb(null, true)
    
    }
    else{
        cb(new MulterError("Wrong file type"), false)
    }
    
}



const storage = multer.memoryStorage()
const upload = multer({  storage ,fileFilter , limits:{fileSize:10000000}})

return upload


}
