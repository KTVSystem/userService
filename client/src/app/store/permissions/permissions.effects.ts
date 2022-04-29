import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, catchError } from 'rxjs/operators';
import * as PermissionsActions from './permissions.actions';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { PermissionService } from '../../services/cabinet/permissions/permission.service';

@Injectable()
export class PermissionsEffects {
  constructor(private actions$: Actions<any>, private permissionService: PermissionService) {}

  getPermissions$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(PermissionsActions.PermissionActionTypes.GET_PERMISSIONS),
      switchMap(() =>
        this.permissionService.getPermissions().pipe(
          map((permissions) => PermissionsActions.getPermissionsSuccess(permissions)),
          catchError((error) => of(PermissionsActions.getPermissionsFailed({ error: error })))
        )
      )
    )
  );

  createPermission$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PermissionsActions.PermissionActionTypes.CREATE_PERMISSIONS),
      switchMap((action) =>
        this.permissionService.createPermission(action.permission).pipe(
          map((response) => {
            if (response.error) {
              return PermissionsActions.createPermissionFailed({apiMessage: response.error, typeMessage: 'error' });
            } else {
              return PermissionsActions.createPermissionSuccess({permission: response.permission,
                apiMessage:  response.status === 'ok' ? action.apiMessage : 'Server Error',
                typeMessage: response.status === 'ok' ? 'success' : 'error'
              });
            }
          }),
        )
      )
    )
  );

  editPermission$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PermissionsActions.PermissionActionTypes.EDIT_PERMISSIONS),
      switchMap((action) =>
        this.permissionService.editPermission(action.permissionId, action.permission).pipe(
          map((response) => {
            if (response.error) {
              return PermissionsActions.editPermissionFailed({ apiMessage: response.error, typeMessage: 'error' });
            } else {
              return PermissionsActions.editPermissionSuccess({permissionId: action.id, permission: response.permission,
                apiMessage:  response.status === 'ok' ? action.apiMessage : 'Server Error',
                typeMessage: response.status === 'ok' ? 'success' : 'error'
              });
            }
          }),
        )
      )
    )
  );

  removePermission$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PermissionsActions.PermissionActionTypes.REMOVE_PERMISSIONS),
      switchMap((action) =>
        this.permissionService.removePermission(action.permissionId).pipe(
          map((response) => PermissionsActions.deletePermissionSuccess({ permissionId: action.permissionId,
            apiMessage:  response.status === 'ok' ? action.apiMessage : 'Server Error',
            typeMessage: response.status === 'ok' ? 'success' : 'error'
          })),
          catchError((error) => of(PermissionsActions.deletePermissionFailed({ error: error })))
        )
      )
    )
  );

}
