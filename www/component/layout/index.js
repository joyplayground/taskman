import React from 'react';

import './index.css';

export default function Layout(props) {
  return (
    <div className="layout">
      <div className="sidebar">{props.sidebar}</div>
      <div className="content">{props.children}</div>
    </div>
  );
}
