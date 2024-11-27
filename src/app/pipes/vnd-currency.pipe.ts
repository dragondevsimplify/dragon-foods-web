import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vndCurrency',
  standalone: true
})
export class VndCurrencyPipe implements PipeTransform {
  transform(value: number): string {
    const formattedValue = value.toLocaleString('en-US')
    return `${formattedValue} VNĐ`;
  }
}
