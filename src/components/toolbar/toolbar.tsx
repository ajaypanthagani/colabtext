import { CustomEditor, CustomElement, CustomText } from "../../types/editor";

import "./toolbar.css"

interface ToolbarProps {
    editor: CustomEditor;
    toggleMark: (editor: CustomEditor, format: keyof Omit<CustomText, 'text'>) => void;
    toggleBlock: (editor: CustomEditor, format: CustomElement['type']) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ editor, toggleMark, toggleBlock }) => {

    return (
        <div className="toolbar">
            <button onClick={() => toggleMark(editor, "bold")}>Bold</button>
            <button onClick={() => toggleMark(editor, "italic")}>Italic</button>
            <button onClick={() => toggleMark(editor, "underline")}>Underline</button>
            <button onClick={() => toggleBlock(editor, "quote")}>Quote</button>
            <button onClick={() => toggleBlock(editor, "bulleted-list")}>Bullets</button>
            <button onClick={() => toggleBlock(editor, "numbered-list")}>Numbered</button>
            <button onClick={() => toggleBlock(editor, "align-left")}>Left</button>
            <button onClick={() => toggleBlock(editor, "align-center")}>Center</button>
            <button onClick={() => toggleBlock(editor, "align-right")}>Right</button>
            <button onClick={() => toggleBlock(editor, "justify")}>Justify</button>
        </div>
    )
}

export default Toolbar;