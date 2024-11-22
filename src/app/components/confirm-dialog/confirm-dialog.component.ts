import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {
  @Input() title = 'Confirm dialog'
  @Input({ required: true }) isShow = false
  @Input() rejectButtonText = 'Cancel'
  @Input() resolveButtonText = 'OK'

  @Output() isShowChange = new EventEmitter<boolean>()
  @Output() reject = new EventEmitter<void>()
  @Output() resolve = new EventEmitter<void>()

  onReject() {
    this.isShow = false
    this.reject.emit()
  }

  onResolve() {
    this.resolve.emit()
  }
}
