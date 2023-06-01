export default class UrlUtils {
  static formatLink(title: string): string {
    return title
      .trim()
      .replace(",", "-")
      .replaceAll(" ", "-")
      .replaceAll("-–-", "-")
      .replaceAll("--", "-")
      .replaceAll("--", "-")
      .toLowerCase();
  }
}
