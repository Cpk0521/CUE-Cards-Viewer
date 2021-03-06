var cardslist;

// $('#preimg').click(()=>{
//     $('#showing').addClass("d-flex").removeClass("d-none");
// });

// $('#closeshowing').click(()=>{
//     $('#showing').addClass("d-none").removeClass("d-flex");
// })

$.getJSON("datalist/newCardsData.json", function(data) {
    cardslist = data.Cards;
}).done(function() {
    // console.log(cardslist);
    SetupCardsList(cardslist);
});

$('#closedisplaycard').click(()=>{
    $('#displaycard').removeClass("d-flex").addClass("d-none");
})


SetupCardsList = (datalist)=>{
    $('#cardlist').empty();

    $.each(datalist, (i, val)=>{
  
        let card = $('<nav></nav>');
        card.addClass("alert-light m-2 d-inline-block position-relative text-center search");
        card.css("border-radius", "15px");

        let img = $('<img/>');
        img.css({"width": "160px", "height": "160px;"});
        img.addClass("rounded");

        img.attr('src', val.image.Normal_thumb);
        let btn = '<button class="position-absolute btn " style="z-index: 3;top: 0;right: 0;background-color: rgba(255,255,255,0.3);"><i class="fas fa-sync-alt"></i></button>';

        let hid = '<p id="hid_'+ val.heroineId +'" class="d-none">'+ val.heroineId +'</p>';
        

        if(val.cardId > 9000000){
            card.append(img, hid);
        }else{
            card.append(img, btn, hid);
        }

        $('#cardlist').append(card);

        card.find('button').click(function(e){
            e.stopPropagation();
            if(img.hasClass('Blooming')){
                img.attr('src', val.image.Normal_thumb);
                img.removeClass("Blooming");
            }else{
                img.attr('src', val.image.Blooming_thumb);
                img.addClass("Blooming");
            }
        });

        card.click(function(){
            // console.log("CLICK");

            SetupCardDisplayViewer(val);

            if(img.hasClass('Blooming')){
                ViewerDisplay(val.image.Blooming);
            }else{
                ViewerDisplay(val.image.Normal);
            }

            $('#displaycard').removeClass("d-none").addClass("d-flex");
        });

    });
}

SetupCardDisplayViewer = (data)=>{
    $('#costname').html(data.heroine);
    if(data.alias == "0")
        $('#cardname').html("??????");
    else{
        $('#cardname').html(data.alias);
    }

    $('#othersource').html("");

    if(data.animation != ''){
        let abtn = $('<button></button>');
        abtn.addClass("btn btn-outline-info flex-row my-1 rounded");
        abtn.append(`<nav class="cardthumbnails"><i class="far fa-play-circle m-auto"></i></nav>`);

        $('#othersource').append(abtn);

        abtn.click(()=>{
            Videoplayer(data.animation);
        })
    }

    $.each(data.image, (i, val)=>{
        let btn = $('<button></button>');
        // btn.addClass("btn btn-outline-info d-flex flex-row my-2 rounded p-2");
        btn.addClass("btn btn-outline-info flex-row my-1 rounded");
        btn.append(`<nav class="cardthumbnails"><img class="m-auto" alt src="${val}"></nav>`);

        $('#othersource').append(btn);

        btn.click(()=>{
            ViewerDisplay(val);
        })
    })
}

ViewerDisplay = (val)=>{
    $('#cardanimationviwer').addClass('d-none').removeClass('d-flex');
    $('#cardanimationviwer').html('');
    $('#cardviwer').addClass('d-flex').removeClass('d-none');
    $('#cardviwer').attr('src', val);
}

Videoplayer = (val)=>{
    $('#cardviwer').addClass('d-none').removeClass('d-flex');
    $('#cardanimationviwer').addClass('d-flex').removeClass('d-none');
    let v = $('#cardanimationviwer')[0];
    v.src = val;
    v.load();
    v.play();
}

$(document).ready(() => {

    $('input[type=radio][name=SortBy]').change(()=>{
        // console.log($("input[name='SortBy']:checked").val());
        let val = $("input[name='SortBy']:checked").val();
        switch (val) {
            case 'char':
                cardslist.sort((a, b)=>{return a.heroineId - b.heroineId});
                break;
            case 'cid':
                cardslist.sort((a, b)=>{return a.cardId - b.cardId});
                break;
        }

        SetupCardsList(cardslist);

        $('input[type=checkbox]').prop( "checked", false );
    })

    $('input[type=checkbox]').change(function(){

        if($('input[type=checkbox]').not(':checked').length == $('input[type=checkbox]').length){
            console.log('Show all');
            $('#cardlist>nav').removeClass("d-none searching").addClass("d-inline-block search");
        }else if($('input[type=checkbox]:checked').length > 1){
            if($(this).is(':checked')){
                $('#cardlist>nav.searching:has(#hid_'+ $(this).val() +')').toggleClass("d-none searching d-inline-block search");
            }else{
                $('#cardlist>nav.search:has(#hid_'+$(this).val()+')').toggleClass("d-none searching d-inline-block search");
            }
        }else{
            if($(this).is(':checked')){
                $('#cardlist>nav:not(:has(#hid_'+ $(this).val() +'))').toggleClass("d-none searching d-inline-block search"); //?????????????????????????????????
            }else{
                $('#cardlist>nav.search:has(#hid_'+$(this).val()+')').toggleClass("d-none searching d-inline-block search");
            }
        }

    })

});