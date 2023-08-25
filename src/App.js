import GlobalStyle from './styles/GlobalStyle';
import Header from './component/Header';
import { Outlet, Router,Routes,Route } from 'react-router-dom';
import MainVideo from './component/MainVideo';
import Action from './component/Action';
import Comedy from './component/Comedy';
import { Provider } from 'react-redux';
import { applyMiddleware, compose , createStore} from 'redux';
import rootReducer from './store/reducers';
import thunk from 'redux-thunk';
import DetailPage from './component/DetailPage';


/*
  redux-thunk : Redux용 썽크 미들웨어. 
  Redux 저장소 및 메서드와 상호 작용할 수 있는 논리가 있는 함수를 작성할 수 있습니다. dispatchgetState
  설치 방법 : yarn add redux-thunk 

*/

/*
  중첩 라우팅을 사용해서 children으로 링크를 설정했다면
  컴포넌트 내에서도 중첩라우팅을 children과 같은 개념으로 구조를 작성할 수 있게 해주는 HOOK
*/

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk

  //console.log(store)


))) // reducers을 가져옴 




function App() {
  return (
     <>
     <GlobalStyle/> {/* reset css 사용 */}
     <Header/>
     <MainVideo/>
     <Outlet/>
     <Provider store={store}>
     <Action/>
     {/* <Comedy/> */}
     </Provider>
    {/* <Routes>
      <Route path="/movie/:movieId" element={<DetailPage/>}/>
    </Routes> */}

     {/*Outlet : Outlet은 중첩 라우팅을 통해 상위 컴포넌트를 레이아웃화 할 수 있고 {children}을 사용하는 것과 같은 효과가 난다.*/}

     </>
  );
}

export default App;
