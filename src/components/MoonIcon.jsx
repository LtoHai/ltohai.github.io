import React from 'react';

// 这个组件只负责渲染一个 SVG 图标
// stroke="currentColor" 是一个关键技巧，它让 SVG 的颜色自动继承父元素的文字颜色
function MoonIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
    );
}

export default MoonIcon;