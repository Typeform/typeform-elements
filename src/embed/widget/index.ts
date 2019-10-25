import { LitElement, html, property, customElement, TemplateResult } from 'lit-element';
import typeformEmbed from '@typeform/embed';

import booleanConverter from '@shared/boolean-converter';
import validateSize from '@shared/validate-size';
import { invalidUrlTemplate, validateUrl } from '@shared/validate-url';

const height = '500px';
const width = '100%';
const optionalProperties: string[] = ['opacity', 'buttonText', 'hideScrollbars', 'hideFooter', 'hideHeaders'];

@customElement('typeform-widget')
export class TypeformWidget extends LitElement {
  @property({ type: String }) url: string;
  @property({ type: String }) height: string;
  @property({ type: String }) width: string;
  @property({ type: Number }) opacity: number;
  @property({ type: String, attribute: 'button-text' }) buttonText: string;
  @property({ type: Boolean, attribute: 'hide-scrollbars', converter: booleanConverter }) hideScrollbars: boolean = false;
  @property({ type: Boolean, attribute: 'hide-footer', converter: booleanConverter }) hideFooter: boolean = false;
  @property({ type: Boolean, attribute: 'hide-headers', converter: booleanConverter }) hideHeaders: boolean = false;

  createRenderRoot(): Element {
    return this;
  }

  render(): TemplateResult {
    return (validateUrl(this.url)) ?
      html`
        <div style="
          height: ${validateSize(this.height) ? this.height : height};
          width: ${validateSize(this.width) ? this.width : width};
        ">
        </div>
      ` :
      invalidUrlTemplate();
  }

  updated(changedProperties: Map<string, string>): void {
    const keys = [...optionalProperties, 'url'];
    for (let key of keys) {
      if (changedProperties.has(key) && changedProperties.get(key) !== this[key]) {
        return this._renderForm();
      }
    }
  }

  private _onSubmit(): void {
    this.dispatchEvent(new Event('submit'));
  }

  private _renderForm(): void {
    if (!validateUrl(this.url)) return;
    const div = this.querySelector('div');
    div.innerHTML = '';
    const options = { onSubmit: () => this._onSubmit() };
    optionalProperties.forEach((prop) => (this[prop]) ? options[prop] = this[prop] : null);
    typeformEmbed.makeWidget(div, this.url, options);
  }
}