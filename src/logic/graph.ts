import { Utils } from "./utils";
import * as d3 from "d3";

//#region model
export namespace Graph {
    export interface Kind extends d3.SimulationNodeDatum, Utils.Bound {
        id: string;
        name: string;
        isLink?: boolean;
    }

    export interface Relation extends d3.SimulationLinkDatum<Kind> {
        id: string;
        type: RelationType;
    }

    export interface YModel {
        Kinds: Kind[];
        Relations: Relation[];
    }

    export enum RelationType {
        /*1-N*/
        Normal = 0,
        /*0-N*/
        Reference = 1,
        /*1-1*/
        UniqueOptional = 2,
        /*0-1*/
        Unique = 3,
        /*Inheritance*/
        Extension = 4,
    }

    /**
     * fill model with details
     * - initialize the bound (position and size) of each Kind (with 0)
     * - convert realtion source, target from id string to real Kind object
     */
    export function buildDetail(m: YModel): YModel {
        let find = (id: string) => m.Kinds.find(k => k.id == id);

        m.Kinds.forEach(k => {
            k.x = 0;
            k.y = 0;
            k.width = 0;
            k.height = 0;
        });

        m.Relations.forEach(r => {
            if (typeof r.source == "string")
                r.source = find(r.source as string) || r.source;
            if (typeof r.target == "string")
                r.target = find(r.target as string) || r.target;
        });
        return m;
    }
}
