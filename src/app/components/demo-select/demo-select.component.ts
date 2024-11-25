import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface SelectItem {
  value: any;
  label: string;
}

@Component({
  selector: 'app-demo-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './demo-select.component.html',
})
export class DemoSelectComponent implements OnInit {
  isShowDropdown = false;
  selectedItems: SelectItem[] = [];
  private _placeholder = ''

  @Input({ required: true }) options: SelectItem[] = [];
  @Input() placeholder = 'Choose an option';
  @Input() isMultiple = false;

  @Output() select = new EventEmitter<SelectItem | SelectItem[]>();

  ngOnInit() {
    this._placeholder = this.placeholder
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
      this.select.emit(this.selectedItems);

      this.placeholder =
        this.selectedItems.length > 1
          ? this.selectedItems[0].label + `+${this.selectedItems.length - 1}`
          : (this.selectedItems[0]?.label ?? this._placeholder);
    } else {
      this.placeholder = item.label
      this.selectedItems = [item]
      this.showDropdown(false);
      this.select.emit(item);
    }
  }

  bindItemChecked(item: SelectItem) {
    return this.selectedItems.find(i => i.value === item.value)
  }
}
