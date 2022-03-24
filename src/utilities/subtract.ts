export function subtract(b: number, c: number) {
  let b1 = b.toString().split('.');
  let b1_max = 0;
  if (b1.length == 2) {
    b1_max = b1[1].length;
  }

  let c1 = c.toString().split('.');
  let c1_max = 0;
  if (c1.length == 2) {
    c1_max = c1[1].length;
  }

  let max_len = b1_max > c1_max ? b1_max : c1_max;

  return Number((b - c).toFixed(max_len));
}
