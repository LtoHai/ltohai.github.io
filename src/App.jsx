// src/App.jsx

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ThemeToggle from './components/ThemeToggle';
import HomePage from './pages/HomePage';
import TdoaPage from './pages/TdoaPage';
import CharacterPanelPage from './pages/CharacterPanelPage';

function App() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        // BrowserRouter 是所有路由组件的根容器
        <BrowserRouter>
            <div className="main-content">
                {/* 这个切换按钮会在所有页面上显示 */}
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

                {/* Routes 组件会根据当前 URL 匹配并渲染对应的页面组件 */}
                <Routes>
                    {/* 当 URL 是根路径 ("/") 时，显示 HomePage */}
                    <Route path="/" element={<HomePage />} />

                    {/* 当 URL 是 "/tdoa" 时，显示 TdoaPage */}
                    <Route path="/tdoa" element={<TdoaPage />} />

                    {/* 当 URL 是 "/tdoa/character_panel" 时，显示新页面 */}
                    <Route path="/tdoa/character_panel" element={<CharacterPanelPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;