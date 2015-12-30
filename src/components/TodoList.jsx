var React = require('react');

var TodoList = React.createClass({
  render: function() {
    var _this = this;
    var createItem = function(item, index) {
      return (
        <li key={ index }>
          { item.text }
          <i className="fa fa-minus-circle" onClick={ _this.props.removeItem.bind(null, item['.key']) }
                style={{ color: '#DC4E41', marginLeft: '10px', cursor: 'pointer' }}></i>
        </li>
      );
    };
    return (
      <div>
        <h3>Items:</h3>
        <ul>{ this.props.items.map(createItem) }</ul>
      </div>
    );
  }
});

module.exports = TodoList;
