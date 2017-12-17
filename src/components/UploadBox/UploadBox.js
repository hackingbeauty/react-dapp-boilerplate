import React, { Component } 												from 'react'
import PropTypes 																		from 'prop-types'
import { DragDropContext, DragDropContextProvider } from 'react-dnd'
import HTML5Backend, { NativeTypes } 								from 'react-dnd-html5-backend'
import DropTarget							 											from './DropTarget'

import { styles } from './styles.scss'

@DragDropContext(HTML5Backend)
export default class UploadBox extends Component {
  constructor(props) {
    super(props);
    this.state = { droppedFiles: [] }
  }

  handleFileDrop= (item, monitor) => {
    const { onDrop } = this.props
    
    if (monitor) {
      const droppedFiles = monitor.getItem().files
      this.setState({ droppedFiles })
    }
    
    onDrop()
  }

  render() {
    const { FILE } = NativeTypes
    const { droppedFiles } = this.state

    return (
    	<DragDropContextProvider backend={HTML5Backend}>
        <div className={styles}>
    			<DropTarget
    				accepts={[FILE]}
    				onDrop={this.handleFileDrop}
    				files={droppedFiles} />
    		</div>
    	</DragDropContextProvider>
    )
	}
}
