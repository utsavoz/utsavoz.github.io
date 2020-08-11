$(document).ready(function(){

  // Stretch that font!
  // $(".baseline").fitText(2.5);
  // $(".submit").fitText(1);
  $(".formtitle").fitText(2.75);
  $('.thanks').fitText(1);

  // Mobile menu
  $('.m-menu').click(function(){
    if ($('body').hasClass('m-menu-open')){
      $('body').removeClass('m-menu-open');
    }else{
      $('body').addClass('m-menu-open');
      scrollToAnchor('opencall')
    }
  });


  function setIntroSize() {
    var ww = $(window).width()
    if(ww < 560){
      $('.intro img')[0].style.height = 'auto';
      $('.intro img')[0].style.width = '100%';
    }else{
      if($('body').hasClass('thanks-page')){
        var newHeight = $('.thanks').outerHeight() + 150;
      }else{
        var newHeight = $('.opencall').outerHeight() + $('.baseline').outerHeight() + 130;
      }
      $('.intro img')[0].style.height = 'calc(100vh - '+ newHeight+'px)'

    }

    if($('body').hasClass('home')){
      // set margin below main to reveal footer
      var newMargin = $('footer').outerHeight() + 20 + 'px';
      $('.main')[0].style.marginBottom = newMargin;
    }
  }

  window.onresize = setIntroSize;
  setIntroSize();


  // Animate the scrolling
  function scrollToAnchor(aid) {
    var divTag = $("a[name='" + aid + "']");
    var newPos = divTag.offset().top - $('.header').height();
    $('html,body').animate({ scrollTop: newPos }, 'fast');
  }

  $('.nav a').click(function(e){
    $('.nav a').removeClass('active');
    $(this).addClass('active');
    $('body').removeClass('m-menu-open');
    if($('body').hasClass('home')){
      e.preventDefault();
      if(!$(this).hasClass('inactive')){
        window.history.pushState(null, null, $(this).attr("href"));
        var dest = $(this).attr("href").substring(2, $(this).attr("href").length);
        if(dest != ''){
          scrollToAnchor(dest);
        }
      }
    }
  })

  // Dirty!
  $('.al').click(function(e){
    $('body').addClass('form-open');
    $('.formtitle, #form').show();
    // $(".submit").fitText(1);
    $(".formtitle").fitText(2.75);
    $('.thanks').fitText(1);

    if($('body').hasClass('home')){
      e.preventDefault();
      window.history.pushState(null, null, $(this).attr("href"));
      var dest = $(this).attr("href").substring(1, $(this).attr("href").length);
      if(dest != ''){
        scrollToAnchor(dest);
      }
    }
  })


  // Set the post title
  function setTitle() {
    var et = $('#firstName').val() + ' ' + $('#lastName').val();
    $('#entryTitle').val(et);
  }

  $('#firstName').change(function(){ setTitle() });
  $('#lastName').change(function(){ setTitle() });

  // Remove error msg when clicked
  $('.errors').click(function(){
    $(this).html('');
  })

  var mainNavLinks = document.querySelectorAll(".nav a");
  var currSection = '';
  var currSubSection = '';

  // scroller for mobile
  function handleScroll() {
    scrolled = window.scrollY;
    var scrollOffset = 200;

    if (scrolled > scrollOffset) {
      document.querySelector('body').classList.add('scrolling');
    } else {
      if (!$('body').hasClass('m-menu-open')) {
        document.querySelector('body').classList.remove('scrolling');
      }
    }

    // auto highlight menu items

    mainNavLinks.forEach(link => {
      var fromTop = window.scrollY + $('.header').height() + 20;
      var section = document.querySelector(link.hash);

      if (
        section.offsetTop <= fromTop &&
        section.offsetTop + section.offsetHeight >= (fromTop - 10)
      ) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
      });

      if($(window).scrollTop() + $(window).height() == $(document).height()) {
       $('.nav a').removeClass('active')
       $('.ctb').addClass('active');
      }

  }

  if($('body').hasClass('home')){
    window.addEventListener('scroll', handleScroll);

    // animatie the logo
    var elem = document.getElementById("wyt");
    var wyt = lottie.loadAnimation({
      container: elem, // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/js/wyt_v2.json', // the path to the animation json
    });

    wyt.addEventListener('DOMLoaded',function(){
      setIntroSize();
    })

  }






  // pdf rendering

  /*

  // If absolute URL from the remote server is provided, configure the CORS
  // header on that server.
  var url = '/uploads/pdf/APF 2020 Website_Screens.pdf';

  // Loaded via <script> tag, create shortcut to access PDF.js exports.
  var pdfjsLib = window['pdfjs-dist/build/pdf'];

  // The workerSrc property shall be specified.
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist/build/pdf.worker.js';

  // Asynchronous download of PDF
  var loadingTask = pdfjsLib.getDocument(url);
  loadingTask.promise.then(function(pdf) {
    console.log('PDF loaded');

    // Fetch the first page
    var pageNumber = 1;
    pdf.getPage(pageNumber).then(function(page) {
      console.log('Page loaded');

      var scale = 1.5;
      var viewport = page.getViewport({scale: scale});

      // Prepare canvas using PDF page dimensions
      var canvas = document.getElementById('the-canvas');
      var context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Render PDF page into canvas context
      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      var renderTask = page.render(renderContext);
      renderTask.promise.then(function () {
        console.log('Page rendered');
      });
    });
  }, function (reason) {
    // PDF loading error
    console.error(reason);
  });

  //*/

  // end pdf rendering



});


