import { trigger, state, transition, animate, style, keyframes } from '@angular/animations';

export let fade = trigger('fade', [
    transition('void=>*', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 }))
    ])
])

export let slide = trigger('slide', [
    transition(':enter', [
        style({ transform: 'translateY(-15px)' }),
        animate(400)
    ])
])

export let slideLeft=trigger('slideLeft', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate(500)
    ])
])


