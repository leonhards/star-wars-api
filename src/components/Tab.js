import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tab extends Component {
  static propTypes = {
    initCap: PropTypes.func.isRequired,
    onTabLabel: PropTypes.func.isRequired,
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  onClick = () => {
    const { label, onClick, onTabLabel, onMobile } = this.props;
    onClick(label);
    onTabLabel(label);
    onMobile(label);
  }

  render() {
    const {
      onClick,
      props: {
        initCap,
        activeTab,
        label,
        icon
      },
    } = this;

    let className = 'tab-list-item';

    if (activeTab === label) {
      className += ' tab-list-active';
    } 

    return (
      <li
        className={className}
        onClick={onClick}
      >
        <i className={`fa ${icon}`} aria-hidden="true"></i>&nbsp;&nbsp;{initCap(label)}
      </li>
    );
  }
}

export default Tab;