// @ts-expect-error TS(7016): Could not find a declaration file for module 'mult... Remove this comment to see the full error message
import multer from 'multer';
import path from 'path';


  const __dirname = path.resolve();
const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
      let dest = __dirname + '/Assets/profile/';
      cb(null, dest);
    },
    filename: function (req: any, file: any, cb: any) {
      let filename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
      cb(null, filename);
    }
  });
  
const upload = multer({ storage: storage });

export default upload;