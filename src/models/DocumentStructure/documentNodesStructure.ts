import DescribedNode from './describedNode';

export default class DocumentNodesStructure {
    private _nodesMap: Map<HTMLElement, DescribedNode>;
    rootNodes: DescribedNode[];

    constructor() {
        this._nodesMap = new Map<HTMLElement, DescribedNode>();
        this.rootNodes = [];
    }

    public add(node: DescribedNode, target: HTMLElement | undefined = undefined): DocumentNodesStructure {
        if (!target) {
            this.rootNodes.push(node);
            this._nodesMap.set(node.nativeNode, node);
            return this;
        }
        const foundTarget = this._nodesMap.get(target);
        if (!foundTarget) {
            throw new Error('Target element was not found');
        }
        foundTarget.children.push(node);
        this._nodesMap.set(node.nativeNode, node);
        return this;
    }

    public find(nativeNode: HTMLElement): DescribedNode | undefined {
        return this._nodesMap.get(nativeNode);
    }
}