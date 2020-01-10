import { Utils, Conf } from "./utils";
import * as d3 from "d3";
import * as cola from "webcola";

//#region model
export namespace Graph {
    export interface Kind extends d3.SimulationNodeDatum, Utils.CentralBound {
        id: string;
        name?: string;
        isLink?: boolean;
    }

    export interface KindXY extends Kind, cola.Node {
        x: number;
        y: number;
    }

    export interface Relation extends d3.SimulationLinkDatum<Kind> {
        id: string;
        type?: RelationType;
    }

    export interface RelationXY
        extends Relation,
            cola.Link<KindXY>,
            d3.SimulationLinkDatum<KindXY> {
        source: KindXY;
        target: KindXY;
    }

    export interface YModelCompact {
        /**
         * in compact format: the string can describe a Kind which is the label and id of the kind
         */
        Kinds: (Kind | KindXY | string)[];
        /**
         * in compact format: a string can also refered to a relation. For example "source:target:1". 1 is the type, if not defnied then it will be 0 (normal type)
         */
        Relations: (Relation | RelationXY | string)[];
    }

    export interface YModel {
        Kinds: Kind[];
        Relations: Relation[];
    }

    export class YModelXY implements YModel {
        public Kinds: KindXY[] = [];
        public Relations: RelationXY[] = [];
        public constructor(k: KindXY[], r: RelationXY[]) {
            this.Kinds = k;
            this.Relations = r;
        }
        public IsMultiLink(k: KindXY): boolean {
            if (k.isLink) return false;
            let count = 0;
            for (let r of this.Relations) {
                if (
                    (r.type === RelationType.Normal || r.type) &&
                    r.target.id == k.id
                ) {
                    count++;
                }
                if (count > 1) return true;
            }
            return false;
        }
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
    export function buildDetail(m: YModel): YModelXY {
        let find = (id: string) => m.Kinds.find(k => k.id == id);

        m.Kinds.forEach(k => {
            k.x = 0;
            k.y = 0;
            k.width = 0;
            k.height = 0;
            if (!k.name) {
                k.name = k.id;
            }
        });

        m.Relations.forEach(r => {
            if (typeof r.source === "string")
                r.source = find(r.source as string) || r.source;
            if (typeof r.target === "string")
                r.target = find(r.target as string) || r.target;
        });
        return <YModelXY>m;
    }

    function createKind(s: string): KindXY {
        return {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            id: s,
            name: s,
        };
    }

    export function buildDetailFromCompact(m: YModelCompact): YModelXY {
        const Kinds: KindXY[] = m.Kinds.map(k => {
            if (typeof k === "string") {
                if (k.length > 2 && k.startsWith("-") && k.endsWith("-")) {
                    k = k.substr(1, k.length - 2);
                    return Object.assign({ isLink: true }, createKind(k));
                }
                return createKind(k);
            } else {
                k.x = 0;
                k.y = 0;
                k.width = 0;
                k.height = 0;
                if (!k.name) {
                    k.name = k.id;
                }
                return <KindXY>k;
            }
        });

        function findOrCreateKind(id: string): KindXY {
            let k = Kinds.find(k => (<KindXY>k).id == id);
            if (!k) {
                k = createKind(id);
                Kinds.push(k);
            }
            return k;
        }
        const Relations: RelationXY[] = [];

        for (let r of m.Relations) {
            if (typeof r === "string") {
                //User:Group:1
                const t = r.split(":");
                const l = t.length;
                const source = l > 0 ? findOrCreateKind(t[0].trim()) : null;
                const target = l > 1 ? findOrCreateKind(t[1].trim()) : null;
                if (source && target) {
                    Relations.push({
                        id: r,
                        source,
                        target,
                        type:
                            l > 2
                                ? <RelationType>Number.parseInt(t[2].trim())
                                : RelationType.Normal,
                    });
                }
            } else {
                let source: KindXY | undefined = undefined;
                let target: KindXY | undefined = undefined;
                if (r.source && typeof r.source === "string")
                    source = findOrCreateKind(r.source);
                if (typeof r.target === "string")
                    target = findOrCreateKind(r.target);
                if (source && target) {
                    r.source = source;
                    r.target = target;
                    Relations.push(<RelationXY>r);
                }
            }
        }
        return new YModelXY(Kinds, Relations);
    }

    export function minDistant(
        source: Utils.Dimension,
        target: Utils.Dimension
    ): number {
        return (
            (Utils.diagonalLength(source) + Utils.diagonalLength(target)) / 2
        );
    }

    export type D3FLayout = d3.Simulation<Kind, undefined> | null;
    export function buildD3FLayout(
        g: YModel,
        canvasSize: Utils.Dimension
    ): D3FLayout {
        if (!g || !canvasSize.width || !canvasSize.height) return null;
        const resu = d3
            .forceSimulation(g.Kinds)
            .force(
                "center",
                d3.forceCenter(canvasSize.width / 2, canvasSize.height / 2)
            )
            .force(
                "link",
                d3.forceLink(g.Relations).distance(l => {
                    let source = l.source as Graph.Kind;
                    let target = l.target as Graph.Kind;
                    let d = 0;
                    if (source && target) {
                        d = Graph.minDistant(source, target);
                    }
                    return d == 0 ? 50 : d + 40;
                })
            )
            .force(
                "charge",
                d3
                    .forceManyBody()
                    .strength(-120)
                    .distanceMin(120)
                    .distanceMax(canvasSize.width)
            )
            .force("collide", d3.forceCollide(100));

        resu.on("end", () => {
            g.Kinds.forEach(k => {
                k.x = Utils.round(k.x || 0, Conf.GRID, canvasSize.width);
                k.y = Utils.round(k.y || 0, Conf.GRID, canvasSize.height);
            });
        });

        return resu;
    }

    export type ColaFLayout = ColaFLayoutExt | null;

    class ColaFLayoutExt extends cola.Layout {
        protected kick(): void {
            const timer = d3.timer(() => {
                if (this.tick()) {
                    timer.stop();
                }
            });
        }
    }
    export function buildColaFLayout(
        g: YModelXY,
        canvasSize: Utils.Dimension
    ): ColaFLayout | null {
        if (!g || !canvasSize.width || !canvasSize.height) return null;
        const layout = new ColaFLayoutExt();
        layout
            .size([canvasSize.width || 0, canvasSize.height || 0])
            .nodes(g.Kinds)
            .links(g.Relations)
            .linkDistance(l => {
                return (
                    minDistant(
                        <Utils.Dimension>l.source,
                        <Utils.Dimension>l.target
                    ) +
                    Conf.GRID * 3
                );
            })
            //.jaccardLinkLengths(Conf.GRID * 25, 0.7)
            .avoidOverlaps(true);
        return layout;
    }
}
