import React, { Fragment } from 'react';
import { Card, Form, Input, Select } from 'antd';
import { withPropsAPI } from 'gg-editor';
import upperFirst from 'lodash/upperFirst';

const { Item } = Form;
const { Option } = Select;

const inlineFormItemLayout = {
  labelCol: {
    sm: { span: 8 },
  },
  wrapperCol: {
    sm: { span: 16 },
  },
};

class DetailForm extends React.Component {
  get item() {
    const { propsAPI } = this.props;
    return propsAPI.getSelected()[0];
  }

  handleSubmit = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const { form, propsAPI } = this.props;
    const { getSelected, executeCommand, update } = propsAPI;


    setTimeout(() => {
      form.validateFieldsAndScroll((err, values) => {
        // debugger
        if (err) {
          return;
        }

        const item = getSelected()[0];

        if (!item) {
          return;
        }

        executeCommand(() => {
          update(item, {
            ...values,
          });
        });
      });
    }, 0);
  };

  renderEdgeShapeSelect = () => {
    return (
      <Select onChange={this.handleSubmit}>
        <Option value="flow-smooth">Smooth</Option>
        <Option value="flow-polyline">Polyline</Option>
        <Option value="flow-polyline-round">Polyline Round</Option>
      </Select>
    );
  };

  renderNodeDetail = () => {
    const { form } = this.props;
    const model = this.item.getModel();
    // debugger
    console.log(model);

    let renderDecisionNodeDetail = () => {
      // console.log(...form.getFieldDecorator('expression', {
      //   initialValue: model.expression,
      // }));

      return (
        <div>
          <Item label="Label" {...inlineFormItemLayout}>
            {form.getFieldDecorator('label', {
              initialValue: model.label,
            })(<Input onBlur={this.handleSubmit} />)}
          </Item>
          <Item label="Expression" {...inlineFormItemLayout}>
            {form.getFieldDecorator('expression', {
              initialValue: model.expression,
            })(<Input onBlur={this.handleSubmit} />)}
          </Item>
        </div>
      );
    }
    let renderNormalNodeDetail = () => {
      return (
        <div>
          <Item label="Label" {...inlineFormItemLayout}>
            {form.getFieldDecorator('label', {
              initialValue: model.label,
            })(<Input onBlur={this.handleSubmit} />)}
          </Item>
        </div>
      );
    }

    let renderStartNodeDetail = () => {
      const { TextArea } = Input;
      return (
        <div>
          <Item label="Label" {...inlineFormItemLayout}>
            {form.getFieldDecorator('label', {
              initialValue: model.label,
            })(<Input onBlur={this.handleSubmit} />)}
          </Item>
          <Item label="Input" {...inlineFormItemLayout}>
            {form.getFieldDecorator('input', {
              initialValue: model.input,
            })(<TextArea rows={6} onBlur={this.handleSubmit} />)}
          </Item>
        </div>
      );
    }

    let renderOutputNodeDetail = () => {
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
    }

    switch (model.category) {
      case 'decision':
        return renderDecisionNodeDetail();
      case 'start':
        return renderStartNodeDetail();
      case 'output':
        return renderOutputNodeDetail();
      default:
        return renderNormalNodeDetail();
    }
  };

  renderEdgeDetail = () => {
    const { form } = this.props;
    const { label = '', shape = 'flow-smooth' } = this.item.getModel();

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
}

export default Form.create()(withPropsAPI(DetailForm));
