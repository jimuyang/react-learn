import React from 'react';
import { Tooltip } from 'antd';
import { withPropsAPI } from 'gg-editor';
import MyIcon from '../../../common/IconFont/MyIcon';

import styles from '../index.less';

class PublishButton extends React.Component {

    handleClick = (e) => {
        // // console.log(e);
        // const { propsAPI } = this.props;
        // let data = propsAPI.save();
        // // console.log(data);
        // console.log(JSON.stringify(data));
        // parseRun(data);
    }

    render() {
        // const { icon, text } = this.props;
        return (
            <div className="command" onClick={this.handleClick}>
                <Tooltip
                    title="publish"
                    placement="bottom"
                    overlayClassName={styles.tooltip}>
                    <MyIcon type="iconfabu" />
                </Tooltip>
            </div>
        );
    }
}

export default withPropsAPI(PublishButton);