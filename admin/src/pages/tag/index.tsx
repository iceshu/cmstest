import React from "react";
import { useSetState, useMount } from "ahooks";
import { PageContainer } from '@ant-design/pro-layout';
import { Table, message, Button, Modal, Form, Input, Switch, InputNumber, Space, Popconfirm } from 'antd'
import { getTagR, createTagR, updateTagR, removeTagR } from '@/services'
export default () => {
    const [state, setState] = useSetState({
        dataSource: [],
        visible: false,
        editItem: null
    });
    let editItem: any = null
    const [form] = Form.useForm();

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    const getTagFn = () => {
        getTagR().then((res: any) => {
            if (res.success) {
                setState({ dataSource: res.data })
            }
        })

    }
    useMount(() => {
        getTagFn()
    })
    const showAddModal = () => {
        setState({
            visible: true
        })
    }
    const onEditItem = (item: any) => {
        form.setFieldsValue(item)
        setState({
            visible: true,
            editItem: item
        })
    }
    const onDeleteItem = (item: any) => {
        const { id } = item
        removeTagR({ ids: id }).then(res => {
            if (res && res.success) {
                message.success('删除成功')
                getTagFn()
            }
            else {
                message.warning('删除失败')
            }
        }).catch(e => {
            message.warning('删除失败')
        })
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => onEditItem(record)}>edit</Button >
                    <Popconfirm title="Are you sure delete this ?"
                        onConfirm={() => {
                            onDeleteItem(record)
                        }}
                    ><Button type="link" > Delete</Button ></Popconfirm>
                </Space >
            ),
        },
    ];
    const onFinish = () => {

    }
    const onCancel = () => {
        form.resetFields()
        setState({ visible: false, editItem: null })
    }
    const onOkFn = () => {
        form
            .validateFields()
            .then(values => {
                const { editItem } = state;
                const requestfn = editItem ? updateTagR : createTagR
                const postData = editItem ? Object.assign({}, editItem, values) : values
                requestfn(postData).then(res => {
                    if (res && res.success) {
                        message.success('操作成功')
                        form.resetFields();
                        onCancel()
                        getTagFn()
                    }
                })
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    }

    return (
        <PageContainer>
            <Button type="primary" onClick={showAddModal}>add</Button>
            <Table dataSource={state.dataSource} columns={columns} rowKey='id' />
            <Modal
                title="ADD"
                visible={state.visible}
                onOk={onOkFn}
                onCancel={onCancel}
            >
                <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    onFinish={onFinish}
                >
                    <Form.Item label="名称" name="name" rules={[{ required: true, message: '请输tag名称' }]}>
                        <Input placeholder="name" />
                    </Form.Item>
                </Form>
            </Modal>
        </PageContainer >
    );
};
