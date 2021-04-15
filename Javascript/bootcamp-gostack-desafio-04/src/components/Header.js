import React, { Component } from 'react';

import Logo from '../assets/Logo.png';

class Header extends Component {

  state = {};

  render() {
    return ( 
      <header>
        <nav>
          <img src={Logo} alt="Logo do Facebook"/>
          <div>
            <span>Meu Perfil</span>
            <i className="material-icons">account_circle</i>
          </div>
        </nav>
      </header>
      
    )
  }
}

export default Header;