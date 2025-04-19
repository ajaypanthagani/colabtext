import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CustomEditor, CustomElement, CustomText } from "../../types/editor";

import "./toolbar.css"
import { faAlignCenter, faAlignJustify, faAlignLeft, faAlignRight, faBold, faItalic, faList, faListNumeric, faQuoteLeft, faUnderline } from "@fortawesome/free-solid-svg-icons";

interface ToolbarProps {
    editor: CustomEditor;
    toggleMark: (editor: CustomEditor, format: keyof Omit<CustomText, 'text'>) => void;
    toggleBlock: (editor: CustomEditor, format: CustomElement['type']) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ editor, toggleMark, toggleBlock }) => {

    return (
        <div className="toolbar">
            <button className="toolbar-button" onClick={() => toggleMark(editor, "bold")} title="bold">
                <FontAwesomeIcon icon={faBold} />
            </button>
            <button className="toolbar-button" onClick={() => toggleMark(editor, "italic")} title="italic">
                <FontAwesomeIcon icon={faItalic} />
            </button>
            <button className="toolbar-button" onClick={() => toggleMark(editor, "underline")} title="underline">
                <FontAwesomeIcon icon={faUnderline} />
            </button>
            <button className="toolbar-button" onClick={() => toggleBlock(editor, "quote")} title="quote">
                <FontAwesomeIcon icon={faQuoteLeft} />
            </button>
            <button className="toolbar-button" onClick={() => toggleBlock(editor, "bulleted-list")} title="bulleted list">
                <FontAwesomeIcon icon={faList} />
            </button>
            <button className="toolbar-button" onClick={() => toggleBlock(editor, "numbered-list")}  title="numbered list">
                <FontAwesomeIcon icon={faListNumeric} />
            </button>
            <button className="toolbar-button" onClick={() => toggleBlock(editor, "align-left")} title="align left">
                <FontAwesomeIcon icon={faAlignLeft} />
            </button>
            <button className="toolbar-button" onClick={() => toggleBlock(editor, "align-center")} title="align center">
                <FontAwesomeIcon icon={faAlignCenter} />
            </button>
            <button className="toolbar-button" onClick={() => toggleBlock(editor, "align-right")} title="align right">
                <FontAwesomeIcon icon={faAlignRight} />
            </button>
            <button className="toolbar-button" onClick={() => toggleBlock(editor, "justify")} title="justify">
                <FontAwesomeIcon icon={faAlignJustify} />
            </button>
        </div>
    )
}

export default Toolbar;