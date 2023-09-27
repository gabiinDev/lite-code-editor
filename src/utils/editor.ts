import * as monaco from "monaco-editor";
import HtmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import CssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import JsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import { encode, decode } from "js-base64";

import { emmetHTML } from "emmet-monaco-es";

import { createHtmlTemplate } from "../utils/common";

let htmlCodeContent = "";
let cssCodeContent = "";
let jsCodeContent = "";

window.MonacoEnvironment = {
  getWorker(_: string, label: string) {
    if (label === "html") {
      return new HtmlWorker();
    }
    if (label === "css") {
      return new CssWorker();
    }
    if (label === "javascript") {
      return new JsWorker();
    }
    return new Promise<Worker>(() => {});
  },
};

export const initHtmlEditor = (previewElement: HTMLElement) => {
  const $htmlEditor = document.querySelector("#html-editor") as HTMLElement;

  const monacoHtmlEditor = monaco.editor.create($htmlEditor, {
    language: "html",
    value: "",
    theme: "vs-dark",
    automaticLayout: true,
    fixedOverflowWidgets: true,
    scrollBeyondLastLine: false,
    roundedSelection: false,
    lineNumbers: "off",
    tabSize: 2,
    wordWrap: "on",
  });

  monacoHtmlEditor.onDidChangeModelContent(() => {
    htmlCodeContent = monacoHtmlEditor.getValue();
    setPreviewContent(
      cssCodeContent,
      htmlCodeContent,
      jsCodeContent,
      previewElement
    );
  });

  monaco.languages.registerCompletionItemProvider("html", {
    triggerCharacters: [">"],
    provideCompletionItems: (model, position) => {
      const tagName = getMatchingTagName(model, position);

      if (!tagName) return null;
      return buildCompletionList(tagName, position, monaco);
    },
  });

  emmetHTML(monaco);
};

const getMatchingTagName = (
  model: monaco.editor.ITextModel,
  position: monaco.Position
) => {
  const textFromCurrentLineUntilPosition = model.getValueInRange({
    startLineNumber: position.lineNumber,
    endLineNumber: position.lineNumber,
    startColumn: 1,
    endColumn: position.column,
  });

  return textFromCurrentLineUntilPosition.match(/.*<(\w+).*>$/)?.[1];
};

const buildCompletionList = (
  tagName: string,
  position: monaco.Position,
  monaco: any
) => {
  const closingTag = `</${tagName}>`;
  const insertTextSnippet = `$0${closingTag}`;
  const rangeInCurrentPosition = {
    startLineNumber: position.lineNumber,
    endLineNumber: position.lineNumber,
    startColumn: position.column,
    endColumn: position.column,
  };

  return {
    suggestions: [
      {
        label: closingTag,
        kind: monaco.languages.CompletionItemKind.EnumMember,
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        insertText: insertTextSnippet,
        range: rangeInCurrentPosition,
      },
    ],
  };
};

export const initCssEditor = (previewElement: HTMLElement) => {
  const $cssEditor = document.querySelector("#css-editor") as HTMLElement;
  const monacoCssEditor = monaco.editor.create($cssEditor, {
    language: "css",
    value: "",
    theme: "vs-dark",
    automaticLayout: true,
    fixedOverflowWidgets: true,
    scrollBeyondLastLine: false,
    roundedSelection: false,
    lineNumbers: "off",
    tabSize: 2,
    wordWrap: "on",
  });

  monacoCssEditor.onDidChangeModelContent(() => {
    cssCodeContent = monacoCssEditor.getValue();
    setPreviewContent(
      cssCodeContent,
      htmlCodeContent,
      jsCodeContent,
      previewElement
    );
  });
};

const setPreviewContent = (
  css: string,
  html: string,
  js: string,
  previewElement: HTMLElement
) => {
  const htmlTemplate = createHtmlTemplate(css, html, js);
  previewElement.setAttribute("src", htmlTemplate);

  updateHashedCodeUrl(css, html, js);
};

const updateHashedCodeUrl = (css: string, html: string, js: string) => {
  const hashedCode = `${encode(html)}|${encode(css)}|${encode(js)}`;
  window.history.replaceState(null, "", `/${hashedCode}`);
};
