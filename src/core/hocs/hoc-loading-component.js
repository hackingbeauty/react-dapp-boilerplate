import React             from 'react'
import PropTypes         from 'prop-types'
import { connect }       from 'react-redux'
import ProgressIndicator from 'components/ProgressIndicator'

const propTypes = {
  audio: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool
}

const defaultProps = {
  loading: false
}

export function enhanceComponent(WrappedComponent, listKey) {
  class LoadingComponent extends React.Component {
    render() {
      const { audio } = this.props
      const isLoading = audio[listKey] === null

      return (
        <div>
          {isLoading && <ProgressIndicator className="main-loader" size={60} color="secondary" />}
          <div>
            <WrappedComponent {...this.props} />
          </div>
        </div>
      )
    }
  }

  LoadingComponent.propTypes = propTypes
  LoadingComponent.defaultProps = defaultProps

  return LoadingComponent
}

export const mapStateToProps = (state) => {
  return {
    audio: state.audio
  }
}

export default function loadingComponent(listKey) {
  return function enhance(WrappedComponent) {
    return connect(
      mapStateToProps
    )(enhanceComponent(WrappedComponent, listKey))
  }
}
