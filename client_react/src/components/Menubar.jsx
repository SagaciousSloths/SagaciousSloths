import React from 'react';

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
    };
  }

  render() {
    var context = this;
    return (
      <div className="menuBar">
        <ul>
          <li className="leftAlign">FamiliHR</li>
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
