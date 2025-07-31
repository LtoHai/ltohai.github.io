// /Users/heisenbergwerner/Projects/TDOA/GithubPage/src/components/WikitextEditor.jsx

import React, { useState, useRef } from 'react';
import { marked } from 'marked';
import {WIKI_TEMPLATE} from "../template/wikiTemplate.js";

function MarkdownEditor({ content, setContent }) {
    const [activeTab, setActiveTab] = useState('edit');
    const textareaRef = useRef(null);

    const applyStyle = (startTag, endTag = '', placeholder = '文本') => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const { selectionStart, selectionEnd } = textarea;
        const selectedText = content.substring(selectionStart, selectionEnd);

        let newText;
        let newSelectionStart;
        let newSelectionEnd;

        if (selectedText) {
            newText = `${content.substring(0, selectionStart)}${startTag}${selectedText}${endTag}${content.substring(selectionEnd)}`;
            newSelectionStart = selectionStart + startTag.length;
            newSelectionEnd = newSelectionStart + selectedText.length;
        } else {
            const fullTag = `${startTag}${placeholder}${endTag}`;
            newText = `${content.substring(0, selectionStart)}${fullTag}${content.substring(selectionEnd)}`;
            newSelectionStart = selectionStart + startTag.length;
            newSelectionEnd = newSelectionStart + placeholder.length;
        }

        setContent(newText);

        requestAnimationFrame(() => {
            textarea.focus();
            textarea.selectionStart = newSelectionStart;
            textarea.selectionEnd = newSelectionEnd;
        });
    };

    // 新增：加载模版的处理函数
    const handleLoadTemplate = () => {
        // 在覆盖前，给用户一个确认提示，防止误操作
        if (content && !window.confirm('加载模版将会覆盖当前所有内容，您确定吗？')) {
            return;
        }
        setContent(WIKI_TEMPLATE);
    };

    const getPreviewHtml = () => {
        const rawMarkup = marked.parse(content, {
            breaks: true,
            gfm: true,
        });
        return { __html: rawMarkup };
    };

    return (
        <div className="wikitext-editor">
            <div className="editor-toolbar">
                <button type="button" onClick={() => applyStyle('**', '**', '加粗文字')} title="加粗"><b>B</b></button>
                <button type="button" onClick={() => applyStyle('*', '*', '斜体文字')} title="斜体">/</button>
                <button type="button" onClick={() => applyStyle('## ', '', '标题')} title="二级标题"><b>标</b></button>
                <button type="button" onClick={() => applyStyle('', '', '链接文本')} title="插入链接">🔗</button>
                <button type="button" onClick={() => applyStyle('\n- ', '', '列表项')} title="列表">列</button>

                {/* 新增的加载模版按钮 */}
                <button
                    type="button"
                    className="toolbar-template-button" // 使用一个新 class 来方便我们定义样式
                    onClick={handleLoadTemplate}
                    title="加载预设模版"
                >
                    加载模版
                </button>
            </div>

            <div className="editor-tabs">
                <button
                    type="button"
                    className={`tab-button ${activeTab === 'edit' ? 'active' : ''}`}
                    onClick={() => setActiveTab('edit')}
                >
                    编辑 (Markdown)
                </button>
                <button
                    type="button"
                    className={`tab-button ${activeTab === 'preview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('preview')}
                >
                    预览
                </button>
            </div>

            {activeTab === 'edit' ? (
                <>
                    <textarea
                        ref={textareaRef}
                        id="pageContent"
                        name="pageContent"
                        rows="15"
                        placeholder="在此处输入内容，或点击右上角加载模版..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    <div className="editor-cheatsheet">
                        <p>
                            <strong>提示：</strong> 您可以直接写作，或使用上方工具栏来快速添加格式。
                        </p>
                    </div>
                </>
            ) : (
                <div
                    className="editor-preview"
                    dangerouslySetInnerHTML={getPreviewHtml()}
                />
            )}
        </div>
    );
}

export default MarkdownEditor;