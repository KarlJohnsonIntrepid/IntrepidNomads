export default class StringUtils {
  static cleanForHashAnchor(str: string): string {
    return str.toLowerCase().replaceAll(" ", "");
  }
}
