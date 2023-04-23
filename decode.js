
var imgdatauri;
function decode(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
        console.log(steg.decode(e.target.result));
      
      document.querySelector('#decoded').innerText = steg.decode(e.target.result);
    };
  }
  reader.readAsDataURL(input.files[0]);
}
  function hidetext(){
    // var text = document.querySelector("#data-box").value;
    // alert(text);
    // console.log("read the text");
  }