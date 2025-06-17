import { generateGradientColor } from "@/lib/generateGradientColor";
import { useMemo } from "react";

export const useGradientColor = (categoryName: string) => {
  return useMemo(() => generateGradientColor(categoryName), [categoryName]);
};
