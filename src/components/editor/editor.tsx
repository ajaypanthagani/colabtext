import Page from '../page/page'

import "./editor.css"

const Editor = () => {
    return (
        <div className="editor-wrapper">
            <div className="toolbar">
                <h1>Toolbar</h1>
            </div>
            <div className="page-container flex-col">
                <div className="page flex-self-center">
                    <Page></Page>
                </div>
            </div>
        </div>
    );
}

export default Editor;