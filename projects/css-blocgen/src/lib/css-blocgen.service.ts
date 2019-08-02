import { Injectable } from '@angular/core';
import { CssContextService } from './css-context.service';
import { CssParserService } from './css-parser.service';
import { CssRenderService } from './css-render.service';
import { CssBlocGenOptions } from './css-blocgen';
import { SketchMSData } from '../../../../src/app/core/sketch.service';

@Injectable({
  providedIn: 'root'
})
export class CssBlocGenService {
  constructor(
    private cssContext: CssContextService,
    private cssParser: CssParserService,
    private cssRender: CssRenderService
  ) {}

  compute(
    current: SketchMSLayer,
    data: SketchMSData,
    options?: CssBlocGenOptions
  ) {
    this.cssParser.compute(current, data, this.compileOptions(options));
  }

  render(current: SketchMSLayer, options?: CssBlocGenOptions) {
    return this.cssRender.render(current, this.compileOptions(options));
  }

  identify(current: SketchMSLayer) {
    return this.cssContext.identify(current);
  }

  context(current: SketchMSLayer) {
    return this.cssContext.contextOf(current);
  }

  private compileOptions(options: CssBlocGenOptions) {
    return {
      cssPrefix: 'xly_',
      componentDir: 'components',
      ...options
    };
  }
}
