// This handles the "?url" imports for Next/Image
declare module "*.svg?url" {
  const content: string;
  export default content;
}

// This handles standard imports
declare module "*.svg" {
  import React from "react";
  const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}
