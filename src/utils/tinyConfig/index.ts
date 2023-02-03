const initTinyConfig = {
  height: 300,
  menubar: false,
  plugins:
    "preview importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons",
  toolbar:
    "undo redo | blocks | bold italic underline | fontsize fontfamily | alignleft aligncenter alignright alignjustify | " +
    "bullist numlist outdent indent | link image | print preview media fullscreen | " +
    "forecolor backcolor emoticons | help",
  content_style: "./tinyStyles.css",
  quickbars_selection_toolbar:
    "bold italic underline | quicklink h2 h3 blockquote quickimage quicktable",
};

export { initTinyConfig };
