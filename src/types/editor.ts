import { BaseEditor, BaseElement, BaseText } from 'slate';
import { ReactEditor } from 'slate-react';

export interface CustomElement extends BaseElement {
  type: 'paragraph' | 'quote' | 'bulleted-list' | 'numbered-list' | 'list-item';
  data?: {
    align?: 'left' | 'center' | 'right' | 'justify';
  };
}

export interface CustomText extends BaseText {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

export type CustomEditor = BaseEditor & ReactEditor;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
} 