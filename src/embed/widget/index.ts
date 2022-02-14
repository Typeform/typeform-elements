import { LitElement, html, TemplateResult, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createWidget } from '@typeform/embed';
import { exposedOptions } from '@shared/exposed-options';
import { extractForm } from '@shared/extract-form';
import validateSize from '@shared/validate-size';
import { invalidUrlTemplate, validateUrl } from '@shared/validate-url';

import widgetStyle from '@typeform/embed/build/css/widget.css';

const height = '500px';
const width = '100%';

@customElement('typeform-widget')
export class TypeformWidget extends LitElement {
  // Form details
  @property({ type: String }) url: string;
  @property({ type: String }) formId: string;
  // Custom properties
  @property({ type: String }) height = height;
  @property({ type: String }) width = width;
  // Exposed options
  @property({ type: Number }) autoClose: number;
  @property({ type: String }) buttonText: string;
  @property({ type: Boolean }) chat: boolean = false;
  @property({ type: Boolean }) hideFooter: boolean = false;
  @property({ type: Boolean }) hideHeaders: boolean = false;
  @property({ type: Number }) opacity: number;

  createRenderRoot(): Element {
    return this;
  }
  
  connectedCallback() {
    super.connectedCallback()
    let headStyle = document.head.querySelector('style#typeform-widget-style');
    if (!headStyle) {
      headStyle = document.createElement('style');
      headStyle.id = 'typeform-widget-style';
      document.head.append(headStyle);
    }
    headStyle.innerHTML = widgetStyle;
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

  updated(changedProperties: PropertyValues<any>): void {
    const keys = [...exposedOptions, 'url'];
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
    if (this.url && !validateUrl(this.url)) return;
    const formId = this.formId ?? extractForm(this.url);
    const div = this.querySelector('div');
    div.childNodes.forEach(c => div.removeChild(c));
    const options = { onSubmit: () => this._onSubmit(), container: div };
    exposedOptions.forEach((prop) => options[prop] = this[prop]);
    createWidget(formId, options);
  }
}