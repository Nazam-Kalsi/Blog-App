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
        render={({ field: { onChange } }) => {
          <Editor
            initialValue={defaultValue}
            init={{
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
          />;
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
