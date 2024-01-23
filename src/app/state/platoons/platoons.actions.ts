import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { api } from "../../models/api.model";

export const PlatoonsActions = createActionGroup({
    source: 'Platoons',
    events: {
        LoadRequest: emptyProps(),
        LoadSuccess: props<{ platoons: api.platoons.Platoon[] }>(),
        LoadFailure: emptyProps()
    },
})