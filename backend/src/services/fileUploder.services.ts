import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME as string,
    api_key: process.env.CLOUD_API_KEY as string,
    api_secret: process.env.CLOUD_API_SECRET as string
});

export const uploadOnCloud = async (filePath: string, maxTries = 3): Promise<UploadApiResponse | null> => {
    if (!filePath) return null;
    let attempt = 0;

    while (attempt < maxTries) {
        try {
            const res: UploadApiResponse = await cloudinary.uploader.upload(filePath, {
                resource_type: "auto",
            });

            return res;
        } catch (error) {
            attempt++;
            console.warn(`Upload attempt ${attempt} failed. Retrying...`);
            if(attempt >= maxTries) {
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
                console.error("Cloudinary upload failed: ", error);
                return null;
            }
            await new Promise((resolve) => setTimeout(resolve, 500));
        }
    }
    
    return null;
};