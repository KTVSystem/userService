import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../store/core.state';
import * as fromUser from '../store/users/users.actions';
import * as fromPermission from '../store/permissions/permissions.actions';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.store.dispatch(new fromUser.LoadUsers());
    this.store.dispatch(new fromPermission.LoadPermission());
  }

}
