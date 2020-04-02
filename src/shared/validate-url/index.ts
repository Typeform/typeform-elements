import { html, TemplateResult } from 'lit-element';

export const invalidUrlTemplate = (): TemplateResult => html`<p>Invalid Typeform URL</p>`;
export const validateUrl = (url: string): boolean => /^(https?):\/\/.+\.typeform\.com\/to\/([0-9a-zA-Z]{6,8})([$?].+)?/.test(url);