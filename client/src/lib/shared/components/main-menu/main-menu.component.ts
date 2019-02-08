import { Component, Input, HostListener, ViewChild, ElementRef, AfterViewInit, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { dropLast, takeLast, take, drop } from 'ramda';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
})

export class MainMenuComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
    @Input() profile: any;
    @ViewChild('container') public container: ElementRef;
    @ViewChild('nav') public nav: ElementRef;

    public navItems = [];
    public filteredNavItems: any[] = [];
    public extra: any[] = [];
    public componentDestroyed$: Subject<Boolean> = new Subject<boolean>();
    public containerWidth: Subject<number> = new Subject<number>();
    public navWidth: Subject<number> = new Subject<number>();

    public ngOnInit() {
        this.containerWidth
            .pipe(
                debounceTime(100),
                takeUntil(this.componentDestroyed$),
            )
            .subscribe((containerWidth) => {
                const navWidth = this.nav.nativeElement.offsetWidth;

                if (navWidth > containerWidth) {
                    this.removeItem();
                } else if (this.extra.length > 0) {
                   this.addItem();
                }
            });
    }

    public ngOnChanges() {
        if (this.profile && this.profile.isAdmin) {
            this.navItems = [
                { title: ngxExtract('GENERAL.MENU.USERS'), link: ['/admin/users'] },
                { title: ngxExtract('GENERAL.MENU.COMPANIES'), link: ['/admin/companies'] },
            ];
        } else {
            this.navItems = [
                { title: ngxExtract('GENERAL.MENU.REPORTS'), link: ['/app/reports'] },
                { title: ngxExtract('GENERAL.MENU.RECYCLINGPROCESSES'), link: ['/app/recycling-processes'] },
                { title: ngxExtract('GENERAL.MENU.RECYCLINGPARTNERS'), link: ['/app/recycling-partners'] },
                { title: ngxExtract('GENERAL.MENU.PROXIES'), link: ['/app/proxies'] },
                { title: ngxExtract('GENERAL.MENU.AUDITTRIAL'), link: ['/app/audit-trail'] },
            ];
        }

        this.filteredNavItems = [...this.navItems];

        setTimeout(() => {
            this.setWidth();
        }, 50);
    }

    public ngAfterViewInit() {

    }

    public ngOnDestroy() {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }

    @HostListener('window:resize', ['$event'])
    public onResize(event) {
        this.setWidth();
    }

    public setWidth() {
        if (this.container && this.nav) {
            this.containerWidth.next(this.container.nativeElement.offsetWidth);
            this.navWidth.next(this.nav.nativeElement.offsetWidth);
        }
    }

    private removeItem() {
        this.filteredNavItems = dropLast(1, this.filteredNavItems);
        this.extra = takeLast(this.navItems.length - this.filteredNavItems.length, this.navItems);

        setTimeout(() => {
            const containerWidth = this.container.nativeElement.offsetWidth;
            const navWidth = this.nav.nativeElement.offsetWidth;

            if (navWidth > containerWidth) {
                this.removeItem();
            }
        }, 1);
    }

    private addItem() {
        this.filteredNavItems = [...this.filteredNavItems, ...take(1, this.extra)];
        this.extra = drop(1, this.extra);

        setTimeout(() => {
            const containerWidth = this.container.nativeElement.offsetWidth;
            const navWidth = this.nav.nativeElement.offsetWidth;

            if (this.extra.length > 0 && navWidth < containerWidth) {
                this.addItem();
            } else if (navWidth > containerWidth) {
                this.removeItem();
            }
        }, 1);
    }
}
