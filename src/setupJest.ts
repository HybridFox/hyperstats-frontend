import 'jest-preset-angular';

Object.defineProperty(window, 'getComputedStyle', {
  value: () => ['-webkit-appearance'],
});

// Error.stackTraceLimit = 1;

// Applications insights
declare var global: any;
Object.defineProperty(global, 'define', {
  value: () => {},
});
