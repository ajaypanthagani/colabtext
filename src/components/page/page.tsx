/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editable, ReactEditor } from 'slate-react';
import { useEffect } from 'react';
import './page.css';
import { CustomEditor, CustomElement, CustomText } from '../../types/editor';

interface PageProps {
  editor: CustomEditor;
  onKeyDown: (event: { key: string; preventDefault: () => void; }) => void;
}

const Page: React.FC<PageProps> = ({ editor, onKeyDown }) => {
  useEffect(() => {
    // Focus the editor when mounted
    ReactEditor.focus(editor);
  }, [editor]);

  return (
    <Editable
      className="slate-editor"
      onKeyDown={onKeyDown}
      renderElement={({ attributes, children, element }) => {
        const customElement = element as CustomElement;
        switch (customElement.type) {
          case 'quote':
            return <blockquote {...attributes}>{children}</blockquote>;
          case 'bulleted-list':
            return <ul {...attributes}>{children}</ul>;
          case 'numbered-list':
            return <ol {...attributes}>{children}</ol>;
          case 'list-item':
            return <li {...attributes}>{children}</li>;
          case 'align-left':
            return <div {...attributes} data-align="left">{children}</div>;
          case 'align-center':
            return <div {...attributes} data-align="center">{children}</div>;
          case 'align-right':
            return <div {...attributes} data-align="right">{children}</div>;
          case 'justify':
            return <div {...attributes} data-align="justify">{children}</div>;
          default:
            return <p {...attributes}>{children}</p>;
        }
      }}
      renderLeaf={({ attributes, children, leaf }) => {
        const customLeaf = leaf as CustomText;
        if (customLeaf.bold) children = <strong>{children}</strong>;
        if (customLeaf.italic) children = <em>{children}</em>;
        if (customLeaf.underline) children = <u>{children}</u>;
        return <span {...attributes}>{children}</span>;
      }}
    />
  );
};

export default Page;
