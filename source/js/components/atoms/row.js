import styled from 'styled-components';
import { PropTypes } from 'prop-types';

const Row = styled.div`
  display: flex;
  width: 100%;
  flex: ${ props => props.flex };
  flex-direction: ${ props => props.flexDirection };
  flex-wrap: ${ props => props.flexWrap };
  align-items: ${ props => props.alignItems };
  justify-content: ${ props => props.justifyContent };
  padding: ${ props => props.padding };
`;

Row.defaultProps = {
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  flexWrap: 'wrap',
  padding: '0 0 0 0',
  flex: '0 1 auto'
};

Row.propTypes = {
  flex: PropTypes.string,
  flexDirection: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
  flexWrap: PropTypes.oneOf(['wrap', 'no-wrap', 'wrap-reverse']),
  alignItems: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'stretch', 'unset']),
  justifyContent: PropTypes.oneOf(['space-between', 'center', 'flex-start', 'flex-end']),
  padding: PropTypes.string
};

export default Row;