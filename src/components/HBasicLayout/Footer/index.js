import React from 'react';
import { Layout } from 'antd';
import GlobalFooter from './GlobalFooter';

const { Footer } = Layout;
const FooterView = ({ footer = {}, renderFooter }) => {
  const { title, content } = footer;

  return (
    <Footer style={{ padding: 0 }}>
      {renderFooter ? renderFooter() : (
        <GlobalFooter
          links={[
            {
              key: 'title',
              title,
              href: '',
              blankTarget: true,
            },
          ]}
          copyright={content}
        />
      )}
    </Footer>
  );
};

export default FooterView;