// Poster upload
Dropzone.options.upload = {
  previewsContainer: ".dropzone-previews",
  // Custom upload field name
  paramName: "fields[file]", // The name that will be used to transfer the file
  maxFilesize: 20, // MB
  accept: function(file, done) {
    done();
  },
  acceptedFiles: 'application/pdf',
  timeout: 180000,

  // Combine with other form elements
  autoProcessQueue: false,
  uploadMultiple: true,
  parallelUploads: 100,
  maxFiles: 100,

  previewTemplate: '<div class="dz-preview dz-file-preview"><div class="dz-details"><div class="dz-filename"><span data-dz-name></span></div><div class="dz-size" data-dz-size></div><img data-dz-thumbnail /></div><div class="dz-success-mark"><span>V</span></div><div class="dz-error-mark"><span>X</span></div><div class="dz-error-message"><span data-dz-errormessage></span></div></div>',

  // The setting up of the dropzone
  init: function() {
    var myDropzone = this;

    // First change the button to actually tell Dropzone to process the queue.
    this.element.querySelector("button[type=submit]").addEventListener("click", function(e) {

      // Make sure that the form isn't actually being sent.
      e.preventDefault();
      e.stopPropagation();



      // first check for empty fields{
      if($('#firstName').val() == '' || $('#lastName').val() == '' || $('#email').val() == '') {
        $('.errors').html('<div class="msg"><div class="error">Come on, give us something!</div></div>');
        if($('#firstName').val() == ''){
          $('#firstName').addClass('error')
        }else{
          $('#firstName').removeClass('error')
        }
        if($('#lastName').val() == ''){
          $('#lastName').addClass('error')
        }else{
          $('#lastName').removeClass('error')
        }
        if($('#email').val() == ''){
          $('#email').addClass('error')
        }else{
          $('#email').removeClass('error')
        }
      }else{
        myDropzone.processQueue();
      }

    });


    // Listen to the sendingmultiple event. In this case, it's the sendingmultiple event instead
    // of the sending event because uploadMultiple is set to true.
    this.on("sendingmultiple", function() {
      // Gets triggered when the form is actually being sent.
      // Hide the success button or the complete form.
      $('#upload .submit').addClass('submitting');
      $('#upload .submit').prop('disabled', true)
    });
    this.on("successmultiple", function(files, response) {
      // Gets triggered when the files have successfully been sent.
      // Redirect user or notify of success.
      //console.log(response, response.success, response.errors);
      if(response.success === false){
        var f = 'OOOPS';
        const values = Object.values(response.errors)
        for (i = 0; i < values.length; i++) {
          f += '<div class="error">' + values[i] + '</div>';
        }
        f+= '<div class="error">Problems with your upload? Send your posters and info to <a href="mailto:opencall@apf.design">opencall@apf.design</a></div>';
        var msg = '<div class="msg">' + f + '</div>';
        $('.errors').html(msg);
        $('.dropzone-previews').html('');
        $('#upload .submit').prop('disabled', false);
        $('#upload .submit').removeClass('submitting');
      }else{
        window.location = '/success';
      }

    });
    this.on("errormultiple", function(files, response) {
      // Gets triggered when there was an error sending the files.
      // Maybe show form again, and notify user of error
      alert('Problems with your upload? Send your posters and info to opencall@apf.design');
      $('#upload .submit').prop('disabled', false);
      $('#upload .submit').removeClass('submitting');
    });
  }

};

  // end poster upload
//# sourceMappingURL=main.js.map
