import { Country, PrismaClient } from "@prisma/client";
import UrlUtils from "../url-util";

export default class CountryData {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  //Used with the router to get the route ids (e.g the title parameter in the URL)
  public async getCountryIds() {
    const countries = await this.prisma.country.findMany();

    return countries.map((t) => {
      return {
        params: {
          id: UrlUtils.formatLink(t.countryDescription),
        },
      };
    });
  }

  public async getCountry(name: string): Promise<Country> {
    name = name.replace("-", " ");
    let dbPosts = await this.prisma.country.findMany();

    let country = dbPosts.find(
      (country) => country.countryDescription.toLowerCase() === name
    );

    if (country) {
      country.countryInformation = country.countryInformation.replaceAll(
        ".jpg",
        ".webp"
      );
      country.countryInformation = country.countryInformation.replaceAll(
        ".JPG",
        ".webp"
      );
    }

    return country;
  }
}
