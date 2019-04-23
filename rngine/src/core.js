import mockFlowData from './mock/flowData.json';

const trim = (str, char) => {
    return str.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '');
}

/**
 * 解析执行 将data转化为一个js函数运行
 * @param {flowData} flowData 
 */
export const parseRun = (flowData) => {
    flowData = flowData || mockFlowData;

    const { nodes, edges } = flowData;
    console.log(nodes);
    console.log(edges);

    const startNode;
    for (let node of nodes) {
        nodeMap[node.id] = node;
        node.sources = [];
        node.targets = [];
        // console.log(node);
        if (node.category === 'start') {
            startNode = node;
        }
    }
    for (let edge of edges) {
        // console.log(edge);
        sourceNode.targets.push({
            node: nodeMap[edge.target], targetAnchor: edge.targetAnchor, sourceAnchor: edge.sourceAnchor, valve: edge.valve
        });
        targetNode.sources.push({
            node: nodeMap[edge.source], targetAnchor: edge.targetAnchor, sourceAnchor: edge.sourceAnchor, valve: edge.valve
        });
    }
    console.log(nodeMap);
    if (!startNode) {
        console.log('no start node found!'); 
        return;
    }

    let travelNodeMap = (node) => {
        const { category, stream } = node;
        let str = '';
        switch (category) {
            case 'start':
                str += 'console.log("start");';
                break;
            case 'output':
                if (node.output.startsWith('"'))
                    str += `return \`${trim(node.output, '"')}\``;
                else
                    str += `return ${node.output}`;
                break;
            case 'alias':
                const aliases = node.aliases || [];
                console.log(aliases);
                break;
            default:
        }
        // 处理node的targets
        node.stream = node.stream || 'true';
        let defaultTarget = null;
        for (let target of node.targets) {
            if (!target.valve) {
                // 没有阀门限制的target添加到最后
                defaultTarget = target; 
                continue;
            }
            str += `if (${node.stream} == ${target.valve}) {${travelNodeMap(target.node)}`;
        }
        if (defaultTarget) {
            str += `{${travelNodeMap(defaultTarget.node)}`;
        }
        return str;
    }

    console.log(travelNodeMap(startNode));

    let rule = new Function('input', travelNodeMap(startNode));
    console.log(startNode.input);
    // run
    console.log(rule(JSON.parse(startNode.input)));
}

/**
 * 解析执行 将data转化为一个js函数运行
 * @param {flowData} flowData 
 */
export const parseRun1 = (flowData) => {
    flowData = flowData || mockFlowData;
    const { nodes, edges } = flowData;

    let startNode;
    let nodeMap = {};

    for (let node of nodes) {
        nodeMap[node.id] = node;
        node.sources = [];
        node.targets = [];
        // console.log(node);
        if (node.category === 'start') {
            startNode = node;
        }
    }
    for (let edge of edges) {
        // console.log(edge);
        let sourceNode = nodeMap[edge.source];
        let targetNode = nodeMap[edge.target];

        sourceNode.targets.push({ node: targetNode, targetAnchor: edge.targetAnchor, sourceAnchor: edge.sourceAnchor });
        targetNode.sources.push({ node: sourceNode, targetAnchor: edge.targetAnchor, sourceAnchor: edge.sourceAnchor });
    }

    console.log(nodeMap);
    if (!startNode) {
        console.log('no start node found!');
        return;
    }

    let travelMap = (node) => {
        let str = '';
        switch (node.category) {
            case 'start':
                str += 'console.log("start");';
                for (let target of node.targets) {
                    str += travelMap(target.node)
                }
                break;
            case 'decision':
                const condition = node.expression;
                const inAnchor = node.sources[0].targetAnchor;
                const trueOutAnchor = inAnchor >= 2 ? inAnchor - 2 : inAnchor + 2;
                // debugger
                const whenTrue = travelMap(node.targets.find(t => t.sourceAnchor === trueOutAnchor).node);
                const whenFalse = travelMap(node.targets.find(t => t.sourceAnchor !== trueOutAnchor).node);
                str += `if (${condition}) {${whenTrue}} else {${whenFalse}}`;
                break;
            case 'output':
                // str += `return \`${node.output}\``;
                if (node.output.startsWith('"')) {
                    str += `return \`${trim(node.output, '"')}\``;
                } else {
                    str += `return ${node.output}`;
                }
                break;
            default:
        }
        return str;
    };
    console.log(travelMap(startNode));

    let rule = new Function('input', travelMap(startNode));
    console.log(startNode.input);
    // debugger

    // run
    console.log(rule(JSON.parse(startNode.input)));
}

/**
 * 流执行 数据将会真实的在flow中流动
 * @param {flowData} flowData 
 */
export const flowRun = (flowData) => {

}
