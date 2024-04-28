import React, { Component } from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

class TextEditorImage extends Component {
  render() {
    // const { text, data, index, readOnly } = this.props;
    const custom_config = {
      toolbar: {
        items: [
          'heading',
          '|',
          'bold',
          'italic',
          'underline',
          'link',
          'bulletedList',
          'numberedList',
          '|',
          'alignment',
          'outdent',
          'indent',
          '|',
          'imageInsert',
          'insertTable',
          'blockQuote',
          'undo',
          'redo',
        ],
      },
      language: 'en',
      image: {
        toolbar: [
          'imageTextAlternative',
          'imageStyle:full',
          'imageStyle:side',
          'imageStyle:alignLeft',
          'imageStyle:alignCenter',
          'imageStyle:alignRight',
          'resizeImage',
          'linkImage',
        ],
        styles: ['full', 'side', 'alignLeft', 'alignCenter', 'alignRight'],
      },
      table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
      },
      licenseKey: '',
    };
    return (
      <CKEditor
        required
        editor={ClassicEditor}
        config={custom_config}
        data=""
        onChange={(event, editor) => {
          const typedData = editor.getData();
          console.log(typedData);
          // data(typedData, index);
        }}
        onReady={(editor) => {
          console.log('Editor is ready to use!', editor);
        }}
        // disabled={readOnly ? true : false}
      />
    );
  }
}


export default TextEditorImage;
