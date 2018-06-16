import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  position: relative;
  max-width: ${ props => props.width }px;
  padding: ${ props => props.padding }
`;

Container.defaultProps = {
  padding: '10px',
  width: 1080
};

Container.propTypes = {
  padding: PropTypes.string,
  width: PropTypes.number
};

export default Container;