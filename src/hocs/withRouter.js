import { useLocation, useNavigate } from 'react-router-dom';

export function withRouter(Component) {
  return (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...props} location={location} navigate={navigate} />;
  };
}
