import getMuiTheme from 'material-ui/styles/getMuiTheme';

const styleVariables = require('sass-extract-loader!../variables.scss');

const { 
  $beige,
  $black,
  $lightBlue,
  $pink,
  $white
} = styleVariables.global

/* references - https://github.com/mui-org/material-ui/blob/master/src/styles/getMuiTheme.js */

export default getMuiTheme({
  appBar: {
    height: 75,
    color: $beige,
    textColor: $black
  },
   tabs: {
    backgroundColor: $beige,
    textColor: $black,
    selectedTextColor: $lightBlue
  },
  raisedButton: {
  	textColor: $white,
  	primaryColor: $lightBlue,
  	secondaryColor: $pink
  },
  flatButton: {
  	textColor: $white,
  	primaryColor: $lightBlue,
  	secondaryColor: $pink
  },
  floatingActionButton: {
  	textColor: $white,
  	primaryColor: $lightBlue,
  	secondaryColor: $pink
  }
});
