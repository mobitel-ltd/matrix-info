import React from 'react';

import { Result } from 'antd';

const NotFound = () => {
  return <Result status="404" title="404" subTitle="Извините, данной страницы не существует" />;
};

export default NotFound;
