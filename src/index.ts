import { Comparer } from "./comparer";

export function markdownDiff(oldStr: string, newStr: string): null {
  return new Comparer().exec(oldStr, newStr);
}
