import React from 'react';
import { observer } from 'mobx-react';
import { Form, Icon, Input, Button, Spin } from 'antd';
import 'styles/login-form.css';

const LoginForm = observer(({ form: { getFieldDecorator, validateFields }, user }) => {
  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        const { remember, ...data } = values;
        user.start(data);
      }
    });
  };
  return (
    <Spin spinning={user.fetching} tip={user.fetchingTip} size="large">
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Введите свой логин!' }],
          })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Логин" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Введите пароль!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Пароль"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
});

const LoginWrapped = observer(Form.create({ name: 'normal_login' })(LoginForm));

export default ({ user }) => {
  return (
    <div className="login-content-wrapper">
      <LoginWrapped user={user} />
    </div>
  );
};
