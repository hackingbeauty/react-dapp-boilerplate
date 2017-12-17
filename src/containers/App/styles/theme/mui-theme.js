import getMuiTheme from 'material-ui/styles/getMuiTheme';
const styleVariables = require('sass-extract-loader!../variables.scss');

const { 
  $beige,
  $black,
  $lightBlue,
  $pink,
  $white
} = styleVariables.global

/* 
 * Reference
 * https://github.com/mui-org/material-ui/blob/master/src/styles/getMuiTheme.js 
 */

export default getMuiTheme({
  appBar: {
    height: 75,
    color: $beige.value.hex,
    textColor: $black.value.hex
  },
  tabs: {
    backgroundColor: $beige.value.hex,
    textColor: $black.value.hex,
    selectedTextColor: $lightBlue.value.hex
  },
  raisedButton: {
    textColor: $white.value.hex,
    primaryColor: $lightBlue.value.hex,
    secondaryColor: $pink.value.hex
  },
  flatButton: {
    textColor: $white.value.hex,
    primaryColor: $lightBlue.value.hex,
    secondaryColor: $pink.value.hex
  },
  floatingActionButton: {
    textColor: $white.value.hex,
    primaryColor: $lightBlue.value.hex,
    secondaryColor: $pink.value.hex
  }
});
