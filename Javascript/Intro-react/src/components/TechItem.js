import React from 'react';
import PropTypes from 'prop-types';

/**
 * 
 * Pode pegar desestruturando o props depois, ou já direto no parênteses
 */
function TechItem({tech, onDelete}) {
  return (<li>
    {tech}
    <button onClick={onDelete} type="button">Remover</button></li>);
}

// Preenche um valor padrão caso a propriedade tech não venha
TechItem.defaultProps = {
  tech: 'Oculto'
};

TechItem.PropTypes = {
  tech: PropTypes.string.isRequired,
}



export default TechItem;