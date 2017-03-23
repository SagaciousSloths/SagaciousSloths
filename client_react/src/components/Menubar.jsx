import React from 'react';
import $ from 'jquery';

class Menubar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0
    };
  }

  handleMenuSelect(index) {
    this.setState({
      index: index
    });

    if (this.props.items[index] === 'Dashboard') {
      this.props.loadDashboard();
    } else if (this.props.items[index] === 'Log Out') {
      this.logOut();
    };
  }

  logOut() {
    $.ajax({
      url: '/logout',
      method: 'GET',
      success: function(data) {
        document.write(data);
      }.bind(this),
      error: function(err) {
        console.error('error logging out', err);
      }
    });
  }

  render() {
    var context = this;
    return (
      <div className="menuBar">
        <ul>
          <li className="logo">FamiliHR</li>
          {
            context.props.items.map(function(item, index){
              return <li className="rightAlign" onClick={context.handleMenuSelect.bind(context, index)}>{item}</li>;
            })
          }
        </ul>
      </div>
    );
  }
};

export default Menubar;
