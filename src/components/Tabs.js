import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';
import Search from './Search';

import '../assets/css/menu.css';

class Tabs extends Component {
  static propTypes = {
    initCap: PropTypes.func.isRequired,
    onTabLabel: PropTypes.func.isRequired,
    children: PropTypes.instanceOf(Array).isRequired,
    searchText: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.props.children[0].props.label
    };
  }

  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab });
  }

  mobileMenu = () => {
    var x = document.getElementById("navTabs");
    if (x.className === "tab-list") {
      x.className += " responsive";
    } else {
      x.className = "tab-list";
    }
  }

  render() {
    const {
      onClickTabItem,
      mobileMenu,
      props: {
        initCap,
        children,
        onTabLabel,
        searchText
      },
      state: {
        activeTab,
      }
    } = this;

    return (
      <div className="tabs">
        <ul id="navTabs" className="tab-list" role='navigation'>
          <li className="tab-list-item mobileNav">
            <a href="#" className="icon" onClick={mobileMenu}>
              <i className="fa fa-bars"></i> Menu
            </a>
          </li>
          {children.map((child) => {
            const { label, icon } = child.props;

            return (
              <Tab
                key={label}
                initCap={initCap}
                activeTab={activeTab}
                label={label}
                icon={icon}
                onTabLabel={onTabLabel}
                onClick={onClickTabItem}
                onMobile={mobileMenu}
              />
            );
          })}
        </ul>

        <div className="tab-content">
          <Search searchText={searchText} />

          {children.map((child) => {
            if (child.props.label !== activeTab) return undefined;
            return child.props.children;
          })}
        </div>
      </div>
    );
  }
}

export default Tabs;
