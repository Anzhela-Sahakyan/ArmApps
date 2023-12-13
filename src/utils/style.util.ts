export const combineClasses = (...classNames: Array<string | undefined>) =>
  classNames.filter((className) => className).join(" ");
