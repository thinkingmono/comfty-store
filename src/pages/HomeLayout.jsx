import { Outlet, useNavigation } from "react-router-dom"
import { Header, Navbar, Loading } from '../components/'

//Homepage.
const HomeLayout = () => {
  //navigation declaration to check if page is loading and render loading component while content renders.
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';

  return (
    <>
      <Header />
      <Navbar />
      {/*Loading for all pages. If page is loading show loading component. if not renders outlet component wich loads all paths*/}
      {isPageLoading ? <Loading /> :
        <section className="align-element py-20">
          <Outlet />
        </section>
      }
    </>
  )
}

export default HomeLayout