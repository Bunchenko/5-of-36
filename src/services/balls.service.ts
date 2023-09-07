import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BallsService {
  constructor() {}

  public randomizeBalls(length: number): number[] {
    const allNumbers: number[] = Array.from({ length: 36 }, (_, i) => i + 1);
    const result: number[] = [];

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allNumbers.length);
      result.push(allNumbers[randomIndex]);
      allNumbers.splice(randomIndex, 1);
    }

    return result;
  }

  public countMatchAmount() {}
}
