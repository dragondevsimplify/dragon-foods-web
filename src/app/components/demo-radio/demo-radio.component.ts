import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

interface SelectItem {
  value: any;
  label: string;
}

type Orientation = 'vertial' | 'horizontal'

@Component({
  selector: 'app-demo-radio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './demo-radio.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DemoRadioComponent),
      multi: true,
    }
  ]
})
export class DemoRadioComponent implements OnInit, ControlValueAccessor {
  value = ''
  group = ''

  onChange: (v: string) => void = () => {}
  onTouched: () => void = () => {}

  @Input() orientation: Orientation = 'vertial'
  @Input({ required: true }) options: SelectItem[] = []

  ngOnInit() {
    this.group = uuidv4()
  }

  writeValue(v: string): void {
    this.value = v
  }

  registerOnChange(fn: (v: string) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  selectItem(item: SelectItem) {
    this.onChange(item.value)
  }
}
