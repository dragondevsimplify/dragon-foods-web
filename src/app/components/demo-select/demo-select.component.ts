import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { WatchPropertyChange } from 'app/decorators/property.decorator';

interface SelectItem {
  value: string | number;
  label: string;
}

type OnChangeType = string | number | (string | number)[]

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
export class DemoSelectComponent implements OnInit, OnChanges, ControlValueAccessor {
  isShowDropdown = false;

  selectedItems: SelectItem[] = [];

  private _placeholder = ''
  private _defaultSelectedItem?: SelectItem
  private _defaulValue?: string | number

  onChange: (v: OnChangeType) => void = () => {}
  onTouched: () => void = () => {}

  @Input({ required: true }) options: SelectItem[] = [];
  @Input() placeholder = 'Select';
  @Input() isMultiple = false;

  ngOnInit() {
    this._placeholder = this.placeholder
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options'] && this._defaulValue) {
      const itemFound = this.options.find(i => i.value === this._defaulValue)
      this.selectedItems = itemFound ? [itemFound] : []
      this.bindPlaceholder()
    }
  }

  writeValue(v: string | number): void {
    if (v) {
      this._defaulValue = v
      this._defaultSelectedItem = this.options.find(i => i.value === v)
      this.selectedItems = this._defaultSelectedItem ? [this._defaultSelectedItem] : []
      this.bindPlaceholder()
    }
  }

  registerOnChange(fn: (v: OnChangeType) => void): void {
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

  bindPlaceholder() {
    this.placeholder =
        this.selectedItems.length > 1
          ? this.selectedItems[0].label + `+${this.selectedItems.length - 1}`
          : (this.selectedItems[0]?.label ?? this._placeholder);
  }

  selectItem(e: Event, item: SelectItem) {
    const target = e.target as HTMLInputElement;

    this.selectedItems = target.checked
      ? [...this.selectedItems, item]
      : this.selectedItems.filter((i) => i.value !== item.value);

    if (this.isMultiple) {
      this.onChange(this.selectedItems.map(i => i.value))

      this.bindPlaceholder()
    } else {
      this.placeholder = item.label
      this.selectedItems = [item]
      this.showDropdown(false);
      this.onChange(item.value)
    }
  }

  bindItemChecked(item: SelectItem) {
    if (Array.isArray(this.selectedItems)) {
      return this.selectedItems.find(i => i.value === item.value)
    }
    return null
  }
}
