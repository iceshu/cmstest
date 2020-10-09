import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography, Form, Input, Button, Select, Modal, message } from 'antd';
import FEditor from 'for-editor';
import {
  addPostR,
  getCategoryR,
  getPostItemR,
  uploadFileR,
  getTagR,
  createTagR,
  uploadPostR,
} from '@/services';
import { ResponseData } from '@/types';
import BraftEditor from 'braft-editor';
import CodeHighlighter from 'braft-extensions/dist/code-highlighter';
import styles from './Welcome.less';

import * as _ from 'lodash';
import store2 from 'store2';
import { history } from 'umi';
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/code-highlighter.css';
BraftEditor.use(
  CodeHighlighter({
    includeEditors: ['BraftEditorID'],
  }),
);
const blockExportFn = (contentState, block) => {
  const previousBlock = contentState.getBlockBefore(block.key);

  if (block.type === 'unstyled' && previousBlock && previousBlock.getType() === 'atomic') {
    return {
      start: '',
      end: '',
    };
  }
};
const { confirm } = Modal;

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 2 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default class PostAdd extends Component {
  id: string;

  constructor(props: any) {
    super(props);
    this.formRef = React.createRef();
    this.editor = React.createRef();
    this.$vm = React.createRef<FEditor>();
    this.id = '';
    this.state = {
      value: '',
      categoryLists: [],
      tags: [],
    };
  }

  componentDidMount() {
    const { id } = this.props.location.query;
    if (id) {
      this.id = id;
      getPostItemR({ _id: id }).then((res) => {
        if (res.success && res.data) {
          const formValue: object = _.pick(res.data, [
            'title',
            'simpleComments',
            'categories',
            'tags',
          ]);
          const tagsv = _.get(formValue, 'tags', '[]').map((e: any) => e.id);
          const categories = _.get(formValue, 'categories[0].id', '');
          const simpleComments = BraftEditor.createEditorState(
            _.get(formValue, 'simpleComments', ''),
          );
          this.formRef.current.setFieldsValue({
            ...formValue,
            ...{ categories, tags: tagsv, simpleComments },
          });
        }
      });
    } else {
      if (store2('zancun')) {
        this.showConfirm();
      }
    }
    getCategoryR().then((data) => {
      if (data.success) {
        this.setState({
          categoryLists: data.data,
        });
      }
    });
    getTagR().then((data) => {
      if (data.success) {
        this.setState({
          tags: data.data,
        });
      }
    });
  }

  onFinish = async (values: any) => {
    const otherTags = this.handleAddOtherTags(values.tags);
    const intags = this.handleInTags(values.tags);
    if (!_.isEmpty(otherTags)) {
      message.loading('创建标签中');
      const tasData = otherTags.map((e) => ({ name: e }));
      const dd = await createTagR({ tags: tasData });
      if (dd.success) {
        const newtafs: any = dd.data.map((e: any) => e.id);
        values.tags = _.concat(intags, newtafs);
        message.success('创建成功');
      } else {
        message.success('创建成功');
      }
    }
    const requestfn = this.id ? uploadPostR : addPostR;
    const { simpleComments: osimpleComments } = values;

    requestfn({
      params: { id: this.id },
      data: { ...values, simpleComments: osimpleComments.toHTML() },
    }).then((res) => {
      if (res && res.success) {
        store2.remove('zancun');
        !this.id
          ? confirm({
              title: '操作成功',
              content: '是否继续增加新文章？',
              onOk: () => {
                this.formRef.current.resetFields();
              },
              onCancel() {
                history.push('/post/list');
              },
            })
          : history.push('/post/list');
      } else {
        message.error(res.msg);
      }
    });
  };

  handleAddOtherTags(otags = []) {
    const { tags = [] } = this.state;
    const tagIds: Array<string> = tags.map((e: any) => e.id);
    return otags.filter((e) => !tagIds.includes(e));
  }

  handleInTags = (otags = []) => {
    const { tags = [] } = this.state;
    const tagIds: Array<string> = tags.map((e: any) => e.id);
    return otags.filter((e: any) => tagIds.includes(e));
  };
  handleChange = _.debounce((value: any) => {
    store2('zancun', value);
  }, 5000);

  showConfirm = () => {
    confirm({
      title: '有草稿信息是否读取',
      content: '确认读取缓存，否则删除缓存',
      onOk: () => {
        return new Promise((resolve, reject) => {
          const simpleComments = store2('zancun');
          this.formRef.current.setFieldsValue({ simpleComments });
          resolve(true);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {
        store2.remove('zancun');
      },
    });
  };

  uploadFn = (param: any) => {
    const formData = new FormData();
    formData.append('file', param.file);
    uploadFileR(formData)
      .then((res) => {
        if (res && res.success) {
          param.success({
            url: res.data,
          });
          return;
        }
        message.error(res.msg);
      })
      .catch((e) => {
        message.error('上传失败');
        param.error({
          msg: e,
        });
      });
  };
  handleEditorChange = () => {};
  config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };

  render() {
    const { value, categoryLists, tags } = this.state;
    return (
      <PageContainer>
        <Card>
          <Form
            ref={this.formRef}
            {...formItemLayout}
            name="register"
            onFinish={this.onFinish}
            scrollToFirstError
          >
            <Form.Item
              name="title"
              label="标题"
              rules={[
                {
                  required: true,
                  message: '请输入标题',
                },
              ]}
            >
              <Input placeholder="文章标题" />
            </Form.Item>
            <Form.Item
              name="categories"
              label="分类"
              rules={[
                {
                  required: true,
                  message: '请选择分类',
                },
              ]}
            >
              <Select style={{ width: '100%' }} placeholder="文章分类">
                {categoryLists.map((e: any) => {
                  return (
                    <Option value={e.id} key={e.id}>
                      {e.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item name="tags" label="标签">
              <Select mode="tags" style={{ width: '100%' }} placeholder="文章标签">
                {tags.map((e: any) => {
                  return (
                    <Option value={e.id} key={e.id}>
                      {e.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="simpleComments"
              label="内容"
              valuePropName="value"
              initialValue={BraftEditor.createEditorState('<p></p>')}
              rules={[
                {
                  validator: (_, value, callback) => {
                    if (value.isEmpty()) {
                      return Promise.reject('请输入正文内容');
                    } else {
                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
              <BraftEditor
                className={styles.warpEdit}
                id="BraftEditorID"
                media={{ uploadFn: this.uploadFn }}
                converts={{ blockExportFn }}
              />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </PageContainer>
    );
  }
}
