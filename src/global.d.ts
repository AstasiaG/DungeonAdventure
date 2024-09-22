declare module '*.module.scss' {
  interface IClassNames {
    [className: string]: string
  }

  const classes: IClassNames;
  export = classes;
}

declare module '*.json';

declare module '*.png';
declare module '*.jpeg';
declare module '*.jpg';
declare module "*.svg" {
  import React from "react";
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}