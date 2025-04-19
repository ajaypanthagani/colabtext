/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useState } from 'react';
import Page from '../page/page';
import Toolbar from '../toolbar/toolbar';
import './editor.css';
import { createEditor, Editor, Transforms } from 'slate';
import { withReact } from 'slate-react';
import { CustomEditor, CustomElement, CustomText } from '../../types/editor';

const RichTextEditor = () => {
  const [editor] = useState(() => {
    const e = withReact(createEditor());

    const { apply } = e;
    e.apply = (operation) => {
      if (operation.type === 'set_selection') {
        Editor.marks(e) && Editor.marks(e)!.bold && Editor.removeMark(e, 'bold');
        Editor.marks(e) && Editor.marks(e)!.italic && Editor.removeMark(e, 'italic');
        Editor.marks(e) && Editor.marks(e)!.underline && Editor.removeMark(e, 'underline');
      }
      apply(operation);
    };
    return e;
  });

  const isInSpecialBlock = (editor: CustomEditor) => {
    const [match] = Editor.nodes(editor, {
      match: n => Editor.isBlock(editor, n) && ['quote'].includes((n as CustomElement).type),
    });
    return !!match;
  };

  const toggleMark = (editor: CustomEditor, format: keyof Omit<CustomText, 'text'>) => {
    if (isInSpecialBlock(editor)) {
      return;
    }

    const isActive = isMarkActive(editor, format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  const isMarkActive = (editor: CustomEditor, format: keyof Omit<CustomText, 'text'>) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  };

  const toggleBlock = (editor: CustomEditor, format: CustomElement['type']) => {
    const isActive = isBlockActive(editor, format);
    const isList = ['bulleted-list', 'numbered-list'].includes(format);
    const isSpecialBlock = ['quote'].includes(format);

    if (isSpecialBlock && !isActive) {
      Editor.removeMark(editor, 'bold');
      Editor.removeMark(editor, 'italic');
      Editor.removeMark(editor, 'underline');
    }

    Transforms.unwrapNodes(editor, {
      match: n => Editor.isBlock(editor, n) && ['bulleted-list', 'numbered-list', 'list-item', 'quote'].includes((n as CustomElement).type),
      split: true,
    });

    if (isActive) {
      Transforms.setNodes(editor, { type: 'paragraph' } as Partial<CustomElement>);
    } else {
      Transforms.setNodes(editor, { type: isList ? 'list-item' : format } as Partial<CustomElement>);
      if (isList) {
        const block = { type: format, children: [] } as CustomElement;
        Transforms.wrapNodes(editor, block);
      }
    }
  };

  const isBlockActive = (editor: CustomEditor, format: CustomElement['type']) => {
    const [match] = Editor.nodes(editor, {
      match: (n) => Editor.isBlock(editor, n) && (n as CustomElement).type === format,
    });
    return !!match;
  };

  const onKeyDown = (event: { key: string; preventDefault: () => void; }) => {
    if (event.key === "Tab") {
      event.preventDefault();
      editor.insertText("\t");
    }
  }

  return (
    <div className="editor-wrapper">
      <div className="toolbar-container flex">
        <div className="toolbar-wrapper flex-justify-center flex-col">
          <div className="flex-self-center">
            <Toolbar toggleMark={toggleMark} toggleBlock={toggleBlock} editor={editor} />
          </div>
        </div>
      </div>
      <div className="page-container flex-col">
        <div className="page flex-self-center">
          <Page editor={editor} onKeyDown={onKeyDown} />
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
