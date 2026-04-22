import fs from "node:fs";
import path from "node:path";
import type { ComponentPropsWithoutRef } from "react";

import { imageSize } from "image-size";
import Image from "next/image";

type MdxImageProps = Omit<ComponentPropsWithoutRef<"img">, "src" | "alt"> & {
  src?: string;
  alt?: string;
  caption?: string;
  priority?: boolean;
};

export function MdxImage({ src, alt = "", caption, priority = false }: MdxImageProps) {
  if (!src) {
    return null;
  }

  let width = 1440;
  let height = 960;

  if (src.startsWith("/")) {
    try {
      const fileBuffer = fs.readFileSync(path.join(process.cwd(), "public", src.replace(/^\//, "")));
      const dimensions = imageSize(fileBuffer);

      if (dimensions.width && dimensions.height) {
        width = dimensions.width;
        height = dimensions.height;
      }
    } catch {
      width = 1440;
      height = 960;
    }
  }

  return (
    <figure className="not-prose my-10 space-y-3">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="w-full rounded-image border border-border"
        sizes="(min-width: 1280px) 72rem, (min-width: 768px) calc(100vw - 6rem), calc(100vw - 3rem)"
      />
      {caption || alt ? <figcaption className="text-sm text-muted">{caption ?? alt}</figcaption> : null}
    </figure>
  );
}
