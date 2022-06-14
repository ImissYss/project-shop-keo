import {QuillModules, QuillToolbarConfig} from "ngx-quill";

export class CommonUtils{
  // static createQuillModuleIgnoreImage(): QuillModules {
  //   return {
  //     toolbar: {
  //       container: [
  //         [{font: []}],
  //         [{size: ['small', false, 'large', 'huge']}],
  //         ['bold', 'italic', 'underline', 'strike'],
  //         [{header: 1}, {header: 2}],
  //         [{color: []}, {background: []}],
  //         [{list: 'ordered'}, {list: 'bullet'}],
  //         [{align: []}],
  //         ['link'/*, 'image'*/],
  //       ],
  //     },
  //     // imageResize: true,
  //   };
  // }
  static createQuillModuleWithImage(): QuillModules {
    return {
      toolbar: {
        container: [
          [{font: []}],
          [{size: ['small', false, 'large', 'huge']}],
          ['bold', 'italic', 'underline', 'strike'],
          [{header: 1}, {header: 2}],
          [{color: []}, {background: []}],
          [{list: 'ordered'}, {list: 'bullet'}],
          [{align: []}],
          ['link', 'image', 'video'],
        ] as QuillToolbarConfig,
      },

    } as QuillModules;
  }
}
