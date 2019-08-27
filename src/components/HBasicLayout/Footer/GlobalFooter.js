import React from 'react';
import classNames from 'classnames';
import './index.less';

const GlobalFooter = ({ className, links, copyright }) => {
  const clsString = classNames('basic-layout-globalFooter', className);
  return (
    <div className={clsString}>
      {links && (
        <div className="basic-layout-globalFooter-links">
          {links.map(link => (
            <a
              key={link.key}
              title={link.key}
              target={link.blankTarget ? '_blank' : '_self'}
              href={link.href}
            >
              {link.title}
            </a>
          ))}
        </div>
      )}
      {copyright && <div className="basic-layout-globalFooter-copyright">{copyright}</div>}
    </div>
  );
};

export default GlobalFooter;
