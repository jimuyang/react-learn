import React from 'react';
import { Divider } from 'antd';
import { Toolbar } from 'gg-editor';
import ToolbarButton from './ToolbarButton';
import SaveButton from './button/Save';
import SeeButton from './button/See';
import RunButton from './button/Run';
import PublishButton from './button/Publish';
import SettingButton from './button/Setting';

import styles from './index.less';

const FlowToolbar = (props) => {
  const API = props.api;
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Toolbar className={styles.toolbar}>
        <ToolbarButton command="undo" />
        <ToolbarButton command="redo" />
        <Divider type="vertical" />
        <ToolbarButton command="copy" />
        <ToolbarButton command="paste" />
        <ToolbarButton command="delete" />
        <Divider type="vertical" />
        <ToolbarButton command="zoomIn" icon="zoom-in" text="Zoom In" />
        <ToolbarButton command="zoomOut" icon="zoom-out" text="Zoom Out" />
        <ToolbarButton command="autoZoom" icon="fit-map" text="Fit Map" />
        <ToolbarButton command="resetZoom" icon="actual-size" text="Actual Size" />
        <Divider type="vertical" />
        <ToolbarButton command="toBack" icon="to-back" text="To Back" />
        <ToolbarButton command="toFront" icon="to-front" text="To Front" />
        <Divider type="vertical" />
        <ToolbarButton command="multiSelect" icon="multi-select" text="Multi Select" />
        <ToolbarButton command="addGroup" icon="group" text="Add Group" />
        <ToolbarButton command="unGroup" icon="ungroup" text="Ungroup" />
        <Divider type="vertical" />
      </Toolbar>
      <div className={styles.toolbar}>
        <SaveButton save={API.saveFlow} />
        <SeeButton />
        <PublishButton />
        <RunButton />
        <SettingButton />
      </div>
    </div>
  );
};

export default FlowToolbar;
