import { Utils } from "./utils";

//#region model
export namespace Graph {
    export interface Kind {
        id: string;
        name: string;
        isLink?: boolean;
    }

    export interface Relation {
        id: string;
        type: RelationType;
        parent: string;
        child: string;
    }

    export interface KindDetail extends Kind, Utils.Bound {}
    export interface RelationDetail extends Relation {
        parentDetail: KindDetail | undefined;
        childDetail: KindDetail | undefined;
    }

    export interface YModel {
        Kinds: Kind[];
        Relations: Relation[];
    }

    export interface YModelDetail {
        Kinds: KindDetail[];
        Relations: RelationDetail[];
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

    export function buildDetail(m: YModel): YModelDetail {
        let defaultBound: Utils.Bound = { x: 0, y: 0, width: 0, height: 0 };
        let Kinds: KindDetail[] = m.Kinds.map(k =>
            Object.assign(k, defaultBound)
        );
        let find = (kindId: string) => Kinds.find(k => k.id == kindId);
        let Relations: RelationDetail[] = m.Relations.map(r =>
            Object.assign(r, {
                parentDetail: find(r.parent),
                childDetail: find(r.child),
            })
        );
        return { Kinds, Relations };
    }
}
