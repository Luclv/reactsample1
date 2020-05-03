import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { TransactionModel } from '../../models/transaction';
import { fetchData } from '../../datasource/fetch-data';

export default function AddTransaction() {
    const [saveState, setSaveState] = useState<{
    body: string;
  } | null>(null);
  
  useEffect(() => {
    (async () => {
      if (!saveState) {
        return;
      }
      try {
        const data = await fetchData('http://localhost:3000/transactions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: saveState.body,
        });
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [saveState]);

  function onFinish(args: any) {
    console.log(args);

    setSaveState({
      body: JSON.stringify(args),
    });
  }

  function onFinishFailed(...args: any) {
    console.log(args);
  }
  return (
    <>
      <div>Add Transaction</div>
      <div>
          <FormAdd
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          />
        </div>
    </>
  );
}

export {AddTransaction};

interface FormAddProps {
  onFinish: (formValue: any) => void;
  onFinishFailed: (error: any) => void;
}
function FormAdd(props: FormAddProps) {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  return (
    <Form
      {...layout}
      name='basic'
      onFinish={props.onFinish}
      onFinishFailed={props.onFinishFailed}
    >
      <Form.Item label='Subject' name='subject'>
        <Input />
      </Form.Item>

      <Form.Item label='Requested Date' name='requestedDate'>
        <Input />
      </Form.Item>

      <Form.Item label='Latest Update' name='latestUpdate'>
        <Input />
      </Form.Item>

      <Form.Item label='Status' name='status'>
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
