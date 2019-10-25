export const booleanConverter = (value: string): boolean => (value && String(value).toLowerCase() !== 'false');
export default booleanConverter;