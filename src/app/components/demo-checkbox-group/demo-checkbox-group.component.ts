import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

interface SelectItem {
  value: any;
  label: string;
}

type Orientation = 'vertial' | 'horizontal';
type OnChangeType = (string | number)[]

@Component({
  selector: 'app-demo-checkbox-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './demo-checkbox-group.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DemoCheckboxGroupComponent),
      multi: true,
    },
  ],
})
export class DemoCheckboxGroupComponent
  implements OnInit, ControlValueAccessor
{
  selectedItems: SelectItem[] = [];
  group = '';

  onChange: (v: OnChangeType) => void = () => {};
  onTouched: () => void = () => {};

  @Input() orientation: Orientation = 'vertial';
  @Input({ required: true }) options: SelectItem[] = [];

  ngOnInit() {
    this.group = uuidv4();
  }

  writeValue(v: (string | number)[]): void {
    if (v.length) {
      this.selectedItems = this.options.filter(i => v.includes(i.value));
    }
  }

  registerOnChange(fn: (v: OnChangeType) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  selectItem(e: Event, item: SelectItem) {
    const target = e.target as HTMLInputElement;

    this.selectedItems = target.checked
      ? [...this.selectedItems, item]
      : this.selectedItems.filter((i) => i.value !== item.value);

    this.onChange(this.selectedItems.map(i => i.value));
  }

  bindItemChecked(item: SelectItem) {
    return this.selectedItems.find((i) => i.value === item.value);
  }
}
