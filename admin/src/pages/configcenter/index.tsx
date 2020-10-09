import { Button, Divider, Form, Input, message, Modal, Popconfirm, Switch, Table } from 'antd';
import dayjs from 'dayjs';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import React, { Fragment, useState } from 'react';
import { useSetState, useMount } from 'ahooks';

import { FormInstance } from 'antd/lib/form';
import {
  createConfigR,
  removeConfigR,
  getConfigR,
  getConfigItemR,
  updateConfigR,
} from '@/services';
import { rebuildDataWithKeySpecial } from '@/utils/utils';

const SettingConfigCenter = () => {
  const [form] = Form.useForm();
  const [state, setState] = useSetState({
    lists: [],
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
    loading: false,
    showModal: false,
    selectedItem: null,
  });
  const columns = [
    {
      title: '唯一KEY',
      dataIndex: 'label',
    },
    {
      title: '创建时间',
      align: 'center',
      dataIndex: 'createTime',
      render: (text, record) => <span>{dayjs(text).format('YYYY MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '备注',
      align: 'center',
      dataIndex: 'remark',
    },
    {
      title: '状态',
      align: 'center',
      dataIndex: 'open',
      render: (text, record) => <span>{text === 'true' ? '开启' : '关闭'}</span>,
    },
    {
      title: '操作',
      align: 'center',
      render: (text, record) => (
        <Fragment>
          <Switch onChange={() => switchOnChange(record)} checked={record.open === 'true'} />
          <Divider type="vertical" />
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onEdit(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="确定要删除这一条么?"
            onConfirm={() => {
              onDeleteItem(record);
            }}
            okText="Yes"
            cancelText="No"
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              删除
            </a>
          </Popconfirm>
        </Fragment>
      ),
    },
  ];

  useMount(() => {
    getLists();
  });

  const onDeleteItem = async (item) => {
    const { _id } = item;
    removeConfigR({ ids: _id })
      .then((res) => {
        if (res && res.success) {
          message.success('操作成功');
          getLists();
        }
      })
      .catch((e) => {});
  };

  const onEdit = (item: any) => {
    form.setFieldsValue(item);
    setState({ selectedItem: item });
    handleShowModal();
  };

  const switchOnChange = (record) => {
    const { current, pageSize } = state.pagination;
    const { _id, open } = record;
    updateConfigR(_id, { open: open === 'true' ? false : true })
      .then(({ data }) => {
        if (data && data.success) {
          message.success('操作成功');
          getLists({ current, pageSize });
        }
      })
      .catch((e) => {
        message.warn('操作失败');
      });
  };

  const getLists = async () => {
    setState({
      loading: true,
    });
    const res = await getConfigR();
    if (res.success) {
      const { data = [] } = res;
      setState({
        lists: rebuildDataWithKeySpecial(data),
        loading: false,
      });
    }
  };

  const handleTableChange = () => {};

  const handleCancel = () => {
    form.resetFields();
    setState({
      showModal: false,
    });
  };

  const handleShowModal = () => {
    setState({
      showModal: true,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { selectedItem } = state;
    form
      .validateFields()
      .then((values) => {
        if (values) {
          setState({
            loading: true,
          });
          if (selectedItem) {
            const { id } = selectedItem;
            updateConfigR(Object.assign({}, values, { id })).then((res) => {
              if (res && res.success) {
                message.success('操作成功');
                getLists();
                setState({
                  showModal: false,
                });
              }
            });
          } else {
            createConfigR(values)
              .then((res) => {
                if (res && res.success) {
                  message.success('添加成功');
                  getLists();
                  setState({
                    showModal: false,
                  });
                } else {
                  message.warn(res.msg.tostring());
                  setState({
                    loading: false,
                  });
                }
              })
              .catch((e) => {
                message.warn('添加失败');
                setState({
                  loading: false,
                });
              });
          }
        }
      })
      .catch((e) => {});
  };

  const openModal = () => {
    handleShowModal();
    setState({
      selectedItem: null,
    });
    form.setFieldsValue({ value: { a: 1 } });
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const { lists, pagination, loading, showModal } = state;
  return (
    <div className="my-component">
      <Button
        onClick={() => {
          openModal();
        }}
      >
        创建配置
      </Button>
      <Table
        dataSource={lists}
        columns={columns}
        pagination={pagination}
        onChange={handleTableChange}
        loading={loading}
      />
      <Modal
        title="创建配置"
        visible={showModal}
        width="80%"
        onOk={handleSubmit}
        onCancel={handleCancel}
        destroyOnClose
      >
        <Form {...formItemLayout} form={form}>
          <Form.Item
            label="配置标识"
            name="label"
            rules={[{ required: true, message: '必须唯一' }]}
          >
            <Input placeholder="必须唯一" />
          </Form.Item>
          <Form.Item label="配置值" name="value" rules={[{ required: true, message: '配置值' }]}>
            <Editor />
          </Form.Item>
          <Form.Item label="是否立即启用" name="open" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="备注" name="remark" rules={[{ required: true, message: '备注' }]}>
            <Input placeholder="备注怕你忘记" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SettingConfigCenter;
