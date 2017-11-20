import React                   from 'react';
import { AppBar as MuiAppBar } from 'material-ui';

/* component styles */
import { styles } from './styles.scss';

export default function AppBar(props) {
  return (
    <div className={styles}>
      <MuiAppBar {...props} className="app-bar" />
    </div>
  );
}
