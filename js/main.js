var charactorlist;
var cardslst;


$('#preimg').click(()=>{
    $('#showing').addClass("d-flex").removeClass("d-none");
});

$('#closeshowing').click(()=>{
    $('#showing').addClass("d-none").removeClass("d-flex");
})


$.getJSON("datalist/CharactorList.json", function(data) {
    charactorlist = data.Charactor;
}).done(function() {
    // console.log(charactorlist);
});

$.getJSON("datalist/CardsData.json", function(data) {
    cardslst = data.Cards;
}).done(function() {
    // console.log(cardslst);
    SetupCardsView(cardslst);
});

SetupCardsView = (datalist)=>{
    $('#cardlist').empty();

    $.each(datalist, (i, val)=>{
  
        let card = $('<nav></nav>');
        card.addClass("alert-light m-2 d-inline-block position-relative text-center search");
        card.css("border-radius", "15px");

        let img = $('<img/>');
        img.css({"width": "160px", "height": "160px;"});
        img.addClass("rounded");

        img.attr('src', val.Normal_thumb);
        let btn = '<button class="position-absolute btn " style="z-index: 3;top: 0;right: 0;background-color: rgba(255,255,255,0.3);"><i class="fas fa-sync-alt"></i></button>';

        let cardid = '<p id="cardid" class="d-none">'+ val.cardId +'</p>';
        let cardname = '<p id="cardname" class="d-none">'+ val.alias +'</p>';
        let hid = '<p id="hid_'+ val.heroineId +'" class="d-none">'+ val.heroineId +'</p>';

        card.append(img, btn, cardid, cardname, hid);
        $('#cardlist').append(card);

        card.find('button').click(function(e){
            e.stopPropagation();
            if(img.hasClass('Blooming')){
                img.attr('src', val.Normal_thumb);
                img.removeClass("Blooming");
            }else{
                img.attr('src', val.Blooming_thumb);
                img.addClass("Blooming");
            }
        });

        card.click(function(){
            // console.log("CLICK");
            if(img.hasClass('Blooming')){
                $('#showing > img').attr('src', val.Blooming);
            }else{
                $('#showing > img').attr('src', val.Normal);
            }

            $('#showing').addClass("d-flex").removeClass("d-none");
        });

    });
}



$(document).ready(() => {

    $('input[type=radio][name=SortBy]').change(()=>{
        // console.log($("input[name='SortBy']:checked").val());
        let val = $("input[name='SortBy']:checked").val();
        switch (val) {
            case 'char':
                cardslst.sort((a, b)=>{return a.heroineId - b.heroineId});
                break;
            case 'cid':
                cardslst.sort((a, b)=>{return a.cardId - b.cardId});
                break;
        }

        SetupCardsView(cardslst);

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
                $('#cardlist>nav:not(:has(#hid_'+ $(this).val() +'))').toggleClass("d-none searching d-inline-block search"); //除咗自己之外所有嘢消失
            }else{
                $('#cardlist>nav.search:has(#hid_'+$(this).val()+')').toggleClass("d-none searching d-inline-block search");
            }
        }

    })

});