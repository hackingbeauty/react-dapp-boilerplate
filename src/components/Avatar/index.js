import React                   from 'react'
import { Avatar as MuiAvatar } from '@material-ui/core'
import { styles }              from './styles.scss'

const Avatar = (props) => {
  const theProps = props
  return (
    <div className={styles}>
      <MuiAvatar {...theProps} />
    </div>
  )
}

export default Avatar
