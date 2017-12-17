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

  constructor(props) {
    super(props)
    const { files  } = props
    
    this.state = {
      files: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.files !== this.props.files) {
      this.setState({ files: nextProps.files })
    }
  }

  getFileList(files) {
    console.log('THE FILES ARE: ', files)
    const list = files.map(file =>
			<li key={file.name}>
				{`${file.name} of size ${file.size} and type ${file.type}`}
			</li>
		)
		
    return <ul id="file-list">{list}</ul>
	}

  showUploadDialogBox=() => {
    const { files } = this.props
    
    if(files.length === 0) {
      this.inputElement.click()
    }
  }

  handleFileUpload=(evt) => {
    const files = evt.target.files
    const { onDrop } = this.props

    if(files.length) {
      onDrop()
      this.setState({ files: [files[0]] })
    }
  }

  getHelperText=() => {
    let helperText
    const { files } = this.state
    const isActive = this.isActive()

    if(isActive) {
      helperText = 'Release to drop'
    } else if (!isActive && files.length === 0) {
      helperText = 'Drag file here'
    }

    return <span>{helperText}</span>
  }

  isActive=() => {
    const { canDrop, isOver } = this.props
    return canDrop && isOver
  }

  render() {
    const { canDrop, isOver, connectDropTarget} = this.props
    const { files } = this.state
    const isActive = this.isActive()
    const fileList = this.getFileList(files)
    const containerClassName= isActive ? 'drop' : ''
    const helperText = this.getHelperText()

    return connectDropTarget(
			<div id="upload-container" className={containerClassName}>
	       <div id="upload-actions">
	        <Icon icon="upload" className="upload-icon" />
	        <Button
            label="Choose photo to upload"
            raised={true}
            disabled={files.length} 
            onTouchTap={this.showUploadDialogBox} />
          <input 
            name="myFile" 
            type="file" 
            ref={input => this.inputElement = input} 
            onChange={this.handleFileUpload} />
          {fileList}
          {helperText}
	      </div>
      </div>
		)
  }
}