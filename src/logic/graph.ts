//#region model
export namespace model {
    export interface Kind {
        id: string;
        name: string;
        isLink: boolean;
    }

    export interface Relation {
        id: string;
        type: RelationType;
        parent: string;
        child: string;
    }

    export interface YModel {
        Kinds: Kind[];
        Relations: Relation[]
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

    export interface Dimension {
        width: number;
        height: number;
    }

}
//#endregion

const OneChar: model.Dimension = { width: 20, height: 36 };
const Padding: model.Dimension = { width: 30, height: 30 };

function estimateSize(textLength: number): model.Dimension {
    return { width: OneChar.width * textLength, height: OneChar.height };
}

import dagre from "dagre";


export function BuildDagreGraph(src: model.YModel): dagre.graphlib.Graph {
    let g = new dagre.graphlib.Graph();

    // Set an object for the graph label
    g.setGraph({});

    src.Kinds.forEach(k => {
        let dim = estimateSize(k.name.length);
        g.setNode(k.id,
            {
                label: k.name,
                width: dim.width + Padding.width,
                height: dim.height + Padding.height
            }
        )
    });

    // Default to assigning a new object as a label for each new edge.
    g.setDefaultEdgeLabel(function () {
        return {};
    });
    
    src.Relations.forEach(r => {
        g.setEdge(r.child, r.parent);
    });

    return g;
}