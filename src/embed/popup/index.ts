import { LitElement, html, TemplateResult, CSSResult } from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {createPopup, Popup} from '@typeform/embed';
import { exposedOptions } from '@shared/exposed-options';
import { extractForm } from '@shared/extract-form';
import css from '@shared/css';
import { invalidUrlTemplate, validateUrl } from '@shared/validate-url';

import popupStyle from '@typeform/embed/build/css/popup.css';
import style from './style.scss';

@customElement('typeform-popup')
export class TypeformPopup extends LitElement {
  // Form details
  @property({ type: String }) url: string;
  @property({ type: String }) formId: string;
  // Custom properties
  @property({ type: String }) customStyle: string;
  // Exposed options
  @property({ type: Number }) autoClose: number;
  @property({ type: String }) buttonText: string;
  @property({ type: Boolean }) chat: boolean = false;
  @property({ type: Boolean }) hideFooter: boolean = false;
  @property({ type: Boolean }) hideHeaders: boolean = false;
  @property({ type: Number }) opacity: number;
  // Popup Element
  private _popup: Popup;

  connectedCallback() {
    super.connectedCallback()
    let headStyle = document.head.querySelector('style#typeform-popup-style');
    if (!headStyle) {
      headStyle = document.createElement('style');
      headStyle.id = 'typeform-popup-style';
      document.head.append(headStyle);
    }
    headStyle.innerHTML = popupStyle;
  }

  render(): TemplateResult {
    return this.url && validateUrl(this.url) || true ?
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
    if (this.url && !validateUrl(this.url)) return;
    const formId = this.formId ?? extractForm(this.url);
    const options = { onSubmit: () => this._onSubmit() };
    exposedOptions.forEach((prop) => options[prop] = this[prop]);
    this._popup = createPopup(formId, options);
    this._popup.open();
  }
}