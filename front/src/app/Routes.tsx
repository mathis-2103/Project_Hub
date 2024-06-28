import {createBrowserRouter} from "react-router-dom";
import HomeScreen from '../screens/HomeScreen';
import AdministratorScreen from '../screens/AdministratorScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import GalleriesScreen from '../screens/GalleriesScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import ProductManagScreen from "../screens/ProductManagScreen";
import StyleManagScreen from "../screens/StyleManagScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen/>,
  },
  {
    path: "/administrator",
    element: <AdministratorScreen/>,
  },
  {
    path: "/administrator/auth",
    element: <LoginScreen/>,
  },
  {
    path: "/administrator/profile",
    element: <ProfileScreen/>,
  },
  {
    path: "/administrator/galleries",
    element: <GalleriesScreen/>,
  },
  {
      path: "/administrator/schedule",
      element: <ScheduleScreen/>,
  },
  {
      path: "/administrator/article",
      element: <ProductManagScreen/>,
  },
  {
      path: "/administrator/StetingStyle",
      element: <StyleManagScreen/>,
  },
]);
export default router;
