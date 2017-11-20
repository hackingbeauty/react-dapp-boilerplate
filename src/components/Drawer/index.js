import React                   from 'react';
import { Drawer as MuiDrawer } from 'material-ui';

/* component styles */
import { styles } from './styles.scss';

export default function Drawer(props) {
  return (
    <div className={styles}>
      <MuiDrawer {...props}>
        {props.content}
      </MuiDrawer>
    </div>
  );
}