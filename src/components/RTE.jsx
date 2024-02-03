import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div>
      {label && <label>{label}</label>}
      <Controller
        name={name || "default"}
        control={control}
        render={({ field: { onChange } }) => {return(
          <Editor
          
          apiKey="yb70s198wblbhmwkz3puo8k9hs34w1h9qfptna3rauybxfr0"
            initialValue={defaultValue}

            init={{
              // skin:'naked',
              content_css: 'tinymce-5-dark',

              placeholder: "Type here...",
              branding: false,
              height: 500,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
            }}
            onEditorChange={onChange} //build-in function of tiny-mce to store state of editor when used in controller
          />)
        }}
      />
    </div>
  );
}

export default RTE;

// <Editor
//   initialValue="default value"
//   init={{
//      placeholder: "Type here..." ,
//     branding:false,
//     height:500,
//     menubar:true,
//     plugins: [
//         'advlist autolink lists link image charmap print preview anchor',
//         'searchreplace visualblocks code fullscreen',
//         'insertdatetime media table paste code help wordcount'
//       ],
//       toolbar: 'undo redo | formatselect | ' +
//         'bold italic backcolor | alignleft aligncenter ' +
//         'alignright alignjustify | bullist numlist outdent indent | ' +
//         'removeformat | help',

// }}
// ></Editor>
