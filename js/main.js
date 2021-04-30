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
        card.addClass("alert-light m-2 d-inline-block position-relative text-center");
        card.css("border-radius", "15px");

        let img = $('<img/>');
        img.css({"width": "160px", "height": "160px;"});
        img.addClass("rounded");

        img.attr('src', val.Normal_thumb);
        let btn = '<button class="position-absolute btn " style="z-index: 3;top: 0;right: 0;background-color: rgba(255,255,255,0.3);"><i class="fas fa-sync-alt"></i></button>';

        card.append(img, btn);
        $('#cardlist').append(card);

        // console.log(card.find('button'));
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
        })
    })
}



$(document).ready(() => {});