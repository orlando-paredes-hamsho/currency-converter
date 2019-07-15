const parseStringFloat = (string) => {
  const from_float = parseFloat(string);
  return  isNaN(from_float) ? 0 : from_float;
};

export default parseStringFloat;
