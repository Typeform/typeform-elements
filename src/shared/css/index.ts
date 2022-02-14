import { unsafeCSS, CSSResult } from 'lit';
import style from './style.scss';

export const css = (additionalStyle: string | { [key: string] : any }): CSSResult | string => {
  if (typeof additionalStyle === 'string') {
    return unsafeCSS((style + additionalStyle));
  } else {
    const styleString = (
      Object.entries(additionalStyle).reduce((styleString, [propName, propValue]) => {
        return `${styleString}${propName}:${propValue};`;
      }, '')
    );
    return styleString;
  }
};

export default css;