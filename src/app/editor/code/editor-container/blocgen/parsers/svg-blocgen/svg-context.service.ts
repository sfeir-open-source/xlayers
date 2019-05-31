import { Injectable } from "@angular/core";

export interface SvgParserContext {
  paths: string;
  offset: number;
}

@Injectable({
  providedIn: "root"
})
export class SvgContextService {
  identify(current: SketchMSLayer) {
    return ["shapePath", "shapeGroup"].includes(current._class as string);
  }

  hasContext(current: SketchMSLayer) {
    return !!this.contextOf(current);
  }

  contextOf(current: SketchMSLayer) {
    return (current as any).svg || (current as any).paths;
  }

  putContext(
    current: SketchMSLayer,
    context: SvgParserContext = { paths: "", offset: 0 }
  ) {
    (current as any).svg = context;
  }
}
