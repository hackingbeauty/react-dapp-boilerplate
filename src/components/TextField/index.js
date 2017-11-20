import React, { Component }          from 'react';
import PropTypes                     from 'prop-types';
import { TextField as MUITextField } from 'material-ui';

/* component styles */
import { styles } from './styles.scss';

class TextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    }
  }

  onChange=(event) => {
    this.setState({
      inputValue: event.target.value
    });
  }

  render() {
    const { title, onBlur } = this.props;
    const { inputValue } = this.state;
    let value;

    if(inputValue !== ''){
      value = inputValue;
    } else {
      value = title;
    }

    return (
      <div className={styles}>
        <MUITextField
          {...this.props}
          onChange={this.onChange}
          className="text-field"
          onBlur={onBlur}
          value={value} />
      </div>
    );
  }

}

TextField.propTypes = {
  hintText: PropTypes.string,
  type    : PropTypes.string
};

TextField.defaultProps = {
  type: 'text'
}

export default TextField;