import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';

import {HighlightService} from './highlight.service';


@Component({
  selector: '[lang]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <pre><code class="language-{{ lang }}" [innerHTML]="code"></code></pre>
  `
})
export class CodeComponent implements OnChanges {
  @Input() lang: string;
  @Input() code: string;

  constructor(private _service: HighlightService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.code = this._service.highlight(changes.code.currentValue, changes.lang.currentValue);
    }
  }

}
