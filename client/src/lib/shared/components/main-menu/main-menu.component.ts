import { Component, Input, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { dropLast, takeLast } from 'ramda';
import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
})

export class MainMenuComponent implements AfterViewInit {
    @Input() profile: any;
    @ViewChild('container') public container: ElementRef;
    // @ViewChild('nav') public nav: ElementRef;

    public navItems = [
        { title: ngxExtract('GENERAL.MENU.REPORTS'), link: ['/reports'] },
        { title: ngxExtract('GENERAL.MENU.RECYCLINGPROCESSES'), link: ['/recycling-processes'] },
        { title: ngxExtract('GENERAL.MENU.RECYCLINGPARTNERS'), link: ['/recycling-partners'] },
        { title: ngxExtract('GENERAL.MENU.PROXIES'), link: ['/proxies'] },
        { title: ngxExtract('GENERAL.MENU.AUDITTRIAL'), link: ['/audit-trail'] },
    ];
    public filteredNavItems = [...this.navItems];
    public extra = [];

    public ngAfterViewInit() {
        console.log('ngAfterViewInit');

        setTimeout(() => {
            this.addItem();
        }, 100);

    }

    @HostListener('window:resize', ['$event'])
    public onResize(event) {

        this.addItem();
        // console.log(containerWidth);
        // console.log(navWidth);
        // console.log(this.container.nativeElement.scrollWidth);
        // // console.log(event.target.innerWidth);
    }

    public addItem() {
        if (!this.container) {
            return;
        }

        const containerWidth = this.container.nativeElement.offsetWidth;
        const scrollContainerWidth = this.container.nativeElement.scrollWidth;

        console.log(scrollContainerWidth > containerWidth);
        if (scrollContainerWidth > containerWidth) {
            this.filteredNavItems = dropLast(1, this.filteredNavItems);
            this.extra = takeLast(this.navItems.length - this.filteredNavItems.length, this.navItems);

            setTimeout(() => {
                this.addItem();
            });
        }
    }
}
