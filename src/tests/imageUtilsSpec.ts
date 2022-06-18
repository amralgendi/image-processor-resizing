import { resizeImage, checkForImage } from "../utils/imageUtils";
import fs from "fs";
import path from "path";

describe('Tests Resizing Image Function. Tests are done on the "kitten.png" Image', () => {
  it("Should Return Thumb File Location with concatenated with and height", async () => {
    const result = await resizeImage(
      path.join(__dirname, "../../media/images/kitten.png"),
      200,
      200
    );
    expect(result).toBe(
      path.join(__dirname, "../../media/thumbs/kitten-200-200.png")
    );
  });
  it("Should throw a width error", async () => {
    let error;
    try {
      await resizeImage(
        path.join(__dirname, "../../media/images/kitten.png"),
        2000,
        200
      );
    } catch (e) {
      error = e;
    }
    const expectedError = new Error("Width Param larger than Image Width");
    expect(error).toEqual(expectedError);
  });
  it("Should throw a height error", async () => {
    let error;
    try {
      await resizeImage(
        path.join(__dirname, "../../media/images/kitten.png"),
        200,
        2000
      );
    } catch (e) {
      error = e;
    }
    const expectedError = new Error("Height Param larger than Image Height");
    expect(error).toEqual(expectedError);
  });
});

describe("Tests for Checking Images", () => {
  const thumbImages: { name: string; ext: string }[] = [];
  const images: { name: string; ext: string }[] = [];

  beforeAll(() => {
    fs.readdirSync(path.join(__dirname, "../../media/images")).forEach((i) =>
      images.push({ name: i.split(".")[0], ext: i.split(".")[1] })
    );
    fs.readdirSync(path.join(__dirname, "../../media/thumbs")).forEach((i) =>
      thumbImages.push({ name: i.split(".")[0], ext: i.split(".")[1] })
    );
  });
  it("should get Null", () => {
    expect(checkForImage("", "images")).toBeNull();
  });
  it("Should get Image Location for Random index", () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    expect(checkForImage(images[randomIndex].name, "images")).toEqual(
      path.join(
        __dirname,
        "../../media/images/" +
          images[randomIndex].name +
          "." +
          images[randomIndex].ext
      )
    );
  });
  it("Should get Thumbnail Location for Random index", () => {
    const randomIndex = Math.floor(Math.random() * thumbImages.length);

    expect(checkForImage(thumbImages[randomIndex].name, "thumbs")).toEqual(
      path.join(
        __dirname,
        "../../media/thumbs/" +
          thumbImages[randomIndex].name +
          "." +
          thumbImages[randomIndex].ext
      )
    );
  });
});
