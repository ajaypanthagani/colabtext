import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CustomEditor, CustomElement, CustomText } from "../../types/editor";
import { useSlate } from 'slate-react';

import "./toolbar.css"
import { faAlignCenter, faAlignJustify, faAlignLeft, faAlignRight, faBold, faItalic, faList, faListNumeric, faQuoteLeft, faUnderline } from "@fortawesome/free-solid-svg-icons";

interface ToolbarProps {
    toggleMark: (editor: CustomEditor, format: keyof Omit<CustomText, 'text'>) => void;
    toggleBlock: (editor: CustomEditor, format: CustomElement['type']) => void;
    isMarkActive: (editor: CustomEditor, format: keyof Omit<CustomText, 'text'>) => boolean;
    isBlockActive: (editor: CustomEditor, format: CustomElement['type']) => boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({ toggleMark, toggleBlock, isMarkActive, isBlockActive }) => {
    const editor = useSlate();

    return (
        <div className="toolbar">
            <button
                className={`toolbar-button ${isMarkActive(editor, "bold") ? "selected-formatting" : ""}`} 
                onClick={() => toggleMark(editor, "bold")}
                title="bold"
            >
                <FontAwesomeIcon icon={faBold} />
            </button>
            <button
                className={`toolbar-button ${isMarkActive(editor, "italic") ? "selected-formatting" : ""}`} 
                onClick={() => toggleMark(editor, "italic")}
                title="italic"
            >
                <FontAwesomeIcon icon={faItalic} />
            </button>
            <button
                className={`toolbar-button ${isMarkActive(editor, "underline") ? "selected-formatting" : ""}`} 
                onClick={() => toggleMark(editor, "underline")}
                title="underline"
            >
                <FontAwesomeIcon icon={faUnderline} />
            </button>
            <button
                className={`toolbar-button ${isBlockActive(editor, "quote") ? "selected-formatting" : ""}`} 
                onClick={() => toggleBlock(editor, "quote")}
                title="quote"
            >
                <FontAwesomeIcon icon={faQuoteLeft} />
            </button>
            <button
                className={`toolbar-button ${isBlockActive(editor, "bulleted-list") ? "selected-formatting" : ""}`} 
                onClick={() => toggleBlock(editor, "bulleted-list")}
                title="bulleted list"
            >
                <FontAwesomeIcon icon={faList} />
            </button>
            <button
                className={`toolbar-button ${isBlockActive(editor, "numbered-list") ? "selected-formatting" : ""}`} 
                onClick={() => toggleBlock(editor, "numbered-list")}
                title="numbered list"
            >
                <FontAwesomeIcon icon={faListNumeric} />
            </button>
            <button
                className={`toolbar-button ${isBlockActive(editor, "align-left") ? "selected-formatting" : ""}`} 
                onClick={() => toggleBlock(editor, "align-left")}
                title="align left"
            >
                <FontAwesomeIcon icon={faAlignLeft} />
            </button>
            <button
                className={`toolbar-button ${isBlockActive(editor, "align-center") ? "selected-formatting" : ""}`} 
                onClick={() => toggleBlock(editor, "align-center")}
                title="align center"
            >
                <FontAwesomeIcon icon={faAlignCenter} />
            </button>
            <button
                className={`toolbar-button ${isBlockActive(editor, "align-right") ? "selected-formatting" : ""}`} 
                onClick={() => toggleBlock(editor, "align-right")}
                title="align right"
            >
                <FontAwesomeIcon icon={faAlignRight} />
            </button>
            <button
                className={`toolbar-button ${isBlockActive(editor, "justify") ? "selected-formatting" : ""}`} 
                onClick={() => toggleBlock(editor, "justify")}
                title="justify"
            >
                <FontAwesomeIcon icon={faAlignJustify} />
            </button>
        </div>
    )
}

export default Toolbar;