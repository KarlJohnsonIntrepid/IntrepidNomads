export function getAttrFromString(
  str: string,
  node: string,
  attr: string
): Array<string> {
  let regex = new RegExp("<" + node + " .*?" + attr + '="(.*?)"', "gi"),
    result: any[],
    res = [];
  while ((result = regex.exec(str))) {
    res.push(result[1]);
  }
  return res;
}
