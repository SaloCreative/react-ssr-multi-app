import styled from 'styled-components';
import { PropTypes } from 'prop-types';


export function calculateSize(size, columns) {
  return `
    width: ${ ((size / columns) * 100) }%;
    flex-basis: ${ ((size / columns) * 100) }%;
    max-width: ${ ((size / columns) * 100) }%;
  `;
}


const Column = styled.div`
  display: flex;
  width: 100%;
  flex-direction: ${ props => props.flexDirection };
  flex-grow: ${ props => props.flexGrow };
  flex-shrink: ${ props => props.flexShrink };
  flex-basis: ${ props => props.flexBasis };
  align-items: ${ props => props.alignItems };
  justify-content: ${ props => props.justifyContent };
  padding: ${ props => props.padding };

  /* Default size */
  ${ props => { return (`${ calculateSize(props.default, props.columns) }`); } };

  /* Phone size */
  @media (min-width: 480px) {
    ${ props => calculateSize(props.phone, props.columns) };
  }

  /* Small size */
  @media (min-width: 620px) {
    ${ props => { return (`${calculateSize(props.small, props.columns)}`); } };
  }

  /* Tablet size */
  @media (min-width: 767px) {
    ${ props => { return (`${calculateSize(props.tablet, props.columns)}`); } };
  }

  /* Medium size */
  @media (min-width: 860px) {
    ${ props => { return (`${calculateSize(props.medium, props.columns)}`); } };
  }

  /* Large size */
  @media (min-width: 1000px) {
    ${ props => { return (`${calculateSize(props.large, props.columns)}`); } };
  }
  `;

Column.defaultProps = {
  flexGrow: '1',
  flexShrink: '0',
  flexBasis: '0%',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  padding: '10px',
  columns: 12,
  default: null,
  phone: null,
  small: null,
  tablet: null,
  medium: null,
  large: null
};

Column.propTypes = {
  flexGrow: PropTypes.string,
  flexShrink: PropTypes.string,
  flexBasis: PropTypes.string,
  flexDirection: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
  alignItems: PropTypes.oneOf(['flex-start', 'center', 'flex-end']),
  justifyContent: PropTypes.oneOf(['space-between', 'center', 'flex-start', 'flex-end']),
  padding: PropTypes.string,
  columns: PropTypes.number,
  default: PropTypes.number,
  large: PropTypes.number,
  medium: PropTypes.number,
  tablet: PropTypes.number,
  phone: PropTypes.number,
  small: PropTypes.number
};

export default Column;