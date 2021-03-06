import { MatSnackBar } from '@angular/material/snack-bar';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { iif, patch } from '@ngxs/store/operators';
import { Injectable } from '@angular/core';
import {
  SketchMSData,
  SketchMSPageLayer,
  SketchMSLayer,
} from '@xlayers/sketchtypes';

export interface LayerCSS {
  transform: string;
  'border-radius': number;
  opacity: number;
  filter: string;
  'box-shadow': string;
  'background-color': string;
  background: string;
}

export interface DesignFile {
  name: string;
  icon: string;
  version: string;
}

export interface UiSettings {
  currentData: SketchMSData;
  currentPage?: SketchMSPageLayer;
  currentLayer?: SketchMSLayer;
  previousLayer?: SketchMSLayer;
  availablePages?: Array<SketchMSPageLayer>;
  wireframe?: boolean;
  preview?: boolean;
  settingsEnabled?: boolean;
  zoomLevel: number;
  is3dView: boolean;
  isCodeEditor: boolean;
  sourceFileData: DesignFile;
}

export enum ErrorType {
  Runtime = 'Runtime Error',
  None = '',
}

export class CurrentData {
  static readonly type = '[UiSettings] Current File';
  constructor(public data: SketchMSData) {}
}

export class SourceFileData {
  static readonly type = '[UiSettings] Source File Data';
  constructor(public data: DesignFile) {}
}

export class ToggleWireframe {
  static readonly type = '[UiSettings] Toggle Wireframe';
  constructor(public value: boolean) {}
}

export class AvailablePages {
  static readonly type = '[UiSettings] Available Pages';
  constructor(public pages: SketchMSPageLayer[]) {}
}

export class CurrentPage {
  static readonly type = '[UiSettings] Current Page';
  constructor(public page: SketchMSPageLayer) {}
}

export class CurrentLayer {
  static readonly type = '[UiSettings] Current Layer';
  constructor(public layer: SketchMSLayer) {}
}

export class SettingsEnabled {
  static readonly type = '[UiSettings] Enable Settings';
}

export class LayerPosition {
  static readonly type = '[UiSettings] Set Layer Position';
  public left: number;
  public top: number;
  constructor(
    { left, top }: { left: number; top: number } = { left: 0, top: 0 }
  ) {
    this.left = left;
    this.top = top;
  }
}

export class ZoomIn {
  static readonly type = '[UiSettings] Zoom In';
  constructor(public value: number = 0.1) {}
}
export class ZoomOut {
  static readonly type = '[UiSettings] Zoom Out';
  constructor(public value: number = 0.1) {}
}

export class ZoomReset {
  static readonly type = '[UiSettings] Zoom Reset';
  constructor() {}
}

export class Toggle3D {
  static readonly type = '[UiSettings] Toggle 3D';
  constructor(public value: boolean) {}
}
export class ToggleCodeEditor {
  static readonly type = '[UiSettings] Toggle Code Editor';
  constructor(public value: boolean) {}
}

export class ResetUiSettings {
  static readonly type = '[UiSettings] Reset UI Settings';
}

export class InformUser {
  static readonly type = '[UiSettings] Inform user';
  constructor(
    public message: string,
    public errorType: ErrorType = ErrorType.None
  ) {}
}

const DEFAULT_UI_STATE = {
  wireframe: false,
  preview: false,
  availablePages: [],
  previousLayer: null,
  currentData: null,
  currentPage: null,
  currentLayer: null,
  zoomLevel: 1,
  is3dView: false,
  isCodeEditor: false,
  sourceFileData: null,
};

@State<UiSettings>({
  name: 'ui',
  defaults: DEFAULT_UI_STATE,
})
@Injectable()
export class UiState {
  constructor(private snackBar: MatSnackBar) {}

  @Selector()
  static currentData(ui: UiSettings) {
    return ui.currentData;
  }

  @Selector()
  static sourceFileData(ui: UiSettings) {
    return ui.sourceFileData;
  }

  @Selector()
  static isWireframe(ui: UiSettings) {
    return ui.wireframe;
  }

  @Selector()
  static isPreview(ui: UiSettings) {
    return ui.preview;
  }

  @Selector()
  static currentPage(ui: UiSettings) {
    return ui.currentPage;
  }

  @Selector()
  static autoFixCurrentPagePosition(ui: UiSettings) {
    return ui.currentPage;
  }

  @Selector()
  static currentLayer(ui: UiSettings) {
    return ui.currentLayer;
  }

  @Selector()
  static availablePages(ui: UiSettings) {
    return ui.availablePages;
  }

  @Selector()
  static isSettingsEnabled(ui: UiSettings) {
    return ui.settingsEnabled;
  }
  @Selector()
  static zoomLevel(ui: UiSettings) {
    return ui.zoomLevel;
  }
  @Selector()
  static is3dView(ui: UiSettings) {
    return ui.is3dView;
  }
  @Selector()
  static isCodeEditor(ui: UiSettings) {
    return ui.isCodeEditor;
  }

