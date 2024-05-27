import * as fs from "fs";
import { SafeParseReturnType, SafeParseSuccess, z } from "zod";
import { Json } from "./common";
import { ModelEnum } from "./parseModel";

export const BrandEnum = z.enum([
  "apple",
  "google",
  "motorola",
  "samsung",
  "dell",
  "lg",
  "microsoft",
  "oneplus",
]);

export type BrandEnum = z.infer<typeof BrandEnum>;
const RawBrand = z.record(BrandEnum, z.array(ModelEnum));
export type RawBrand = z.infer<typeof RawBrand>;

export function parseRawBrandFile(url: string): RawBrand {
  const jsonString = fs.readFileSync(url, "utf-8");
  const jsonData = JSON.parse(jsonString);

  return parseRawBrand(jsonData);
}

function parseRawBrand(data: Json): RawBrand {
  const parsed = RawBrand.safeParse(data);
  if (!parsed.success) {
    console.error(parsed.error);
    throw parsed.error;
  }
  return parsed.data;
}
