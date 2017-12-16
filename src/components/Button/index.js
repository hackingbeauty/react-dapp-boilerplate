/**
 * Button - A common button
 */

import React                    from 'react';
import PropTypes                from 'prop-types';
import { FlatButton,
         RaisedButton,
         FloatingActionButton,
         IconButton }           from 'material-ui';

/* component styles */
import { styles } from './styles.scss';

export default function Button(props) {
  const buttonElem = createButton(props);
  return (
    <div className={styles}>
      {buttonElem}
    </div>
  );
}

function createButton(props) {
  const {
    label,
    className,
    onTouchTap,
    icon,
    disabled,
    primary,
    secondary,
    id
  } = props;

  let buttonElem;
  const finalClassName = `btn ${className} ${secondary ? 'secondary' : 'primary'}`

  if(props.floating) {
    buttonElem = <FloatingActionButton
                  label={label}
                  id={id}
                  onTouchTap={onTouchTap}
                  icon={icon}
                  disabled={disabled}
                  className={`${finalClassName}`}
                  secondary={true}>
                  {props.icon}
                 </FloatingActionButton>

  } else if(props.floating && props.secondary) {
    buttonElem = <FloatingActionButton
                  label={label}
                  id={id}
                  onTouchTap={onTouchTap}
                  icon={icon}
                  disabled={disabled}
                  secondary={true}
                  className={`${finalClassName}`}/>

  } else if(props.iconOnly){
    buttonElem= <IconButton
                  label={label}
                  id={id}
                  onTouchTap={onTouchTap}
                  disabled={disabled}
                  className={`${finalClassName}`}
                  icon={icon}>{props.icon}</IconButton>;

  } else if(props.raised && props.secondary) {
    buttonElem = <RaisedButton
                  label={label}
                  id={id}
                  onTouchTap={onTouchTap}
                  className={`${finalClassName}`}
                  icon={icon}
                  disabled={disabled}
                  className={`${finalClassName}`}
                  secondary={true} />

  } else if(props.raised) {
    buttonElem = <RaisedButton
                  label={label}
                  id={id}
                  className={`${finalClassName}`}
                  onTouchTap={onTouchTap}
                  primary={primary}
                  secondary={secondary}
                  icon={icon}
                  className={`${finalClassName}`}
                  disabled={disabled} />
  } else if(props.flat) {
    buttonElem = <FlatButton
                  label={label}
                  id={id}
                  onTouchTap={onTouchTap}
                  className={`${finalClassName}`}
                  icon={icon}
                  disabled={disabled} />
  } else {
    buttonElem = <FlatButton
                  label={label}
                  id={id}
                  onTouchTap={onTouchTap}
                  className={`${finalClassName}`}
                  icon={icon}
                  disabled={disabled} />
  }

  return buttonElem;
}

Button.propTypes = {
  raised   : PropTypes.bool,
  floating : PropTypes.bool,
  disabled : PropTypes.bool
};

Button.defaultProps = {
  type      : 'button',
  raised    : false,
  label     : '',
  className : 'btn',
  disabled  : false,
  primary   : true,
  secondary : false
}