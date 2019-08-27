import React from 'react';
import { Tooltip, Icon } from 'antd';
import './index.less';

const BlockChecbox = ({ value, onChange, list }) => (
  <div className="setting-drawer-blockChecbox" key={value}>
    {list.map(item => (
      <Tooltip title={item.title} key={item.key}>
        <div className="setting-drawer-blockChecbox-item" onClick={() => onChange(item.key)}>
          <img src={item.url} alt={item.key} />
          <div
            className="setting-drawer-blockChecbox-selectIcon"
            style={{
              display: value === item.key ? 'block' : 'none',
            }}
          >
            <Icon type="check" />
          </div>
        </div>
      </Tooltip>
    ))}
  </div>
);

export default BlockChecbox;
