import { createEditor} from "slate";
import { Slate, withReact, Editable, ReactEditor } from "slate-react"
import { useEffect, useState } from "react";
import "./page.css"

const Page = () => {
    const [editor] = useState(() => withReact(createEditor()));
    const initialValue = [
      {
        type: "paragraph",
        children: [{ text: "" }]
      }
    ];

    useEffect(() => {
      // Focus the editor when mounted
      ReactEditor.focus(editor);
    }, [editor]);

    return (
        <Slate editor={editor} initialValue={initialValue}>
            <Editable className="slate-editor" placeholder="Type here…" />
        </Slate>
    );
}

export default Page;