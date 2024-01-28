function add(a: number, b: number) {
  return a + b;
}

export default {
  ex1: 5,
  ex2: "6",
  ex3: add(5, "6"),
  ex4: add(5, parseInt("6"))
};
