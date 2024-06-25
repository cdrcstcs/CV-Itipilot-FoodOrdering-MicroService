import { Request, Response } from "express";
import Image from "../models/Image";
async function uploadImage(req: Request, res: Response) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }
        console.log(req.file?.filename);
        const image = new Image({
            image: req.file.filename
        });
        const savedImage = await image.save();
        res.json({ image: savedImage });
    } catch (error) {
        console.error('Error saving image to MongoDB:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function getImageById(req: Request, res: Response) {
    try {
        const imageId: string = req.params.id;
        const image = await Image.findById(imageId);
        if (!image) {
            return res.status(404).send('Image not found');
        }
        res.json(image);
    } catch (error) {
        console.error('Error fetching image from MongoDB:', error);
        res.status(500).send('Internal Server Error');
    }
}
export default { uploadImage, getImageById };
