$(document).ready(()=>{

  var image = $('#image');
  var song = $('#song');
  $('body').fadeOut(10);
  $('body').fadeIn(1000);
  $('.progress').hide();

  $('#add-form').ajaxForm({
    beforeSerialize:function() {},
    beforeSubmit:function(formData, jqForm, options) {
        $('.progress').show();
        console.log('starting..');
        let Song = song.val();
        let Image = image.val();
        Song = Song.split('.').pop();
        Image = Image.split('.').pop();
        if (Song == "mp3" && Image == 'jpg' || Image == 'png') {
          console.log('correct formate');
          return true;
        }else{
          alert('Enter Correct file formats');
          $('.progress').hide();
          return false;
        }
    },
    uploadProgress:function(event,position,total,percentComplete) {
        $('.progress-bar').css({'width':`${percentComplete}%`});
    },

    success:function(responseText,statusText) {

      $('.progress').hide();
      if (responseText['status'] == '403'){
        alert('You are not allowed to menipulate');
      }
      window.location.href = '/';
    },
    error:function(){
      console.log('Here is something wrong');
    }
  });// end of ajaxForm

  $('.play-link').click(function(e){
    var id = this.id;
    $.ajax({
      url:'/fetch-song/',
      method:'GET',
      data:{'id':this.id},
      success:function(data){
         console.log(data.url);

        document.getElementById('playIt').src = data.url;
        document.getElementById('player').load();

       },
      error:function(){console.log('ERRRO---');}
    });

  });
  var token = $('input[name=csrfmiddlewaretoken]').prop('value');
  $('.delete').click(function (e) {
    let id = this.id;
    $.ajax({
      url:'/',
      headers: { "X-CSRFToken": token },
      type: "DELETE",
      data:{
        'id':id,
      },
      success:function (data) {
          console.log(data);
          if (data['status'] == '204'){
            alert(`something is wrong while deleting ${id}..`);
          }
          else if(data['status'] == '200'){
            window.location.href = '/';
          }
      },
      error:function () {
        console.log(`something is wrong while deleting ${id}..`);
      }

    });
  });

  console.log("Ok");

});
