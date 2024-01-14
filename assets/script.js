$(document).ready(function(){
    let score = [];
    let nama = [];
    let mulai = false;
    let cek = 0;
    let ctr1 = 0, ctr2 = 0, turn = 1;
    for(let i=0; i<5; i++){
        score[i] = 999; nama[i] = "<3";
    }
    let kunci = ["ABUSE", "ADULT", "AGENT", "BASIS", "BEACH", "BIRTH", "CAUSE", "CHAIN", "CHAIR", "DANCE", "DEATH", "DEPTH", "EARTH", "ENEMY", "ENTRY", "FAITH", "FAULT", "FIELD", "GLASS", "GRANT", "GRASS", "HEART", "HENRY", "HORSE", "IMAGE", "INDEX", "INPUT", "JAPAN", "JONES", "JUDGE", "KNIFE", "LAURA", "LAYER", "LEVEL", "MAJOR", "MARCH", "MATCH",  "NIGHT", "NOISE", "NORTH", "OFFER", "ORDER", "OTHER", "PANEL", "PAPER", "PARTY", "QUEEN", "RADIO", "RANGE", "RATIO",  "SCALE", "SCENE", "SCOPE", "TABLE", "TASTE", "TERRY", "UNCLE", "UNION", "UNITY", "VALUE", "VIDEO", "VISIT", "WATCH", "WATER", "WHILE", "YOUTH"];
    let jawaban = "";
    function inisialisasi(){
        for(let i=0; i<5; i++){
            for(let j=0; j<5; j++){
                let square = $(`<div class="box"></div>`);
                square.attr("id", `box${i}${j}`);
                $('.kotak').append(square);
                let content = $(`<div class="front" id="d${i}${j}"></div>
                                 <div class="back" id="b${i}${j}"></div>`);
                $(`#box${i}${j}`).append(content);
                $(`#box${i}${j}`).flip({
                    trigger:'manual'
                });
            }
        }
    }
    inisialisasi();
    $('.restart').prop('disabled', true);
    $('.cheat').prop('disabled', true);
    $('.start').click(function(){
        if($('#playerName').val() == ""){ alert("nama tidak boleh kosong!");} 
        else {
            $('.restart').prop('disabled', false);
            $('.cheat').prop('disabled', false);
            $('.start').prop('disabled', true);
            mulai = true;
            let random = Math.floor(Math.random()*66); //random 0-65
            jawaban = kunci[random];
            $(`#d${ctr1}${ctr2}`).css({"border":"3px white solid", "border-radius":"5px"});
        }
    });
    $(window).keydown(function(e){
        if(mulai){
            let benar = 0;
            if(ctr1==turn-1 && ctr1<5){
                if(e.key=="Backspace"){
                    $(`#d${ctr1}${ctr2-1}`).text("");
                    $(`#d${ctr1}${ctr2}`).css({"border":"1px white solid"});
                    $(`#d${ctr1}${ctr2-1}`).css({"border":"3px white solid", "border-radius":"5px"});
                    ctr2--;
                } else if((e.key!="Backspace") && (e.key!="Enter")){
                    if(ctr2<=4){
                        let temp = e.key;
                        let t = e.keyCode;
                        if(t>=65 && t<=90 || t>=97 && t<=122){
                            $(`#d${ctr1}${ctr2}`).text(temp.toUpperCase());
                            $(`#d${ctr1}${ctr2}`).addClass("tulisan");
                            $(`#d${ctr1}${ctr2}`).css({"border":"1px white solid"});
                            $(`#d${ctr1}${ctr2+1}`).css({"border":"3px white solid", "border-radius":"5px"});
                            $(`#b${ctr1}${ctr2}`).text(temp.toUpperCase());
                            $(`#b${ctr1}${ctr2}`).addClass("tulisan");
                            ctr2++;
                        }
                    }
                }
                if(ctr2 > 4 && e.key=="Enter"){
                    for(let i=0; i<5; i++){ 
                        console.log($(`#d${ctr1}${i}`).text());
                        if(jawaban.includes($(`#d${ctr1}${i}`).text(),0)){
                            if(jawaban[i]==$(`#d${ctr1}${i}`).text()){
                                $(`#box${ctr1}${i} .back`).css("background-color", "green");
                                benar++;
                            } else{ // KALO MISAL JAWABAN ADA TAPI SALAH TEMPAT
                                $(`#box${ctr1}${i} .back`).css("background-color", "gold");
                            }
                        }else{ // JAWABAN TIDAK ADA DI SOAL
                            $(`#box${ctr1}${i} .back`).css("background-color", "lightslategrey");
                        }
                    }
                    setTimeout(function(){balik(ctr1,0)}, 100);
                    setTimeout(function(){balik(ctr1,1);}, 300)
                    setTimeout(function(){balik(ctr1,2);}, 500)
                    setTimeout(function(){balik(ctr1,3);  }, 700)
                    setTimeout(function(){balik(ctr1,4);  }, 900)
                    function balik(ctr1, j){
                        $(`#box${ctr1}${j}`).flip(true);
                    }
                    setTimeout(function(){ //nambah counter/ ganti baris
                        if(benar!=5){
                            while(cek==0){
                                benar = 0; ctr1++; turn++; ctr2 = 0;
                                $(`#d${ctr1}${ctr2}`).css({"border":"3px white solid"});
                                cek = 1;
                            }
                            cek = 0;
                        } 
                    }, 1100); 
                    if(benar == 5){ // JAWABAN ADA DAN TEMPATNYA BENAR
                        brik = setTimeout(function(){
                            alert("Congratulations, " + $('#playerName').val() + " - " + turn);
                            //ngatur highscore
                            let ini = -1;
                            for(let j=0; j<5;j++){
                                if(score[j]>ctr1+1){
                                   ini = j;
                                   break;
                                }
                            }
                            for(let j=4; j>ini-1; j--){
                                score[j] = score[j-1];
                                nama[j] = nama[j-1];
                            }
                            score[ini] = ctr1+1;
                            nama[ini] = $('#playerName').val();
                            showHS();
                            reset();
                        }, 1500);
                    }
                }
            }
            if(ctr1>4){
                alert("Try again later");
                reset();
            }
        }
    });
    function showHS(){
        for(let i=0; i<5; i++){
            if(nama[i]!="<3" && score[i]!=999){
                console.log(`.n${i+1}`)
                $(`.n${i+1}`).text(nama[i]);
                $(`.s${i+1}`).text(score[i]);
            }  
        }
    }
    function reset(){
        $('.kotak').html("");
        $('#playerName').val("");
        $('.restart').prop('disabled', true);
        $('.cheat').prop('disabled', true);
        $('.start').prop('disabled', false);
        turn = 1; ctr1 = 0; ctr2 = 0; mulai = false;
        inisialisasi();
    }
    $('.restart').click(function(){
        location.reload();
    });
    $('.cheat').click(function(){
        alert(jawaban);
        $('.cheat').blur();
    });
})