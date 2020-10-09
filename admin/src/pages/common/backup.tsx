import React from "react";
import { useSetState, useMount } from "ahooks";
import { PageContainer } from '@ant-design/pro-layout';
import { Table, message, Button, Modal, Form, Input, Switch, InputNumber, Space, Popconfirm } from 'antd'
import { backUpR } from '@/services'
export default () => {
    const backFn = () => {
        backUpR().then(res => {

        })

    }
    return (
        <PageContainer>
            <Button type="primary" onClick={backFn}>add</Button>
        </PageContainer >
    );
}
