import React, { Component } 							 from 'react'
import PropTypes 													 from 'prop-types'
import { DropTarget as ReactDnDDropTarget} from 'react-dnd'
import Button 														 from 'components/Button'
import Icon 															 from 'components/Icon'

const boxTarget = {
  drop(props, monitor) {
    if (props.onDrop) {
      props.onDrop(props, monitor)
	  }
	}
}

@ReactDnDDropTarget(props => props.accepts, boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
export default class DropTarget extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver 					 : PropTypes.bool.isRequired,
    canDrop 				 : PropTypes.bool.isRequired,
    accepts 				 : PropTypes.arrayOf(PropTypes.string).isRequired,
    onDrop 					 : PropTypes.func
  }

  getFileList(files) {
    const list = files.map(file => (
			<li key={file.name}>
				{`${file.name} of size ${file.size} and type ${file.type}`}
			</li>
		))
		return <ul>{list}</ul>
	}

  render() {
    const { canDrop, isOver, connectDropTarget, files } = this.props
    const isActive = canDrop && isOver
    const fileList = this.getFileList(files)

    return connectDropTarget(
			<div id="upload-container" className={isActive ? 'drop' : ''}>
	       <div id="upload-actions">
	        <Icon icon="upload" className="upload-icon" />
	        <Button label="Choose photo to upload" raised={true} />
	        <span>{isActive ? 'Release to drop' : 'Drag file here'}</span>
	        { files.length !== 0 && fileList }
	      </div>
      </div>
		)
	}
}