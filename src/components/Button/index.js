import React                    from 'react';
import PropTypes                from 'prop-types';
import { FlatButton,
         RaisedButton,
         FloatingActionButton,
         IconButton }           from 'material-ui';

/* component styles */
import { styles } from './styles.scss';

const mainClassName = 'btn';

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
    id,
    secondary } = props;

  let buttonElem;

  if(props.floating) {
    buttonElem = <FloatingActionButton
                  label={label}
                  id={id}
                  onTouchTap={onTouchTap}
                  icon={icon}
                  disabled={disabled}
                  {...props}
                  className={`${mainClassName} ${className}`}
                  secondary={true}>
                  {props.icon}
                 </FloatingActionButton>

  } else if(props.floating && props.secondary) {
    buttonElem = <FloatingActionButton
                  label={label}
                  id={id}
                  onTouchTap={onTouchTap}
                  {...props}
                  icon={icon}
                  disabled={disabled}
                  secondary={true}
                  className={`${mainClassName} ${className}`}/>

  } else if(props.iconOnly){
    buttonElem= <IconButton
                  label={label}
                  id={id}
                  {...props}
                  onTouchTap={onTouchTap}
                  disabled={disabled}
                  className={`${mainClassName} ${className}`}
                  icon={icon}>{props.icon}</IconButton>;

  } else if(props.raised && props.secondary) {
    buttonElem = <RaisedButton
                  label={label}
                  id={id}
                  {...props}
                  onTouchTap={onTouchTap}
                  className={`${mainClassName} ${className}`}
                  icon={icon}
                  disabled={disabled}
                  className={`${mainClassName} ${className}`}
                  secondary={true} />

  } else if(props.raised) {
    buttonElem = <RaisedButton
                  label={label}
                  id={id}
                  className={`${mainClassName} ${className}`}
                  onTouchTap={onTouchTap}
                  primary={primary}
                  secondary={secondary}
                  {...props}
                  icon={icon}
                  className={`${mainClassName} ${className}`}
                  disabled={disabled} />
  } else if(props.flat) {
    buttonElem = <FlatButton
                  label={label}
                  id={id}
                  onTouchTap={onTouchTap}
                  {...props}
                  className={`${mainClassName} ${className}`}
                  icon={icon}
                  disabled={disabled} />
  } else {
    buttonElem = <FlatButton
                  label={label}
                  id={id}
                  onTouchTap={onTouchTap}
                  {...props}
                  className={`${mainClassName} ${className}`}
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
  className : mainClassName,
  disabled  : false,
  primary   : true,
  secondary : false
}