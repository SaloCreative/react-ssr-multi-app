import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
  background: white;
  border-radius: 2px;
  border: 0.1rem solid #000;
  cursor: pointer;
  font-size: 16px;
  height: 50px;
  padding: 0 2rem;
  width: ${ props => (props.fullWidth ? '100%' : 'auto') };
  transition: all 0.3s linear;
  &:disabled {
    opacity: 0.3;
  }
  &:hover {
    background: #eee
  }
`;

Button.defaultProps = {
  padding: '10px',
  fullWidth: false
};

Button.propTypes = {
  padding: PropTypes.string,
  fullWidth: PropTypes.bool
};

export default Button;