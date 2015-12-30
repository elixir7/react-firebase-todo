var React = require('react');
var TodoList = require('./TodoList.jsx');

var TodoApp = React.createClass({
  mixins: [ReactFireMixin],

  getInitialState: function() {
    return {
      items: [],
      text: ''
    };
  },

  componentWillMount: function() {
    var firebaseRef = new Firebase('https://elixir7-firebase-test.firebaseio.com/items/');
    this.bindAsArray(firebaseRef.limitToLast(25), 'items');
  },

  onChange: function(e) {
    this.setState({text: e.target.value});
  },

  removeItem: function(key) {
    var firebaseRef = new Firebase('https://elixir7-firebase-test.firebaseio.com/items/');
    firebaseRef.child(key).remove();
  },

  handleSubmit: function(e) {
    e.preventDefault();
    if (this.state.text && this.state.text.trim().length !== 0) {
      this.firebaseRefs['items'].push({
        text: this.state.text
      });
      this.setState({
        text: ''
      });
    }
  },

  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <h1>Todo List Test with FireBase</h1>
            <TodoList items={ this.state.items } removeItem={ this.removeItem } />
            <form onSubmit={ this.handleSubmit }>
              <input onChange={ this.onChange } value={ this.state.text } />
              <button>{ 'Add #' + (this.state.items.length + 1) }</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = TodoApp;
