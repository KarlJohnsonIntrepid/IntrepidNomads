import { PrismaClient, UploadedImages } from "@prisma/client";

export default class ImagesData {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  //Used with the router to get the route ids (e.g the title parameter in the URL)
  public async getImagesPerBlog(id: number): Promise<UploadedImages[]> {
    let images = await this.prisma.uploadedImages.findMany();

    images.forEach((image) => {
      image.imageDescription = image.imageDescription.replaceAll(
        ".jpg",
        ".webp"
      );
      image.imageDescription = image.imageDescription.replaceAll(
        ".JPG",
        ".webp"
      );
    });

    return images.filter((image) => image.blogID === id);
  }
}
