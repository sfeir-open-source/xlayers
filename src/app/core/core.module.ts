import bugsnag from '@bugsnag/js';
import {
  BugsnagErrorHandler,
  ScrollingModule,
  CommonModule,
  NgModule,
  FormsModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  DragDropModule,
  ColorSketchModule
} from '@angular/material';

const MatModules = [
  MatSliderModule,
  MatTreeModule,
  MatSnackBarModule,
  MatExpansionModule,
  MatSlideToggleModule,
  MatListModule,
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatInputModule,
  ScrollingModule,
  MatCardModule,
  MatTabsModule,
  MatButtonToggleModule,
  MatMenuModule,
  MatTooltipModule,
  MatSelectModule,
  DragDropModule
];

const ExtraModules = [FormsModule, ColorSketchModule];

const bugsnagClient = bugsnag('74a971bd894eea48c5d692078e969c39');

export function errorHandlerFactory() {
  return new BugsnagErrorHandler(bugsnagClient);
}

@NgModule({
  imports: [...MatModules, ...ExtraModules],
  exports: [CommonModule, ...MatModules, ...ExtraModules],
  providers: [ { provide: ErrorHandler, useFactory: errorHandlerFactory } ]
})
export class CoreModule {}
