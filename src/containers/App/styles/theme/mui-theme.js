import getMuiTheme from 'material-ui/styles/getMuiTheme';

/* references - https://github.com/mui-org/material-ui/blob/master/src/styles/getMuiTheme.js */

export default getMuiTheme({
	palette: {
		primary1Color: 'organge'
	},
  appBar: {
    height: 75,
    color: '#f4f3ef',
    textColor: 'black'
  },
   tabs: {
    backgroundColor: '#f4f3ef',
    textColor: 'black',
    selectedTextColor: '#0096ef'
  },
  raisedButton: {
  	textColor: 'white',
  	primaryColor: '#0096ef',
  	secondaryColor: '#ff4081'
  },
  flatButton: {
  	textColor: 'white',
  	primaryColor: '#0096ef',
  	secondaryColor: '#ff4081'
  },
  floatingActionButton: {
  	textColor: 'white',
  	primaryColor: '#0096ef',
  	secondaryColor: '#ff4081'
  }
});
