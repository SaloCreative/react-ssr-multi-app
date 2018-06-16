import styled from 'styled-components';
import PropTypes from 'prop-types';

const Sidebar = styled.div`
  width: 100%;
  padding: ${ props => props.margin };
  position: fixed;
  max-width: ${ props => props.width }px;
  padding: ${ props => props.padding };
  ${ props => {
    if (props.alignment === 'left') return 'left: 0';
    return 'right: 0';
  } };
  height: 100vh;
  top: 0;
  border-right: 1px solid #eee;
`;

Sidebar.defaultProps = {
  alignment: 'left',
  padding: '10px',
  margin: '0',
  width: 200
};

Sidebar.propTypes = {
  padding: PropTypes.string,
  margin: PropTypes.string,
  alignment: PropTypes.oneOf(['left', 'right']),
  width: PropTypes.number
};

export default Sidebar;