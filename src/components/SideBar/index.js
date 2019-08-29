import React, { Component } from 'react';
import { Icon, Layout, Menu } from 'antd';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { getMenuRoute } from 'routes';

const { SubMenu } = Menu;
const { Sider } = Layout;

class SideBar extends Component {
  state = {
    selected: '-1',
  };

  componentDidMount() {
    const { history } = this.props;
    this.checkRoute(history.location.pathname);
    history.listen(({ pathname }) => {
      this.checkRoute(pathname);
    });
  }

  mapItems = () => {
    const { menuRoutesList } = this.props;
    const getMenuItem = route => (
      <Menu.Item key={route.key}>
        {route.icon && <Icon type={route.icon} />}
        <span className="nav-text">{route.subTitle}</span>
        <Link to={route.path} />
      </Menu.Item>
    );
    return menuRoutesList.map(route => {
      if (route.nested) {
        return route.hasAccess ? (
          <SubMenu
            key={route.nested}
            title={
              <>
                {route.icon && <Icon type={route.icon} />}
                <span className="nav-text">{route.subTitle}</span>
              </>
            }
          >
            {route.routes.map(getMenuItem)}
          </SubMenu>
        ) : null;
      }
      return getMenuItem(route);
    });
  };

  checkRoute = pathname => {
    const route = getMenuRoute(pathname);
    let newSelectedState = '-1';
    const { selected } = this.state;
    if (route !== undefined) {
      if (selected !== route.key) newSelectedState = route.key;
      else newSelectedState = selected;
    }
    this.setState({ selected: newSelectedState });
  };

  render() {
    const { collapsed, onCollapse } = this.props;
    const { selected } = this.state;
    return (
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
      >
        <Link to="/">
          <div className="dashboard-logo" />
        </Link>
        <Menu theme="dark" mode="inline" selectedKeys={[selected]}>
          {this.mapItems()}
        </Menu>
      </Sider>
    );
  }
}

SideBar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  onCollapse: PropTypes.func.isRequired,
};

export default withRouter(SideBar);
