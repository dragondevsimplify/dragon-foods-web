import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-demo-datetime-picker',
  standalone: true,
  imports: [],
  templateUrl: './demo-datetime-picker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DemoDatetimePickerComponent),
      multi: true,
    },
  ],
})
export class DemoDatetimePickerComponent implements ControlValueAccessor {
  value?: Date

  onChange: (v: Date) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(v: Date): void {
    this.value = v;
  }

  registerOnChange(fn: (v: Date) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  selectDateTime(e: Event) {
    const target = e.target as HTMLInputElement
    if (target.value) {
      this.onChange(new Date(target.value))
    }
  }
}
