import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { normalize, Schema } from 'normalizr';
import { get } from 'lodash-es';

import * as schemas from '@core/schemas';
import { ACTIONS } from './entities.action-types';

@Injectable()
export class EntitiesActions {
  public static schema = schemas;

  constructor(
    private ngRedux: NgRedux<any>,
  ) {}

  public normalize(data: any, entitySchema: Schema, overwrite = true) {
    const normalizedData = normalize(data, entitySchema);

    Object.keys(normalizedData.entities).forEach((entityName) => {
      if (overwrite) {
        this.ngRedux.dispatch({
          type: ACTIONS.NORMALIZE_OVERWRITE,
          payload: {
            name: entityName,
            entities: get(normalizedData.entities, entityName),
          },
        });
      } else {
        this.ngRedux.dispatch({
          type: ACTIONS.NORMALIZE_MERGE,
          payload: {
            name: entityName,
            entities: get(normalizedData.entities, entityName),
          },
        });
      }
    });

    return normalizedData.result;
  }

  public patch(entity: string, id: string, patchData: any): void {
    this.ngRedux.dispatch({
      type: ACTIONS.PATCH,
      payload: {
        entity,
        id,
        patchData,
      },
    });
  }

  public remove(entity: string, id: string): void {
    this.ngRedux.dispatch({
      type: ACTIONS.REMOVE,
      payload: {
        entity,
        id,
      },
    });
  }
}
