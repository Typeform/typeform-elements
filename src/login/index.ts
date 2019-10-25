import { LitElement, html, property, customElement, TemplateResult, CSSResult } from 'lit-element';

import css from '@shared/css';

import style from './style.scss';

@customElement('typeform-login')
export class TypeformLogin extends LitElement {
  @property({ type: String, attribute: 'client-id' }) clientId: string = '';
  @property({ type: String, attribute: 'redirect-uri' }) redirectURI: string = '';
  @property({ type: String }) scope: string = '';
  @property({ type: String }) state: string;

  render(): TemplateResult {
    const scopes = this.scope.replace(/\s/g, '').split(',').join('+');
    const state = this.state ? ('&' + this.state) : '';
    return html`
      <a
        href="https://api.typeform.com/oauth/authorize?client_id=${this.clientId}&scope=${scopes}&redirect_uri=${this.redirectURI}${state}"
        target="_blank"
        >
        Log in to Typeform
      </a>
    `;
  }

  static get styles(): CSSResult {
    return css(style) as CSSResult;
  }
}