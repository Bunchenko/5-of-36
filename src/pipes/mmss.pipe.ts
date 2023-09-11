import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mmss',
})
export class MmssPipe implements PipeTransform {
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    const seconds: number = value - minutes * 60;

    return (
      this._strPadLeft(minutes, '0', 2) +
      ':' +
      this._strPadLeft(seconds, '0', 2)
    );
  }

  /**
   * The main purpose of this function is to ensure numbers always have a specific number of digits.
   * @param string
   * @param pad
   * @param length
   * @returns A number in a format with specified digit amount
   */
  private _strPadLeft(string: number, pad: string, length: number): string {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  }
}
