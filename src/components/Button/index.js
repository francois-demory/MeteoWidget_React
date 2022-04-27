import PropTypes from 'prop-types';

import './styles.scss';

export default function Button({ handleClick }) {
  return (
    <button
      className="button"
      type="button"
      onClick={handleClick}
    >
      Plus d'infos
    </button>
  );
}

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
