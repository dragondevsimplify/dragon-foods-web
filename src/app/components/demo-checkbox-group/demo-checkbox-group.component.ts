import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

interface SelectItem {
  value: any;
  label: string;
}

type Orientation = 'vertial' | 'horizontal';

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

  onChange: (v: SelectItem[]) => void = () => {};
  onTouched: () => void = () => {};

  @Input() orientation: Orientation = 'vertial';
  @Input({ required: true }) options: SelectItem[] = [];

  ngOnInit() {
    this.group = uuidv4();
  }

  writeValue(v: SelectItem[]): void {
    this.selectedItems = v;
  }

  registerOnChange(fn: (v: SelectItem[]) => void): void {
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

    this.onChange(this.selectedItems);
  }

  bindItemChecked(item: SelectItem) {
    return this.selectedItems.find((i) => i.value === item.value);
  }
}
