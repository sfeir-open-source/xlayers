import { BinaryPropertyListParserService } from './bplist-parser.service';
import { SketchStyleParserService } from './sketch-style-parser.service';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [BinaryPropertyListParserService],
  exports: [SketchStyleParserService]
})
export class ParserModule {}
