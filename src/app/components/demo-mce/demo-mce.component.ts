import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-demo-mce',
  standalone: true,
  imports: [],
  templateUrl: './demo-mce.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DemoMceComponent),
      multi: true,
    }
  ]
})
export class DemoMceComponent implements ControlValueAccessor {
  value = ''

  onChange: (v: string) => void = () => {}
  onTouched: () => void = () => {}

  writeValue(v: string): void {
    this.value = v
  }

  registerOnChange(fn: (v: string) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  changeContent(e: Event) {
    const target = e.target as HTMLTextAreaElement
    if (!target) {
      return
    }

    this.onChange(target.value)
  }
}
