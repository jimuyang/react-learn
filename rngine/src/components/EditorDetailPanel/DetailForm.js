import React, { Fragment } from 'react';
import { Card, Form, Input, Select, Button, Icon } from 'antd';
import { withPropsAPI } from 'gg-editor';
import upperFirst from 'lodash/upperFirst';

const { Item } = Form;
const { Option } = Select;

const inlineFormItemLayout = {
  labelCol: {
    sm: { span: 4 },
  },
  wrapperCol: {
    sm: { span: 20 },
  },
};

let id = 0;

class DetailForm extends React.Component {
  get item() {
    const { propsAPI } = this.props;
    return propsAPI.getSelected()[0];
  }

  render() {
    const { type } = this.props;
    // console.log(this.props);
    if (!this.item) {
      return null;
    }

    return (
      <Card type="inner" size="small" title={upperFirst(type)} bordered={false}>
        <Form onSubmit={this.handleSubmit}>
          {type === 'node' && this.renderNodeDetail()}
          {type === 'edge' && this.renderEdgeDetail()}
          {type === 'group' && this.renderGroupDetail()}
        </Form>
      </Card>
    );
  }

  handleSubmit = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    const { form, propsAPI } = this.props;
    const { getSelected, executeCommand, update } = propsAPI;
    setTimeout(() => {
      form.validateFieldsAndScroll((err, values) => {
        console.log(values);
        if (err || !this.item) {
          return;
        }
        executeCommand(() => {
          update(this.item, {
            ...values,
          });
        });
      });
    }, 0);
  };
  renderEdgeDetail = () => {
    const { form } = this.props;
    const { label = '', shape = 'flow-smooth', valve = 'true' } = this.item.getModel();
    return (
      <Fragment>
        <Item label="Label" {...inlineFormItemLayout}>
          {form.getFieldDecorator('label', {
            initialValue: label,
          })(<Input onBlur={this.handleSubmit} />)}
        </Item>
        <Item label="Shape" {...inlineFormItemLayout}>
          {form.getFieldDecorator('shape', {
            initialValue: shape,
          })(this.renderEdgeShapeSelect())}
        </Item>
        <Item label="Valve" {...inlineFormItemLayout}>
          {form.getFieldDecorator('valve', {
            initialValue: valve,
          })(<Input onBlur={this.handleSubmit} />)}
        </Item>
      </Fragment>
    );
  };

  renderGroupDetail = () => {
    const { form } = this.props;
    const { label = '新建分组' } = this.item.getModel();

    return (
      <Item label="Label" {...inlineFormItemLayout}>
        {form.getFieldDecorator('label', {
          initialValue: label,
        })(<Input onBlur={this.handleSubmit} />)}
      </Item>
    );
  };

  renderNodeDetail = () => {
    const { form } = this.props;
    const { category } = this.item.getModel();
    // debugger
    switch (category) {
      case 'start':
        return this.renderStartNodeDetail();
      case 'command':
        return this.renderCommandNodeDetail();
      case 'alias':
        return this.renderAliasNodeDetail();
      case 'decision':
      case 'output':
      default:
        return this.renderNormalNodeDetail();
    }
  };

  /**
   * 所有node都有的属性和展示
   */
  _renderCommonNodeDetail = () => {
    const { form } = this.props;
    const model = this.item.getModel();
    return (
      <div>
        <Item label="Label" {...inlineFormItemLayout}>
          {form.getFieldDecorator('label', {
            initialValue: model.label,
          })(<Input onBlur={this.handleSubmit} />)}
        </Item>
        <Item label="Stream" {...inlineFormItemLayout}>
          {form.getFieldDecorator('stream', {
            initialValue: model.stream,
          })(<Input onBlur={this.handleSubmit} />)}
        </Item>
      </div>
    );
  };

  renderDecisionNodeDetail = () => {
    return this._renderCommonNodeDetail();
  };

  renderNormalNodeDetail = () => {
    return this._renderCommonNodeDetail();
  };

  renderStartNodeDetail = () => {
    const { form } = this.props;
    const model = this.item.getModel();
    const { TextArea } = Input;
    return (
      <div>
        {this._renderCommonNodeDetail()}
        <Item label="Input" {...inlineFormItemLayout}>
          {form.getFieldDecorator('input', {
            initialValue: model.input,
          })(<TextArea rows={6} onBlur={this.handleSubmit} />)}
        </Item>
      </div>
    );
  };

  renderOutputNodeDetail = () => {
    const { form } = this.props;
    const model = this.item.getModel();
    return (
      <div>
        <Item label="Label" {...inlineFormItemLayout}>
          {form.getFieldDecorator('label', {
            initialValue: model.label,
          })(<Input onBlur={this.handleSubmit} />)}
        </Item>
        <Item label="Output" {...inlineFormItemLayout}>
          {form.getFieldDecorator('output', {
            initialValue: model.output,
          })(<Input onBlur={this.handleSubmit} />)}
        </Item>
      </div>
    );
  };

  renderCommandNodeDetail = () => {
    const { form } = this.props;
    const model = this.item.getModel();
    return (
      <div>
        <Item label="Label" {...inlineFormItemLayout}>
          {form.getFieldDecorator('label', {
            initialValue: model.label,
          })(<Input onBlur={this.handleSubmit} />)}
        </Item>
        <Item label="Command" {...inlineFormItemLayout}>
          {form.getFieldDecorator('command', {
            initialValue: model.command,
          })(<Input onBlur={this.handleSubmit} />)}
        </Item>
      </div>
    );
  }

  renderAliasNodeDetail = () => {
    const { form } = this.props;
    const model = this.item.getModel();
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    form.getFieldDecorator('keys', { initialValue: model.keys || [] });
    const keys = form.getFieldValue('keys');
    // console.log(keys);
    const aliases = model.aliases || [];

    const formItems = keys.map((k, index) => (
      <Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? 'Alias' : ''}
        required={false}
        key={k}
      >
        {form.getFieldDecorator(`aliases[${k}].name`, { initialValue: aliases.length > k ? model.aliases[k].name : 'alias' })(
          <Input onBlur={this.handleSubmit} style={{ width: '20%', marginRight: '8px' }} />
        )}
        {form.getFieldDecorator(`aliases[${k}].for`, { initialValue: aliases.length > k ? model.aliases[k].for : 'for' })(
          <Input onBlur={this.handleSubmit} style={{ width: '50%', marginRight: '8px' }} />
        )}
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this._removeAlias(k)}
          />) : null}
      </Item>
    ));

    return (
      <div>
        {formItems}
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this._addAlias} style={{ width: '60%' }}>
            <Icon type="plus" /> Add Alias
          </Button>
        </Form.Item>
      </div>
    );
  }

  _removeAlias = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  _addAlias = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  renderEdgeShapeSelect = () => {
    return (
      <Select onChange={this.handleSubmit}>
        <Option value="flow-smooth">Smooth</Option>
        <Option value="flow-polyline">Polyline</Option>
        <Option value="flow-polyline-round">Polyline Round</Option>
      </Select>
    );
  };
}

export default Form.create()(withPropsAPI(DetailForm));
