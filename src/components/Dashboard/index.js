import { Layout } from 'antd';
import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { menuRoutes, siteRoutes } from 'routes';
import SideBar from 'components/SideBar';
import AppHeader from 'components/AppHeader';
import NotFound from 'pages/notFound';

const { Content } = Layout;

export default observer(() => {
  const [collapsed, setCollapsed] = useState(false);
  const mergedRoutesList = [...siteRoutes, ...menuRoutes];

  const handleCollapse = () => setCollapsed(!collapsed);
  const getRoute = route => (
    <Route exact={route.exact === true} path={route.path} key={route.key} component={route.component} />
  );

  return (
    <BrowserRouter>
      <Layout>
        <SideBar collapsed={collapsed} menuRoutesList={menuRoutes} onCollapse={handleCollapse} />
        <Layout
          style={{
            minHeight: '100vh',
            marginLeft: collapsed ? 80 : 200,
            position: 'relative',
          }}
        >
          <AppHeader />
          <Content
            style={{
              margin: `24px 16px`,
              overflowX: 'hidden',
              height: '100%',
            }}
          >
            <Switch>
              {mergedRoutesList.map(route => (route.nested ? route.routes.map(getRoute) : getRoute(route)))}
              <Route component={NotFound} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
});
