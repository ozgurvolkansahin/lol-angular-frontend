import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'cosmic';

  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService,
              private router: Router) {
  }

  ngOnInit() {
    // this.currentTheme = this.themeService.currentTheme;
    this.changeTheme('cosmic');
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  navigateHome() {
    // this.menuService.navigateHome();
    this.router.navigate(['pages/live-tracking']);
    return false;
  }


  navigateFree() {
    // this.menuService.navigateHome();
    this.router.navigate(['pages/free-champs']);
    return false;
  }


  navigateMultipleSearch() {
    // this.menuService.navigateHome();
    this.router.navigate(['pages/multiple-search']);
    return false;
  }

  onTabChanged(e) {
      if (e.tabTitle === 'Free Champions') {
        this.router.navigate(['pages/free-champs']);
  
      } else if (e.tabTitle === 'Track') {
        this.router.navigate(['pages/live-tracking']);
  
      } else if (e.tabTitle === 'Summoner Details') {
        this.router.navigate(['pages/summoner-detail']);
  
      }
    // this.router.navigate(['pages/live-tracking']);
  }
}
