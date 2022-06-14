import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {Meta} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})

export class CanonicalService {

  constructor(@Inject(DOCUMENT) private dom) { }

  setCanonicalURL(url?: string) {
    const canURL = url == undefined ? this.dom.URL : url;
    const link: HTMLLinkElement = this.dom.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.dom.head.appendChild(link);
    link.setAttribute('href', canURL);
  }
  setOgUrl(content: string, url?: string){
    const ogUrl = url == undefined? this.dom.URL : url;
    const meta: HTMLLinkElement = this.dom.createElement('meta');
    meta.setAttribute('property', content);
    this.dom.head.appendChild(meta);
    meta.setAttribute('content', ogUrl);
  }

}
