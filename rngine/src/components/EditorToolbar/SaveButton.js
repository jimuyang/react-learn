import React from 'react';
import { Tooltip } from 'antd';
import { withPropsAPI } from 'gg-editor';
import MyIcon from '../../common/IconFont/MyIcon';

import styles from './index.less';

class SaveButton extends React.Component {

    handleClick = (e) => {
        console.log(e);
        const { propsAPI } = this.props;
        console.log(propsAPI.save());
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
