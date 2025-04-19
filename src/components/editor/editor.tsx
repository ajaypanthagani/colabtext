/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useState, useEffect } from 'react';
import Page from '../page/page';
import Toolbar from '../toolbar/toolbar';
import UserBadge from '../user-badge/user-badge';
import './editor.css';
import { createEditor, Editor, Transforms } from 'slate';
import { withReact, Slate } from 'slate-react';
import { CustomEditor, CustomElement, CustomText } from '../../types/editor';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RichTextEditor = () => {
  const [editor] = useState(() => {
    const e = withReact(createEditor());

    const { apply } = e;
    e.apply = (operation) => {
      if (operation.type === 'set_selection') {
        const isInSpecial = isInSpecialBlock(e);
        const isSelectionEmpty = Editor.string(e, e.selection || { anchor: { path: [0, 0], offset: 0 }, focus: { path: [0, 0], offset: 0 } }).length === 0;

        if (isInSpecial || isSelectionEmpty) {
          Editor.marks(e) && Editor.marks(e)!.bold && Editor.removeMark(e, 'bold');
          Editor.marks(e) && Editor.marks(e)!.italic && Editor.removeMark(e, 'italic');
          Editor.marks(e) && Editor.marks(e)!.underline && Editor.removeMark(e, 'underline');
        }
      }
      apply(operation);
    };
    return e;
  });

  const [username, setUsername] = useState('');

  useEffect(() => {
    const adjectives = ['Happy', 'Clever', 'Brave', 'Gentle', 'Wise', 'Swift', 'Bright', 'Calm', 'Kind', 'Proud'];
    const nouns = ['Fox', 'Bear', 'Eagle', 'Wolf', 'Lion', 'Tiger', 'Hawk', 'Owl', 'Deer', 'Horse'];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNumber = Math.floor(Math.random() * 1000);
    setUsername(`${randomAdjective}${randomNoun}${randomNumber}`);
  }, []);

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
      Transforms.setNodes(editor, {
        type: 'paragraph',
        data: { align: 'left' }
      } as Partial<CustomElement>);
    } else {
      Transforms.setNodes(editor, {
        type: isList ? 'list-item' : format,
        data: { align: 'left' }
      } as Partial<CustomElement>);

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

  const initialValue: CustomElement[] = [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const badges = [username]; // or real usernames
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % badges.length);
    }, 1000); // change every 1 second

    return () => clearInterval(interval);
  }, [badges.length]);

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  const copyToCpliBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Copied to clipboard:', text);

      const copyOfShareableCodePlaceHolder = shareableCodePlaceHolder;

      setShareableCodePlaceHolder('Copied!')

      setTimeout(() => {setShareableCodePlaceHolder(copyOfShareableCodePlaceHolder)}, 1000)

    } catch (err) {
      console.error('Failed to copy!', err);
    }
  }

  const [shareableCode, setShareableCode] = useState<string>('');

  useEffect(() => {
    const code = 'shareable-code';
    setShareableCode(code);
  }, []); // run only once on mount

  const [shareableCodePlaceHolder, setShareableCodePlaceHolder] = useState<string>('Copy code to share!');

  return (
    <div className="editor-wrapper">
      <div className="header">
        <div className="logo-container">
          <img className='logo' src="colabtext.png" alt="colabtext" />
        </div>
        <div className="shareable-code-container">
          <button className="shareable-code" onClick={() => copyToCpliBoard(shareableCode)}>{shareableCodePlaceHolder}</button>
        </div>
        <div className="activity-indicator-container" onClick={toggleModal}>
          <UserBadge username={badges[currentIndex]} />
        </div>
      </div>
      <Slate editor={editor} initialValue={initialValue}>
        <div className="toolbar-container flex">
          <div className="toolbar-wrapper flex-justify-center flex-col">
            <div className="flex-self-center">
              <Toolbar 
                toggleMark={toggleMark} 
                toggleBlock={toggleBlock} 
                isMarkActive={isMarkActive}
                isBlockActive={isBlockActive}
              />
            </div>
          </div>
        </div>
        <div className="page-container flex-col">
          <div className="page flex-self-center">
            <Page editor={editor} onKeyDown={onKeyDown} />
          </div>
        </div>
      </Slate>

      {isModalOpen && (
        <div className="modal-backdrop" onClick={toggleModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="flex flex-gap-between">
              <h4>Active Users</h4>
              <button className='close-modal' onClick={toggleModal}>
                  <FontAwesomeIcon icon={faClose} />
              </button>
            </div>
            <ul>
              {badges.map((user, index) => (
                <li key={index}>
                  {user}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;
