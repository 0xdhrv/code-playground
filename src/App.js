import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';

import './App.css';
import 'codemirror/theme/material.css';

import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';

class App extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      html: '',
      css: '',
      js: '',
    };
  }

  componentDidUpdate() {
    this.runCode();
  }

  // componentDidMount() {
  //   this.setState({
  //     id: pushid(),
  //   });
  // }

  runCode = () => {
    const { html, css, js } = this.state;

    const iframe = this.refs.iframe;
    const document = iframe.contentDocument;
    const documentContents = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="title" content="0xdhrv">
        <meta name="description" content="Designer, Developer, and Minimalism.~ stuck b/w develop and deploy">
        <meta name="keywords" content="0xdhrv, Dhruv Suthar, Dhruv, Suthar, 0x, dhrv, dhrv.pw, 0x.dhrv.pw, developer, designer, minimalism, dhruv, suthar, dhruv suthar">
        <meta name="robots" content="index, follow">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="language" content="English">
        <meta name="revisit-after" content="1 days">
        <meta name="author" content="0xdhrv">
        <meta name="twitter:image" content="https://res.cloudinary.com/dhrv/image/upload/v1602144615/resources/dhrv-Og.png" />
        <meta name="og:image" content="https://res.cloudinary.com/dhrv/image/upload/v1602144615/resources/dhrv-Og.png" />
        <title>Web Playgorund | Dhruv Suthar : 0xdhrv</title>
        <link rel="manifest" href="/favicons/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="mask-icon" href="/favicons/pinned.svg" color="#000000" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="alternate icon" type="image/png" href="/favicons/dark.png" key="dynamic-favicon-alternate" />
        <link rel="icon" type="image/svg+xml" href="/favicons/dark.svg" key="dynamic-favicon" />
        <link rel="alternate icon" type="image/png" href="/favicons/light.png" key="dynamic-favicon-alternate" />
        <link rel="icon" type="image/svg+xml" href="/favicons/light.svg" key="dynamic-favicon" />
        <style>
          ${css}
        </style>
      </head>
      <body>
        ${html}

        <script type="text/javascript">
          ${js}
        </script>
      </body>
      </html>
    `;

    document.open();
    document.write(documentContents);
    document.close();
  };

  render() {
    const { html, js, css } = this.state;
    const codeMirrorOptions = {
      theme: 'material',
      lineNumbers: true,
      scrollbarStyle: null,
      lineWrapping: true,
    };

    return (
      <div className="App">
        <section className="playground">
          <div className="code-editor html-code">
            <div className="editor-header">HTML</div>
            <CodeMirror
              value={html}
              options={{
                mode: 'htmlmixed',
                ...codeMirrorOptions,
              }}
              onBeforeChange={(editor, data, html) => {
                this.setState({ html });
              }}
            />
          </div>
          <div className="code-editor css-code">
            <div className="editor-header">CSS</div>
            <CodeMirror
              value={css}
              options={{
                mode: 'css',
                ...codeMirrorOptions,
              }}
              onBeforeChange={(editor, data, css) => {
                this.setState({ css });
              }}
            />
          </div>
          <div className="code-editor js-code">
            <div className="editor-header">JavaScript</div>
            <CodeMirror
              value={js}
              options={{
                mode: 'javascript',
                ...codeMirrorOptions,
              }}
              onBeforeChange={(editor, data, js) => {
                this.setState({ js });
              }}
            />
          </div>
        </section>
        <section className="result">
          <iframe title="result" className="iframe" ref="iframe" />
        </section>
      </div>
    );
  }
}

export default App;