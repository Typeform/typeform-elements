import { html, TemplateResult } from 'lit-element';

export const invalidUrlTemplate = (): TemplateResult => html`<p>Invalid Typeform URL</p>`;
export const validateUrl = (url: string): boolean => /^(http|https):\/\/.+.typeform.com\/to\/(\w){6}($|\?.*$)/.test(url);