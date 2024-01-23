import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { api } from "../../models/api.model";

export const RolesActions = createActionGroup({
    source: 'Roles',
    events: {
        LoadRequest: emptyProps(),
        LoadSuccess: props<{ roles: api.roles.Role[] }>(),
        LoadFailure: emptyProps()
    },
})