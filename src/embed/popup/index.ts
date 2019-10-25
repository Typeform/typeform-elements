import { LitElement, html, property, customElement, TemplateResult, CSSResult } from 'lit-element';
import typeformEmbed from '@typeform/embed';
import booleanConverter from '@shared/boolean-converter';
import css from '@shared/css';
import { invalidUrlTemplate, validateUrl } from '@shared/validate-url';

import style from './style.scss';

type TFPopup = {
  open: () => void;
  close: () => void;
};

const optionalProperties: string[] = ['mode', 'autoOpen', 'autoClose', 'hideScrollbars', 'hideFooter', 'hideHeaders', 'drawerWidth'];

@customElement('typeform-popup')
export class TypeformPopup extends LitElement {
  @property({ type: String }) url: string;
  @property({ type: String }) mode: string;
  @property({ type: Boolean, attribute: 'auto-open', converter: booleanConverter }) autoOpen: boolean;
  @property({ type: Number, attribute: 'auto-close' }) autoClose: number;
  @property({ type: String, attribute: 'custom-style' }) customStyle: string;
  @property({ type: Number, attribute: 'drawer-width' }) drawerWidth: number;
  @property({ type: Boolean, attribute: 'hide-scrollbars', converter: booleanConverter }) hideScrollbars: boolean;
  @property({ type: Boolean, attribute: 'hide-footer', converter: booleanConverter }) hideFooter: boolean;
  @property({ type: Boolean, attribute: 'hide-headers', converter: booleanConverter }) hideHeaders: boolean;
  private _popup: TFPopup;

  connectedCallback(): void {
    setTimeout(() => (this.autoOpen) ? this._openPopup() : null, 1000);
    super.connectedCallback();
  }

  render(): TemplateResult {
    return validateUrl(this.url) ?
      this.customStyle ?
        html`<button @click="${this._openPopup}" style="${this.customStyle}"><slot>Launch Me</slot></button>` :
        html`<button @click="${this._openPopup}" class="typeform-button"><slot>Launch Me</slot></button>` :
      invalidUrlTemplate();
  }

  static get styles(): CSSResult {
    return css(style) as CSSResult;
  }

  private _destroyPopup(): void {
    if (this._popup) this._popup.close();
    this._popup = null;
  }

  private _onSubmit(): void {
    this.dispatchEvent(new Event('submit'));
  }

  private _openPopup(): void {
    this._destroyPopup();
    if (!validateUrl(this.url)) return;
    const options = { autoOpen: true, onSubmit: () => this._onSubmit() };
    optionalProperties.forEach((prop) => (this[prop]) ? options[prop] = this[prop] : null);
    this._popup = typeformEmbed.makePopup(this.url, options);
  }
}