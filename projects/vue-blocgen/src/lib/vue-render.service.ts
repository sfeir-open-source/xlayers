import { Injectable } from '@angular/core';
import { VueContextService, VueBlocGenContext } from './vue-context.service';
import { CssOptimizerService } from '@xlayers/css-blocgen';

@Injectable({
  providedIn: 'root'
})
export class VueRenderService {
  constructor(
    private vueContextService: VueContextService,
    private cssOptimizerService: CssOptimizerService
  ) {}

  private componentDir = 'components';

  render(current: SketchMSLayer, data?: SketchMSData) {
    if (this.vueContextService.hasContext(current)) {
      const context = this.vueContextService.contextOf(current);
      return [
        ...this.traverse(data, current).map(file => ({ ...file, kind: 'vue' })),
        {
          kind: 'vue',
          value: this.renderComponent(current, context),
          language: 'html',
          uri: `${this.componentDir}/${current.name}.vue`
        },
        {
          kind: 'vue',
          value: this.renderComponentSpec(current.name),
          language: 'javascript',
          uri: `${this.componentDir}/${current.name}.spec.js`
        }
      ];
    }

    return [];
  }

  private traverse(data: SketchMSData, current: SketchMSLayer) {
    if (this.vueContextService.identify(current)) {
      return (current.layers as any).flatMap(layer =>
        this.traverse(data, layer)
      );
    }
    return this.retrieveFiles(data, current);
  }

  private retrieveFiles(data: SketchMSData, current: SketchMSLayer) {
    if ((current._class as string) === 'symbolInstance') {
      return this.retrieveSymbolMaster(data, current);
    }
    return [];
  }

  private retrieveSymbolMaster(data: SketchMSData, current: SketchMSLayer) {
    const foreignSymbol = data.document.foreignSymbols.find(
      x => x.symbolMaster.symbolID === (current as any).symbolID
    );

    if (!foreignSymbol) {
      return [];
    }

    return this.render(foreignSymbol.symbolMaster, data);
  }

  private renderComponentSpec(name: string) {
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

    return `\
import { shallowMount } from "@vue/test-utils";
import ${capitalizedName} from "@/${[this.componentDir, name].join('/')}.vue";

describe("${capitalizedName}", () => {
  it("render", () => {
    const wrapper = shallowMount(${capitalizedName}, {});
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});`;
  }

  private renderComponent(current: SketchMSLayer, context: VueBlocGenContext) {
    return `\
<template>
${context.html.join('\n')}
</template>

<script>
${this.renderScript(context.components)}
</script>

<style>
${this.cssOptimizerService.parseStyleSheet(current)}
</style>`;
  }

  private renderScript(components: string[]) {
    const imports = components
      .map(
        component =>
          `import ${component} from "${[this.componentDir, component].join(
            '/'
          )}"`
      )
      .join('\n');

    return components.length === 0
      ? `\
export default {}`
      : `\
${imports}

export default {
  components: {
    ${components.join(',\n    ')}
  }
}`;
  }
}