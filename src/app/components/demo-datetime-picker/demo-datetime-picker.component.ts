import { Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
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
export class DemoDatetimePickerComponent implements OnInit, ControlValueAccessor {
  value?: Date

  onChange: (v: Date) => void = () => {};
  onTouched: () => void = () => {};

  ngOnInit() {

  }

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
    console.log(target.value)
    // this.onChange(target.value)
  }
}
