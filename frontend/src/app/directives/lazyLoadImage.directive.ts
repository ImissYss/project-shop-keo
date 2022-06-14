import { Directive, ElementRef, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appLazyLoadImage]'
})
export class LazyLoadImageDirective implements OnInit {
  @Input() srcLazy: string;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  ngOnInit() {
    // only run lazy image loading in the browser
    if (isPlatformBrowser(this.platformId)) {
      // if browser supports IntersectionObserver
      if ('IntersectionObserver' in window) {
        const lazyImageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.setAttribute('src', this.srcLazy);
              entry.target.classList.add('lazy-loaded');
              lazyImageObserver.unobserve(entry.target);
            }
          });
        });
        lazyImageObserver.observe(this.el.nativeElement);
      } else {
        // Otherwise replace image by default
        this.el.nativeElement.setAttribute('src', this.srcLazy);
      }
    }
  }

}
