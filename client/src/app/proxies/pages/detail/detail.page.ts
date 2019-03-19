import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';

import { ProxiesActions, ProxiesSelectors } from '../../store';
import { Proxy } from '../../store/types';

@Component({
  templateUrl: './detail.page.html',
})

export class DetailPageComponent implements OnInit {
  @select(ProxiesSelectors.list.result) public $proxies: Observable<Proxy[]>;

  public proxies: Proxy[];

  constructor(
    private proxiesActions: ProxiesActions,
  ) { }

  ngOnInit() {
    this.proxiesActions.fetchAll().toPromise();

    this.$proxies.subscribe((proxies) => {
      this.proxies = proxies;
    });
  }

  public revokeProxy() {
    console.log('revokeProxy');
  }
}
