import React from 'react';
import ReactDOM from 'react-dom';

export default class TextHighlight extends React.Component {

  componentDidMount() {
    this.updateDOM();
  }

  componentDidUpdate() {
    this.updateDOM();
  }

  updateDOM() {
    var el = ReactDOM.findDOMNode(this.refs.text);
    el.innerHTML = this.mark(
      this.props.highlight,
      this.props.text,
      this.props.markTag,
      this.props.caseSensitive
    );
  }

  mark(val, str, markTag, caseSensitive) {
    val = val.split(' ') || [''];
    let newStr = str;

    if (val.length === 0) {
      return str;
    }

    val.filter(v => v !== '').forEach((v) => {
        var escape = v.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
        var tagStr = '<mark>$&</mark>';

        markTag = markTag || 'mark';

        newStr = newStr.replace(
          RegExp(escape, 'gi'),
          tagStr
        );
    });

    return newStr;
  }

  render() {
    return (
      <span className="TextHighlight" ref="text"></span>
    );
  }
}

TextHighlight.propTypes = {
  highlight: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
  markTag: React.PropTypes.string,
  caseSensitive: React.PropTypes.bool
};

TextHighlight.defaultProps = {
  highlight: null,
  text: null,
  markTag: 'mark',
  caseSensitive: false
};
