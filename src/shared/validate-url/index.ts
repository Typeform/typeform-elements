import { html, TemplateResult } from 'lit';

export const invalidUrlTemplate = (): TemplateResult => html`<p style="color: darkred;">Invalid Typeform URL <br/><small><a href="https://github.com/Typeform/typeform-elements">Typeform Elements</a></small></p>`;
export const validateUrl = (url: string): boolean => /^(https?):\/\/.+\.typeform\.com\/to\/([0-9a-zA-Z]*)([$?].+)?/.test(url);