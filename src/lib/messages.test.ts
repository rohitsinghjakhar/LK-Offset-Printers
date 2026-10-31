import { describe, expect, it } from "vitest";
import en from "@messages/en.json";
import hi from "@messages/hi.json";

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

function shape(value: Json, path = ""): string[] {
  if (Array.isArray(value)) return value.flatMap((item, i) => shape(item, `${path}[${i}]`));
  if (value && typeof value === "object") return Object.entries(value).flatMap(([k, v]) => shape(v, path ? `${path}.${k}` : k));
  return [path];
}

describe("translations", () => {
  it("hi.json has exactly the same keys as en.json", () => {
    expect(shape(hi as Json).sort()).toEqual(shape(en as Json).sort());
  });

  it("no Hindi string is left empty except intentional blanks", () => {
    const leaves: [string, Json][] = [];
    const walk = (v: Json, p: string) => {
      if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${p}[${i}]`));
      else if (v && typeof v === "object") Object.entries(v).forEach(([k, x]) => walk(x, p ? `${p}.${k}` : k));
      else leaves.push([p, v]);
    };
    walk(hi as Json, "");
    // Word order differs between the languages, so these halves of a sentence may be blank in Hindi.
    const intentional = new Set(["home.cta.titleAfter", "city.titleBefore"]);
    const empty = leaves.filter(([p, v]) => v === "" && !intentional.has(p));
    expect(empty).toEqual([]);
  });
});
