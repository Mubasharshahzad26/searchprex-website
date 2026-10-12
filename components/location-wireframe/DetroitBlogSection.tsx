"use client";

import React from "react";
import type { CityPage } from "@/lib/city-pages";
import LocationBlogTeaser from "./LocationBlogTeaser";

export default function DetroitBlogSection({ page }: { page: CityPage }) {
  return <LocationBlogTeaser page={page} />;
}
