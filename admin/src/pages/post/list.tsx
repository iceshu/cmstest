import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Popconfirm } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { TableListItem } from './data.d';
import { getPostsR, removePostR } from '@/services';
import * as _ from 'lodash'
import { history } from 'umi'


/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;
    const ids = selectedRows.map((e: any) => e.id).join(',')
    try {
        await removePostR({
            ids
        });
        hide();
        message.success('删除成功，即将刷新');
        return true;
    } catch (error) {
        hide();
        message.error('删除失败，请重试');
        return false;
    }
};

const TableList: React.FC<{}> = () => {
    const actionRef = useRef<ActionType>();
    const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
    const columns: ProColumns<TableListItem>[] = [
        {
            title: '文章标题',
            dataIndex: 'title',
            rules: [
                {
                    required: true,
                    message: '规则名称为必填项',
                },
            ],

        },
        {
            title: '类别',
            render: (value, record: any) => (
                <>
                    {_.get(record, 'categories[0].name')}
                </>
            ),
        },
        {
            title: '更新时间',
            dataIndex: 'updateDate',
            valueType: 'option',
        },

        {
            title: '操作',
            valueType: 'option',
            render: (_, record: any) => (
                <>
                    <a
                        onClick={() => {
                            goToEdit(record.id)
                        }}
                    >
                        编辑
          </a>
                    <Divider type="vertical" />
                    <Popconfirm title="Are you sure delete this ?"
                        onConfirm={() => {
                            onDeleteItem(record)
                        }}
                    ><Button type="link" > 删除</Button ></Popconfirm>
                </>
            ),
        },
    ];
    const onDeleteItem = (item: any) => {
        const { id } = item
        removePostR({ ids: id }).then(res => {
            if (res && res.success) {
                message.success('删除成功')
                if (actionRef.current) {
                    actionRef.current.reload();
                }
            }
            else {
                message.warning('删除失败')
            }
        }).catch(e => {
            message.warning('删除失败')
        })
    }

    const fetchData = async (params: object, sort: string, filter: any) => {
        const res = await getPostsR({ ...params, sort, filter });
        const { data, success } = res;
        return {
            data: data.docs,
            total: data?.pageInfo?.total,
            success
        }
    }
    const goToEdit = (id = '') => {
        const ruoterobj: any = {
            pathname: '/post/add',
        }
        if (id) {
            ruoterobj.query = {
                id
            }
        }
        history.push(ruoterobj)
    }

    return (
        <PageContainer>
            <ProTable<TableListItem>
                headerTitle="文章列表"
                actionRef={actionRef}
                rowKey="id"
                toolBarRender={() => [
                    <Button type="primary" onClick={() => goToEdit()}>
                        <PlusOutlined /> 新建
          </Button>,
                ]}
                request={fetchData}
                columns={columns}
                rowSelection={{
                    onChange: (_, selectedRows) => setSelectedRows(selectedRows),
                }}
            />
            {selectedRowsState?.length > 0 && (
                <FooterToolbar
                    extra={
                        <div>
                            已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项&nbsp;&nbsp;
                        </div>
                    }
                >
                    <Button
                        onClick={async () => {
                            await handleRemove(selectedRowsState);
                            setSelectedRows([]);
                            actionRef.current?.reloadAndRest();
                        }}
                    >
                        批量删除
          </Button>
                </FooterToolbar>
            )}
        </PageContainer>
    );
};

export default TableList;
