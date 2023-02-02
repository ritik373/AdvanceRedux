import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect ,useState} from 'react';
import { uiActions } from './store/ui-slice';
let isInitial=true;
function App() {
  const dispatch=useDispatch();
  const showCart=useSelector(state=>state.ui.cartIsVisible);
  const cart=useSelector(state=> state.cart);
  const notification =useSelector(state=>state.ui.notification)

  useEffect(()=>{
    const sendCartData=async()=>{
      dispatch(uiActions.showNotification({
        status:'pending',
        title:'sending...',
        message:'sending cart data',
      }));
    const response=await fetch('https://advanceredux-e01ef-default-rtdb.firebaseio.com/cart.json',{
      method:'PUT',
      body:JSON.stringify(cart),

      });
      if(!response.ok){
        throw new Error('sending cart data failed');
      }
      dispatch(uiActions.showNotification({
        status:'success',
        title:'success...',
        message:'sending cart data successfully',
      }));
    };
    if (isInitial) {
      isInitial=false
      return;
    }
    sendCartData().catch((error)=>{
      dispatch(uiActions.showNotification({
        status:'error',
        title:'Error',
        message:'sending cart data failed',
      }));
    });
  },[cart]);
  return (
    <div>
    {notification && <Notification 
      status={notification.status}
      title={notification.title}
      message={notification.message} />}

    <Layout>
      
     {showCart && <Cart />}
      <Products />
    </Layout>
    </div>
  );
}

export default App;
