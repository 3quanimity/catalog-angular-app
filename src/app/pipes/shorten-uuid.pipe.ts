import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'shortenUuid' })
export class ShortenUuidPipe implements PipeTransform {
  transform(value: string): string {
    return '#' + value.substring(0, 6);
  }
}
