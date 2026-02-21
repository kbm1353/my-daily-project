import "./App.css";
import { createContext } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import Notfound from "./pages/Notfound";

// 1. "/" : すべての日記を閲覧するHomeページ
// 2. "/new" : 新しい日記を作成するNewページ
// 3. "/diary" : 日記を詳細に閲覧するDiaryページ
// 4. "/edit" : 日記を編集するEditページ

// 注意点！
// 1. Routesコンポーネントの中にはRouteのみ記述可能
// 2. Routesコンポーネントの外にある要素はすべてレンダリングされる

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  return (
    <>
      <DiaryStateContext.Provider value={[]}>
        <DiaryDispatchContext.Provider value={{}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/*" element={<Notfound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
