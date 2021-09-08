import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftjsHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { EditorState, ContentState } from 'draft-js';
export default class RichEditor extends Component {
    state = {
        editorState: "", // 同步编辑器的状态
        contentState: ""
    }
    componentDidMount() {
        if (!this.props.content) {
            return;
        }// 创建时候，没有传入content, 此时undefined ,不处理
        const html = this.props.content;
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.setState({
                editorState
            })
        }
    }
    render() {
        return (
            <div>
                {/* {this.props.content} */}
                <Editor
                    editorState={this.state.editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={this.onEditorStateChange}
                    onContentStateChange={this.onContentStateChange}
                    onBlur={() => {
                        this.props.getContent(draftjsHtml(this.state.contentState))
                    }}
                />

            </div>
        )
    }
    onContentStateChange = (contentState) => {
        this.setState({
            contentState
        })

    }
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        })
    }
}
