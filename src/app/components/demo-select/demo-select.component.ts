import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

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
export class DemoSelectComponent {
  @Input({ required: true }) options: SelectItem[] = []
  @Input() placeholder = 'Choose an option'
}
