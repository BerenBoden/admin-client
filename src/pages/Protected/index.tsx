import { useSelector } from 'react-redux'
import { useRoutes } from 'react-router-dom'
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../stores/hooks';

const ProtectedRoute = ({routes}: {routes: any}) => {
  const { user, message} = useSelector((state: any) => state.auth)
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof user === "object" && Object.keys(user).length === 0) {
      navigate("/login");
    }
  }, [user, navigate, message, dispatch]);
  return useRoutes(routes)
}

export default ProtectedRoute
