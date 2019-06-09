import React from 'react';
import { Row, Col } from 'antd';
import GGEditor, { Flow, RegisterCommand } from 'gg-editor';
import EditorMinimap from '../components/EditorMinimap';
import { FlowContextMenu } from '../components/EditorContextMenu';
import { FlowToolbar } from '../components/EditorToolbar';
import { FlowItemPanel } from '../components/EditorItemPanel';
import { FlowDetailPanel } from '../components/EditorDetailPanel';
import styles from './index.less';

// import flowData from '../mock/flowData.json';
import mockSuggestFlow from '../mock/suggestFlow.json';
import LocalStorageAPI from '../api/UseLocalStorage';

let API = LocalStorageAPI;
let flowData = API.loadFlow() || mockSuggestFlow;
// console.log(flowData);

const grid = {
  default: {
    left: 4,
    content: 16,
    right: 4
  },
  // hideDetail: {
  //   left: 4,
  //   content: 20,
  //   right: 0
  // }
}

class FlowPage extends React.Component {

  constructor() {
    super();
    this.state = {
      hideDetail: true
    }
  }

  render() {
    // const util = {

    //   hideDetail: () => {
    //     if (!this.state.hideDetail) {
    //       this.setState({ hideDetail: true })
    //     }
    //   },
    //   showDetail: () => {
    //     if (this.state.hideDetail) {
    //       this.setState({ hideDetail: false });
    //     }
    //   }
    // }
    // const layout = this.state.hideDetail ? grid.hideDetail : grid.default;
    const layout = grid.default;
    return (
      <GGEditor className={styles.editor}>
        <Row type="flex" className={styles.editorHd}>
          <Col span={24}>
            <FlowToolbar api={API} util={util} />
          </Col>
        </Row>
        <Row type="flex" className={styles.editorBd}>
          <Col span={layout.left} className={styles.editorSidebar}>
            <FlowItemPanel />
          </Col>
          <Col span={layout.content} className={styles.editorContent}>
            <Flow className={styles.flow} />
          </Col>
          <Col span={layout.right} className={styles.editorSidebar}>
            <FlowDetailPanel /*util={util}*/ />
            <EditorMinimap />
          </Col>
        </Row>
        <FlowContextMenu />
      </GGEditor>
    );
  }

};

export default FlowPage;
