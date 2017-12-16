import React, { Component } from 'react'
import { DragDropContext, DragDropContextProvider } from 'react-dnd'
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend'
import UploadBox from 'components/UploadBox'

/* component styles */
import { styles } from './styles.scss';

@DragDropContext(HTML5Backend)
export default class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = { droppedFiles: [] }
  }

  handleFileDrop= (item, monitor) => {
    if (monitor) {
      const droppedFiles = monitor.getItem().files
      this.setState({ droppedFiles })
    }
  }

  render() {
    const { FILE } = NativeTypes
    const { droppedFiles } = this.state

    return (
      <div className={styles}>   
        <div id="home-view"> 
          <DragDropContextProvider backend={HTML5Backend}>
            <div>
              <UploadBox accepts={[FILE]} onDrop={this.handleFileDrop} files={droppedFiles} />
            </div>
          </DragDropContextProvider>
        </div>
      </div>
    );
  }
}
