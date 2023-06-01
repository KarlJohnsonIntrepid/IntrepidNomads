import { Blog, PrismaClient } from "@prisma/client";
import UrlUtils from "../url-util";

export interface GroupedPosts {
  group: {
    id: number;
    name: string;
    link: string;
    hasCountry: boolean;
    short: string;
  };
  posts: Blog[];
}

export interface PageablePost {
  id: any;
  post: Blog;
  posts: Blog[];
}

export default class BlogData {
  private prisma: PrismaClient;
  private plan = 1012;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getGroupedPostsForHome(): Promise<GroupedPosts[]> {
    let groups = await this.getGroupedPosts();
    groups.forEach((group) => {
      //clean up data we dont want embedded in the static page
      group.posts.forEach((p) => {
        for (var key in p) {
          if (key === "content") delete p[key];
          if (key === "seoTitle") delete p[key];
        }
      });
    });

    return groups;
  }

  //Used with the router to get the route ids (e.g the title parameter in the URL)
  public async getPostIds() {
    const posts = await this.prisma.blog.findMany();
    return posts.map((t) => {
      return {
        params: {
          id: UrlUtils.formatLink(t.title),
        },
      };
    });
  }

  //Load data for the post page
  //Takes the grouped data from the main page and flattens it so that the order matches the homepage
  public async getPostData(id: any): Promise<PageablePost> {
    const groupedPosts = await this.getGroupedPosts();

    //Switch groups to the post.
    groupedPosts.forEach((group) => {
      group.posts.forEach((post) => {
        post["group"] = group.group;
      });
    });

    let posts = groupedPosts.map((group) => group.posts).flat();
    let post = posts.find((post) => UrlUtils.formatLink(post.title) === id);

    //clean up data we dont want embedded in the static page
    posts.forEach((p) => {
      if (p.id !== post.id) {
        for (var key in p) {
          if (key !== "id" && key !== "title") delete p[key];
        }
      }
    });

    return {
      id,
      post,
      posts,
    };
  }

