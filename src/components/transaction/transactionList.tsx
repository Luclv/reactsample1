import React from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';
import { TransactionModel } from '../../models/transaction';
import { Link } from 'react-router-dom';

interface Props {
  trans: TransactionModel[];
}

export function TransactionList(props: Props) {

  const { trans } = props;

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Requested Date',
      dataIndex: 'requestedDate',
      key: 'requestedDate',
    },
    {
        title: 'Latest Update',
        dataIndex: 'latestUpdate',
        key: 'latestUpdate',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text: any, record: any) => (
            <span>
              <a href={'/transactions/'+ record.id}>Open</a>
            </span>
          ),
    },
  ];
  
  return (
      <div>
            <Table columns={columns} dataSource={trans} />
      </div>
  );
}
