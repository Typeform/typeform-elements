const formMatchRegex = /^(https?:\/\/)?.+\.typeform\.com\/to\/([0-9a-zA-Z]*)([$?].+)?/;

export const extractForm = (url: string): string => url.match(formMatchRegex)[2];