  //Use to load all blogs, categorise them and order them
  //Blog creation is frozen so no need to make dynamic
  //Also add additional meta info here not store in the db
  private async getGroupedPosts(): Promise<GroupedPosts[]> {
    let dbPosts: Blog[] = await this.prisma.blog.findMany();

    dbPosts.forEach((post) => {
      post.content = post.content.replaceAll(".jpg", ".webp");
      post.content = post.content.replaceAll(".JPG", ".webp");
    });

    let groups: GroupedPosts[] = [
      {
        group: {
          id: 1011,
          name: "Canada and USA",
          link: "usa",
          hasCountry: true,
          short: null,
        },
        posts: this.getBlogForCountries(dbPosts, 1011, 1012),
      },
      {
        group: {
          id: 1013,
          name: "Mexico",
          link: null,
          hasCountry: true,
          short: null,
        },
        posts: this.getBlogForCountry(dbPosts, 1013),
      },
      {
        group: {
          id: 1017,
          name: "Belize",
          link: null,
          hasCountry: true,
          short: null,
        },
        posts: this.getBlogForCountry(dbPosts, 1017),
      },
      {
        group: {
          id: 1020,
          name: "Guatemala",
          link: null,
          hasCountry: true,
          short: null,
        },
        posts: this.getBlogForCountry(dbPosts, 1020),
      },
      {
        group: {
          id: 1021,
          name: "El Salvador & Honduras",
          link: null,
          hasCountry: false,
          short: "El Salvador",
        },
        posts: this.getBlogForCountry(dbPosts, 1021),
      },
      {
        group: {
          id: 1025,
          name: "Nicaragua",
          link: null,
          hasCountry: true,
          short: null,
        },
        posts: this.getBlogForCountry(dbPosts, 1025),
      },
      {
        group: {
          id: 1026,
          name: "Costa Rica",
          link: null,
          hasCountry: true,
          short: null,
        },
        posts: this.getBlogForCountry(dbPosts, 1026),
      },
      {
        group: {
          id: 1030,
          name: "Panama",
          link: null,
          hasCountry: true,
          short: null,
        },
        posts: this.getBlogForCountry(dbPosts, 1030),
      },
      {
        group: {
          id: 1031,
          name: "Colombia",
          link: null,
          hasCountry: true,
          short: null,
        },
        posts: this.getBlogForCountry(dbPosts, 1031),
      },
      {
        group: {
          id: 1039,
          name: "Brazil",
          link: null,
          hasCountry: true,
          short: null,
        },
        posts: this.getBlogForCountry(dbPosts, 1039),
      },
      {
        group: {
          id: 1040,
          name: "Uruguay",
          link: null,
          hasCountry: true,
          short: null,
        },
        posts: this.getBlogForCountry(dbPosts, 1040),
      },
      {
        group: {
          id: 1038,
          name: "Argentina",
          link: null,
          hasCountry: true,
          short: null,
        },
        posts: this.getBlogForCountry(dbPosts, 1038),
      },
      {
        group: {
          id: 1041,
          name: "Chile",
          link: null,
          hasCountry: true,
          short: null,
        },
        posts: this.getBlogForCountry(dbPosts, 1041),
      },
      {
        group: {
          id: 1042,
          name: "Bolivia",
          link: null,
          hasCountry: true,
          short: null,
        },
        posts: this.getBlogForCountry(dbPosts, 1042),
      },
      {
        group: {
          id: 1048,
          name: "Peru",
          link: null,
          hasCountry: true,
          short: null,
        },
        posts: this.getBlogForCountry(dbPosts, 1048),
      },
      {
        group: {
          id: 1049,
          name: "Romania",
          link: null,
          hasCountry: false,
          short: null,
        },
        posts: this.getBlogForCountry(dbPosts, 1049),
      },
      {
        group: {
          id: 1050,
          name: "India",
          link: null,
          hasCountry: true,
          short: null,
        },
        posts: this.getBlogForCountry(dbPosts, 1050),
      },
      {
        group: {
          id: 1051,
          name: "Malaysia and Borneo",
          link: null,
          hasCountry: false,
          short: "Malaysia",
        },
        posts: this.getBlogForCountry(dbPosts, 1051),
      },
      {
        group: {
          id: 1052,
          name: "Singapore",
          link: null,
          hasCountry: false,
          short: null,
        },
        posts: this.getBlogForCountry(dbPosts, 1052),
      },
      {
        group: {
          id: 1016,
          name: "Leaving the UK",
          link: null,
          hasCountry: false,
          short: null,
        },
        posts: this.getBlogForCountry(dbPosts, 1016),
      },
      {
        group: {
          id: 9001,
          name: "Trip Planning",
          link: null,
          hasCountry: false,
          short: null,
        },
        posts: this.getBlogForCategory(dbPosts, this.plan),
      },
      {
        group: {
          id: 8,
          name: "Everest Base Camp",
          link: null,
          hasCountry: false,
          short: null,
        },
        posts: this.getBlogForCountry(dbPosts, 8),
      },
      {
        group: {
          id: 7,
          name: "Italy and Jordan",
          link: null,
          hasCountry: false,
          short: null,
        },
        posts: this.getBlogForCountries(dbPosts, 4, 7),
      },

      {
        group: {
          id: 1009,
          name: "Morroco",
          link: null,
          hasCountry: false,
          short: null,
        },
        posts: this.getBlogForCountry(dbPosts, 1009),
      },
    ];

    return groups;
  }

  private getBlogForCountry(dbPosts: Blog[], id: number) {
    let posts = dbPosts.filter((post) => post.countryId === id);
    return this.orderByDate(this.filterCategories(posts));
  }

  private getBlogForCountries(dbPosts: Blog[], id: number, id2: number) {
    let posts = dbPosts.filter(
      (post) => post.countryId === id || post.countryId === id2
    );
    return this.orderByDate(this.filterCategories(posts));
  }

  private getBlogForCategory(dbPosts: Blog[], id: number) {
    let posts = dbPosts.filter((post) => post.categoryId === id);
    return this.orderByDate(posts);
  }

  private filterCategories(array: Blog[]) {
    return array.filter((post) => post.categoryId !== this.plan);
  }

  private orderByDate(array: Blog[]) {
    return array.sort((a, b) => a.date.getTime() - b.date.getTime());
  }
}
