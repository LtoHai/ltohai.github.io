import React from 'react';
import MoonIcon from './MoonIcon';
import SunIcon from './SunIcon';

const buttonStyle = {
    position: 'fixed',
    top: '20px',
    right: '20px',

    // 调整为更适合图标的样式
    width: '48px',
    height: '48px',
    borderRadius: '50%', // 圆形按钮
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    cursor: 'pointer',
    border: 'none', // 移除边框
    backgroundColor: 'var(--button-bg-color)',
    color: 'var(--text-color)', // 图标颜色会继承这个
    transition: 'background-color 0.2s, transform 0.2s',
};

// 这是一个“展示型组件”，它接收 props 并渲染 UI
function ThemeToggle({ theme, toggleTheme }) {
    return (
        // 添加 title 属性，当鼠标悬停时提供文字提示，对可访问性友好
        <button onClick={toggleTheme} style={buttonStyle} title={`切换到${theme === 'light' ? '深色' : '浅色'}模式`}>
            {/* 根据当前主题，显示对应的图标 */}
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
    );
}

export default ThemeToggle;