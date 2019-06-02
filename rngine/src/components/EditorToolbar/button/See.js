import React from 'react';
import { Tooltip } from 'antd';
import { withPropsAPI } from 'gg-editor';
import MyIcon from '../../../common/IconFont/MyIcon';

import styles from '../index.less';

class SeeButton extends React.Component {

    handleClick = (e) => {
        this.props.click();
    }

    render() {
        // const { icon, text } = this.props;
        return (
            <div className="command" onClick={this.handleClick}>
                <Tooltip
                    title="see"
                    placement="bottom"
                    overlayClassName={styles.tooltip}>
                    <MyIcon type="iconsee" />
                </Tooltip>
            </div>
        );
    }
}

export default withPropsAPI(SeeButton);
