import { animation, style, stagger, animate } from '@angular/animations';

export const ballsCombinationSpin = animation([
  style({ opacity: '{{ opacityFrom }}' }),
  stagger(300, [
    animate(
      '{{ animateTime }} ease-in-out',
      style({
        transform: 'rotate({{ rotateAngle }})',
        opacity: '{{ opacityTo }}',
      })
    ),
  ]),
]);
