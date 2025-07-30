import React from 'react';
import { Link } from 'react-router-dom';
import ArrowLeftIcon from '../components/ArrowLeftIcon'; // 导入新图标

function TdoaPage() {
    return (
        <>
            {/* 使用新的布局容器 */}
            <div className="page-header">
                {/* 将图标包裹在 Link 组件中，并应用新样式 */}
                <Link to="/" className="back-link" title="返回主页">
                    <ArrowLeftIcon />
                </Link>
                <h1>冒险家日记 (TDOA)</h1>
            </div>

            <p>这里是 TDOA 项目的专属页面，未来关于此项目的介绍、文档或工具都可以在这里展示。</p>

            <hr className="divider" />

            <h2>工具</h2>
            {/* 使用 Link 组件进行内部导航 */}
            <h3><Link to="/tdoa/character_panel">角色面板生成器</Link></h3>
        </>
    );
}

export default TdoaPage;