import supertest from "supertest";
import app from "../index";
import fs from "fs";
import path from "path";

const request = supertest(app);

describe("Tests API endpoint responses", () => {
  it("Should get hello and status code 200", async () => {
    const response = await request.get("/test");

    expect(response.status).toEqual(200);
    expect(response.text).toEqual("hello");
  });
});
describe("Tests Image Processing Endpoint", () => {
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
  it("Should return status code 400 when height and width are not together", async () => {
    const response1 = await request.get("/api/images?filename=hello&width=200");
    const response2 = await request.get(
      "/api/images?filename=hello&height=200"
    );

    expect(response1.status).toBe(400);
    expect(response2.status).toBe(400);
  });
  it("Should return 200 Status code", async () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    const response = await request.get(
      `/api/images?filename=${images[randomIndex].name}`
    );

    expect(response.status).toBe(200);
  });
});
