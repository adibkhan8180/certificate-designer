export type Template_Type = {
  _id: string;
  variant: string;
  imgUrl: string;
  templateJson: {
    background: {
      orientation: {
        id: string;
        label: string;
        backgrounds: any[];
        backgroundColor?: string;
        dimensions: {
          widthCm: number;
          heightCm: number;
        };
        previewScale: number;
        displayScale: number;
      };
      img: string;
      orientationId?: number;
    }[];
    rndElemSet: {
      [elementId: string]: {
        elementType:
          | "TEXT"
          | "IMAGE"
          | "QRCODE"
          | "VARIABLE"
          | "SVG"
          | "SHAPE"
          | "AVATAR";
        elementId: number;
        rndProps: {
          position: {
            x: number;
            y: number;
          };
          size?: {
            width: number | string;
            height: number | string;
          };
        };
        rndStyle?: {
          zIndex: number;
        };
        imgUrl?: string;
        id?: string;
        html?: string;
        fontId?: string;
        textStyle?: {
          display?: string;
          fontSize: number;
          fontWeight: number;
          color?: string;
          fontStyle: string;
          textDecoration: string;
          orientationId?: number;
          fontFamily?: string;
          textAlign?: string;
          letterSpacing?: number;
          lineHeight?: number;
        };
        orientationId?: number;
      };
    };
  };
};
