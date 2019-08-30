import React from 'react';
import { Layout, PageHeader } from 'antd';
import { withRouter } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { getRoute } from '../../routes';

const useStyles = createUseStyles(() => ({
  header: {
    background: '#fff',
    padding: 0,
    position: 'sticky',
    top: 0,
    zIndex: 10,
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
  },
}));

const { Header } = Layout;

const AppHeader = props => {
  const {
    location: { pathname },
  } = props;
  const classes = useStyles();
  const route = getRoute(pathname);

  if (route === undefined) {
    return null;
  }

  return (
    <Header className={classes.header}>
      <PageHeader title={route.title} subTitle={route.subTitle} />
    </Header>
  );
};

export default withRouter(AppHeader);
