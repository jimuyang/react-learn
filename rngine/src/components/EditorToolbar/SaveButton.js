import React from 'react';
import { Tooltip } from 'antd';
import { withPropsAPI } from 'gg-editor';
import MyIcon from '../../common/IconFont/MyIcon';
import mockFlowData from '../../mock/flowData.json';

import styles from './index.less';

class SaveButton extends React.Component {

    handleClick = (e) => {
        // console.log(e);
        const { propsAPI } = this.props;
        let data = propsAPI.save();
        console.log(data);
        console.log(JSON.stringify(data));

        this.handleFlowData();
    }

    handleFlowData = (flowData) => {
        flowData = mockFlowData;
        const { nodes, edges } = flowData;
        for (let node of nodes) {
            console.log(node);
        }
        for (let edge of edges) {
            console.log(edge);
        }
    }

    render() {
        // const { icon, text } = this.props;
        return (
            <div className="command" onClick={this.handleClick}>
                <Tooltip
                    title="save"
                    placement="bottom"
                    overlayClassName={styles.tooltip}>
                    <MyIcon type="iconsave" />
                </Tooltip>
            </div>
        );
    }
}

export default withPropsAPI(SaveButton);
