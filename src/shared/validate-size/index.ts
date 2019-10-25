export const validateSize = (size: string): boolean => /^[+-]?[0-9]+.?([0-9]+)?(%|cm|em|ex|in|mm|pc|pt|px|vh|vw)$/.test(size);
export default validateSize;