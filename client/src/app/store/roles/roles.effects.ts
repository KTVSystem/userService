import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, catchError } from 'rxjs/operators';
import * as RolesActions from './roles.actions';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { RolesService } from '../../services/cabinet/roles/roles.service';

@Injectable()
export class RolesEffects {
  constructor(private actions$: Actions<any>, private rolesService: RolesService) {}

  getRoles$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(RolesActions.RoleActionTypes.GET_ROLES),
      switchMap(() =>
        this.rolesService.getRoles().pipe(
          map((permissions) => RolesActions.getRolesSuccess(permissions)),
          catchError((error) => of(RolesActions.getRolesFailed({ error: error })))
        )
      )
    )
  );

  createRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RolesActions.RoleActionTypes.CREATE_ROLES),
      switchMap((action) =>
        this.rolesService.createRole(action.role).pipe(
          map((response) => {
            if (response.error) {
              return RolesActions.createRoleFailed({apiMessage: response.error, typeMessage: 'error' });
            } else {
              return RolesActions.createRoleSuccess({role: response.role,
                apiMessage:  response.status === 'ok' ? action.apiMessage : 'Server Error',
                typeMessage: response.status === 'ok' ? 'success' : 'error'
              });
            }
          }),
        )
      )
    )
  );

  editRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RolesActions.RoleActionTypes.EDIT_ROLES),
      switchMap((action) =>
        this.rolesService.editRole(action.roleId, action.role).pipe(
          map((response) => {
            if (response.error) {
              return RolesActions.editRoleFailed({ apiMessage: response.error, typeMessage: 'error' });
            } else {
              return RolesActions.editRoleSuccess({roleId: action.id, role: response.role,
                apiMessage:  response.status === 'ok' ? action.apiMessage : 'Server Error',
                typeMessage: response.status === 'ok' ? 'success' : 'error'
              });
            }
          }),
        )
      )
    )
  );

  removeRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RolesActions.RoleActionTypes.REMOVE_ROLES),
      switchMap((action) =>
        this.rolesService.removeRole(action.roleId).pipe(
          map((response) => RolesActions.removeRoleSuccess({ roleId: action.roleId,
            apiMessage:  response.status === 'ok' ? action.apiMessage : 'Server Error',
            typeMessage: response.status === 'ok' ? 'success' : 'error'
          })),
          catchError((error) => of(RolesActions.removeRoleFailed({ error: error })))
        )
      )
    )
  );

}
