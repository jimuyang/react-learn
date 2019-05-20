import mockFlowData from './mock/flowData.json';

const trim = (str, char) => {
    return str.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '');
}

const test = (input) => {
    console.log("start"); {
        input.amount = 100; {
            if (input.color == 'red' == false) {
                return `不买 颜色是${input.color}`
            }
            if (input.color == 'red' == true) {
                if (input.price <= input.amount == true) {
                    input.amount = input.amount - input.price; {
                        return input
                    }
                }
                if (input.price <= input.amount == false) {
                    return `买不起`
                }
            }
        }
    }
}


/**
 * 解析执行 将data转化为一个js函数运行
 * @param {flowData} flowData 
 */
export const parseRun = (flowData) => {
    flowData = flowData || mockFlowData;

    const {
        nodes,
        edges
    } = flowData;
    // console.log(nodes);
    // console.log(edges);

    let nodeMap = {};
    let startNode = null;
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
        sourceNode.targets.push({
            node: targetNode,
            targetAnchor: edge.targetAnchor,
            sourceAnchor: edge.sourceAnchor,
            valve: edge.valve
        });
        targetNode.sources.push({
            node: sourceNode,
            targetAnchor: edge.targetAnchor,
            sourceAnchor: edge.sourceAnchor,
            valve: edge.valve
        });
    }
    console.log(nodeMap);
    if (!startNode) {
        console.log('no start node found!');
        return;
    }

    let travelNodeMap = (node) => {
        const {
            category,
            stream
        } = node;
        let str = '';
        switch (category) {
            case 'start':
                // str += 'console.log("start");';
                break;
            case 'output':
                if (node.stream.startsWith('"'))
                    str += `return \`${trim(node.stream, '"')}\` ;`;
                else
                    str += `return ${node.stream};`;
                break;
            case 'alias':
                const aliases = node.aliases || [];
                console.log(aliases);
                break;
            case 'command':
                if (node.command) {
                    str += node.command;
                }
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
            if (node.stream == 'true' && target.valve == 'true') {
                str += `${travelNodeMap(target.node)}`;
            } else if (node.stream == 'true') {
                str += `if (${target.valve}) {${travelNodeMap(target.node)}}`;
            } else if (target.valve == 'true') {
                str += `if (${node.stream}) {${travelNodeMap(target.node)}}`;
            } else {
                str += `if ((${node.stream}) == (${target.valve})) {${travelNodeMap(target.node)}}`;
            }
        }
        if (defaultTarget) {
            str += `${travelNodeMap(defaultTarget.node)}`;
        }
        return str;
    }

    console.log("生成JS逻辑:", travelNodeMap(startNode));

    let rule = new Function('input', travelNodeMap(startNode));
    let input = JSON.parse(startNode.input);
    console.log("输入:", input);
    // run
    console.log("输出:", rule(input));
}


/**
 * 流执行 数据将会真实的在flow中流动
 * @param {flowData} flowData 
 */
export const flowRun = (flowData) => {

}