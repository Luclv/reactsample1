import { Button, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../datasource/fetch-data';
import { TransactionModel } from '../../models/transaction';

interface RouteParams {
    id: string
}

export default function EditTransaction() {
  let params = useParams<RouteParams>();

  const [transaction, setTransaction] = useState<TransactionModel | null>(null);
  const [saveState, setSaveState] = useState<{
    id: number;
    body: string;
  } | null>(null);
  useEffect(() => {
    (async () => {
      try {
        console.log(params);
        var url = 'http://localhost:3000/transactions/'+ params.id;
        const data = await fetchData(url);
        setTransaction(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!saveState) {
        return;
      }
      try {
        var url = 'http://localhost:3000/transactions/'+ params.id;
        const data = await fetchData(url, {
          method: 'PATCH',
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
      id: transaction!.id,
      body: JSON.stringify(args),
    });
  }

  function onFinishFailed(...args: any) {
    console.log(args);
  }
  return (
    <>
      <div>Edit Transaction</div>
      {transaction ? (
        <div>
          <FormEdit
            initialValues={transaction}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export { EditTransaction };

interface FormEditProps {
  initialValues: TransactionModel;
  onFinish: (formValue: any) => void;
  onFinishFailed: (error: any) => void;
}
function FormEdit(props: FormEditProps) {
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
      initialValues={props.initialValues}
      onFinish={props.onFinish}
      onFinishFailed={props.onFinishFailed}
    >
      <Form.Item label='Subject' name='subject'>
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
