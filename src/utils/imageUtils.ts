import fs from "fs";
import path from "path";
import sharp from "sharp";

//TYPES OF IMAGE EXTENSIONS ACCEPTED
const IMAGE_EXTENSIONS: string[] = [
  ".jpg",
  ".jpeg",
  ".png",
  ".tiff",
  ".jfif",
  ".svg",
];

//CHECK IF IMAGE EXISTS IN THE MEDIA DIRECTORY
const checkForImage = (filename: string, subpath: string): string | null => {
  for (const i in IMAGE_EXTENSIONS) {
    const pathCheck = path.join(
      __dirname,
      `../../media/${subpath}/${filename + IMAGE_EXTENSIONS[i]}`
    );

    if (fs.existsSync(pathCheck)) return pathCheck;
  }
  return null;
};

//RESIZE IMAGE IN MEDIA/IMAGES DIRECTORY AND CACHES IT IN MEDIA/THUMBS
const resizeImage = async (
  filePath: string,
  width: number,
  height: number
): Promise<string> => {
  const fileName = path.basename(filePath).replace(".", `-${width}-${height}.`);

  const newFileLocation = path.join(
    __dirname,
    "../../media/thumbs/" + fileName
  );

  const { width: imageWidth, height: imageHeight } = await sharp(
    filePath
  ).metadata();
  if (imageWidth && width > imageWidth) {
    throw new Error("Width Param larger than Image Width");
  }
  if (imageHeight && height > imageHeight) {
    throw new Error("Height Param larger than Image Height");
  }
  await sharp(filePath).resize(width, height).toFile(newFileLocation);

  return newFileLocation;
};

export { checkForImage, resizeImage };
