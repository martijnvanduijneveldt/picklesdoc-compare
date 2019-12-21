export class PathUtil {

  private static pathRegex = /(?:\\|\/)/g;

  static getPath(path: string): string[] {
    return path.split(PathUtil.pathRegex);
  }
}