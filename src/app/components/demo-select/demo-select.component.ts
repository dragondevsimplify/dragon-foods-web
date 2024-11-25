import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface SelectItem {
  value: any;
  label: string;
}

@Component({
  selector: 'app-demo-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './demo-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DemoSelectComponent),
      multi: true,
    }
  ]
})
export class DemoSelectComponent implements OnInit, ControlValueAccessor {
  isShowDropdown = false;
  selectedItems: SelectItem[] = [];
  private _placeholder = ''

  onChange: (v: SelectItem | SelectItem[]) => void = () => {}
  onTouched: () => void = () => {}

  @Input({ required: true }) options: SelectItem[] = [];
  @Input() placeholder = 'Select';
  @Input() isMultiple = false;

  ngOnInit() {
    this._placeholder = this.placeholder
  }

  writeValue(v: SelectItem[]): void {
    this.selectedItems = v
  }

  registerOnChange(fn: (v: SelectItem | SelectItem[]) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  showDropdown(isShow: boolean) {
    this.isShowDropdown = isShow;
  }

  toggleDropdown() {
    this.isShowDropdown = !this.isShowDropdown
  }

  selectItem(e: Event, item: SelectItem) {
    const target = e.target as HTMLInputElement;

    this.selectedItems = target.checked
      ? [...this.selectedItems, item]
      : this.selectedItems.filter((i) => i.value !== item.value);

    if (this.isMultiple) {
      this.onChange(this.selectedItems)

      this.placeholder =
        this.selectedItems.length > 1
          ? this.selectedItems[0].label + `+${this.selectedItems.length - 1}`
          : (this.selectedItems[0]?.label ?? this._placeholder);
    } else {
      this.placeholder = item.label
      this.selectedItems = [item]
      this.showDropdown(false);
      this.onChange(item)
    }
  }

  bindItemChecked(item: SelectItem) {
    return this.selectedItems.find(i => i.value === item.value)
  }
}
