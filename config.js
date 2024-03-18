comp_s = random();
player_s = "rock";
playerScore = 0;

function random() {
    let k = Math.floor(Math.random()*3);
    switch (k){ 
    case 0: 
        return "Rock";
    case 1:
        return "Paper";
    case 2:
        return "Scissors";
    }
}



function paleyround(player_s,comp_s){
    if (player_s == comp_s){
        return "fair";
    } else {
        if (player_s == "Rock"){
            if (comp_s == "Paper"){
                return "I win , Paper beats Rock";
            } else {
                return "You win , Rock beats Scissors";
            }
        }
        if (player_s == "Paper"){
            if (comp_s == "Rock"){
                return "You win , Paper beats Rock";
            } else {
                return "I win , Scissors beats Paper";
            }
        }
        if (player_s == "Scissors"){
            if (comp_s == "Rock"){
                return "I win , Rock beats Scissors";
            } else {
                return "You win , Scissors beats Paper";
            }
        }
    }
}