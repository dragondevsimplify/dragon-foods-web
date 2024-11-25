import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
})
export class DemoRadioComponent implements OnInit {
  group = ''

  @Input() orientation: Orientation = 'vertial'
  @Input({ required: true }) options: SelectItem[] = []

  ngOnInit() {
    this.group = uuidv4()
  }
}