  // Actions

  @Action(CurrentData)
  currentData(
    { patchState, dispatch }: StateContext<UiSettings>,
    action: CurrentData
  ) {
    dispatch([
      new AvailablePages(action.data.pages),
      new CurrentPage(action.data.pages[0]),
      new SettingsEnabled(),
      new ToggleWireframe(false),
      new ToggleCodeEditor(false),
    ]);
    patchState({
      currentData: { ...action.data },
    });
  }

  @Action(SourceFileData)
  sourceFileData(
    { patchState, dispatch }: StateContext<UiSettings>,
    action: SourceFileData
  ) {
    patchState({
      sourceFileData: { ...action.data },
    });
  }

  @Action(ToggleWireframe)
  showWireframe(
    { patchState }: StateContext<UiSettings>,
    action: ToggleWireframe
  ) {
    patchState({
      wireframe: action.value,
    });
  }

  @Action(AvailablePages)
  setAvailablePages(
    { patchState }: StateContext<UiSettings>,
    action: AvailablePages
  ) {
    patchState({
      availablePages: [...action.pages],
    });
  }

  @Action(CurrentPage)
  currentPage({ patchState }: StateContext<UiSettings>, action: CurrentPage) {
    patchState({
      currentPage: action.page ? { ...action.page } : null,
    });
  }

  @Action(CurrentLayer)
  currentLayer(
    { getState, patchState }: StateContext<UiSettings>,
    action: CurrentLayer
  ) {
    patchState({
      currentLayer: action.layer ? { ...action.layer } : null,
      previousLayer: { ...getState().currentLayer },
    });
  }

  @Action(SettingsEnabled)
  enableSettings({ patchState }: StateContext<UiSettings>) {
    patchState({
      settingsEnabled: true,
    });
  }

  @Action(LayerPosition)
  layerPosition({ setState }: StateContext<UiSettings>, action: LayerPosition) {
    // reset the top/left position of the current page
    // and the root layer
    setState(
      patch({
        currentPage: patch({
          frame: patch({
            x: action.left,
            y: action.top,
          }),
        }),
      })
    );
  }

  @Action(ZoomReset)
  zoomReset({ patchState }: StateContext<UiSettings>, action: ZoomReset) {
    patchState({
      zoomLevel: DEFAULT_UI_STATE.zoomLevel,
    });
  }

  @Action(ZoomIn)
  zoomIn({ getState, setState }: StateContext<UiSettings>, action: ZoomIn) {
    const zoomLevel = parseFloat(
      (getState().zoomLevel + action.value).toFixed(2)
    );

    setState(
      patch({
        zoomLevel: iif(zoomLevel <= 3, zoomLevel),
      })
    );
  }

  @Action(ZoomOut)
  zoomOut({ getState, setState }: StateContext<UiSettings>, action: ZoomOut) {
    const zoomLevel = parseFloat(
      (getState().zoomLevel - action.value).toFixed(2)
    );

    setState(
      patch({
        zoomLevel: iif(zoomLevel >= 0.1, zoomLevel),
      })
    );
  }

  @Action(Toggle3D)
  toggle3D(
    { patchState, dispatch }: StateContext<UiSettings>,
    action: Toggle3D
  ) {
    if (action.value) {
      dispatch(new ToggleWireframe(true));
    }

    patchState({
      is3dView: action.value,
    });
  }

  @Action(ToggleCodeEditor)
  toggleCodeEditor(
    { patchState, dispatch }: StateContext<UiSettings>,
    action: ToggleCodeEditor
  ) {
    dispatch(new CurrentLayer(null));
    patchState({
      isCodeEditor: action.value,
    });
  }

  @Action(ResetUiSettings)
  resetUiSettings({ patchState }: StateContext<UiSettings>) {
    patchState(DEFAULT_UI_STATE);
  }

  @Action(InformUser)
  informUser({}, action: InformUser) {
    let errorMessage = action.message;
    if ((action.message as any) instanceof Event) {
      errorMessage = (action?.message as any)?.target?.error.message;
    }

    this.snackBar
      .open(
        errorMessage,
        action.errorType === ErrorType.None ? 'CLOSE' : 'REPORT',
        {
          duration: action.errorType === ErrorType.None ? 5000 : 0,
        }
      )
      .onAction()
      .subscribe(() => {
        if (action.errorType !== ErrorType.None) {
          const githubIssueUrl = `template=bug_report.md&title=${errorMessage}`;
          window.open(
            `https://github.com/xlayers/xlayers/issues/new?${githubIssueUrl}`,
            '__blank'
          );
        }
      });
  }
}
