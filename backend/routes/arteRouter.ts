//Import tools
import { Router } from "express";
import fs from 'fs-extra';
import { userAuth } from "../middleware/userAuth";
import Arte from "../models/Arte";
import { UserModel } from "../models/User";
import { uploadImage, deleteImage } from "../utils/cloudinary";

//Define router
const arteRouter = Router();

//Routes
arteRouter.get('/', async (req: any, res: any) => {
  try {
    const arte = await Arte.find({ show: true }).lean();
    return res.json({ arte });
    
  } catch (error: any) {
    return res.status(500).json({message: error.message})
  }
});

arteRouter.get('/user/:email', async (req: any, res: any) => {
  try {
    const user = await UserModel.findOne({email:req.params.email})

    const arte = await Arte.find({uid: user?.id, show: true }).lean();
    return res.json({ arte });
    
  } catch (error: any) {
    return res.status(500).json({message: error.message})
  }
});

arteRouter.post('/',userAuth, async (req: any, res: any) => {
  try {

    const { 
      initialDate,
      finalDate,
      title,
      image,
      link,
      show,
      description,
      category
    } = req.body

    const arte = new Arte({
      initialDate,
      finalDate,
      title,
      image,
      link,
      show,
      description,
      category,
      uid: req.uid
    })

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath)

      arte.image = {
        public_id: result.public_id,
        secure_url: result.secure_url
      };

      await fs.unlink(req.files.image.tempFilePath);
    };

    await arte.save()

    res.json({arte})
    
  } catch (error: any) {
    return res.status(500).json({message: error.message})
  }
});

arteRouter.get('/:id', async (req: any, res: any) => {
  try {
    const arte = await Arte.findById(req.params.id);
  
    if (!arte) 
      return res.status(404).json({message:"arte no encontrado"})
    ;
    
    if (arte.show === false)
      return res.status(404).json({message:"arte no disponible para mostrar"})
    ;

    res.send({arte});

  } catch (error: any) {
    return res.status(500).json({message: error.message});
  }
});

arteRouter.get('/secure/:id',userAuth , async (req: any, res: any) => {
  try {
    const arte = await Arte.findById(req.params.id);
  
    if (!arte) 
      return res.status(404).json({message:"arte no encontrado"})
    ;

    if (arte?.uid === req.uid)
      return res.status(401).json({message: "Este arte no le pertenece"})
    ;

    if (arte?.show === false)
      return res.status(404).json({message:"arte no disponible para mostrar"})
    ;

    res.send({arte});

  } catch (error: any) {
    return res.status(500).json({message: error.message});
  }
});

arteRouter.delete('/:id',userAuth , async (req: any, res: any) => {
  try {
    const arte = await Arte.findById(req.params.id)
  
    if (!arte) 
      return res.status(404).json({message:"arte no encontrado"})
    ;

    await deleteImage(arte.image);

    await arte.remove();

    res.send({arte});

  } catch (error: any) {
    return res.status(500).json({message: error.message})
  }
});

arteRouter.put('/:id',userAuth , async (req: any, res: any) => {
  try {
    const arte = await Arte.findById(req.params.id)

    if (!arte) 
      return res.status(404).json({message:"Registro no encontrado"})
    ;
    
    const updatedarte = await Arte.findByIdAndUpdate(req.params.id, req.body, {new: true})
    ;
    res.json({updatedarte});

  } catch (error: any) {
    return res.status(500).json({message: error.message})
  }
});

//Export routes
export default arteRouter