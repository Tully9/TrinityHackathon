import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// src/lib/utils.ts

export function getStrapiURL(path = "") {
  return `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"}${path}`;
}

 