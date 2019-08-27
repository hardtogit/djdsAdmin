import React from 'react';
import styles from './Page.less';
export default(props)=>{
  return(
    <div className={props.className} >
      {props.searchBar&&<div className={styles.searchBar} style={props.searchStyle}>
        {props.searchBar}
      </div>}
      <div className={styles.table} style={props.tableStyle}>
        {props.table}
      </div>
      {props.children}
    </div>
    );
};
