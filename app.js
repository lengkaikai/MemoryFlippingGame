document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
        {
            name: "fries",
            img: "images/pic1.png"
        },

        {
            name: "fries",
            img: "images/pic1.png"
        },

        {
            name: "cheeseburger",
            img: "images/pic2.png"
        },

        {
            name: "cheeseburger",
            img: "images/pic2.png"
        },

        {
            name: "hotdog",
            img: "images/pic3.png"
        },

        {
            name: "hotdog",
            img: "images/pic3.png"
        },

        {
            name: "ice-cream",
            img: "images/pic4.png"
        },

        {
            name: "ice-cream",
            img: "images/pic4.png"
        },

        {
            name: "milkshake",
            img: "images/pic5.png"
        },

        {
            name: "milkshake",
            img: "images/pic5.png"
        },

        {
            name: "pizza",
            img: "images/pic6.png"
        },

        {
            name: "pizza",
            img: "images/pic6.png"
        },
    ]

    // randomize our car array
    //if it returns a positive number, the card goes first
    cardArray.sort(() => 0.5 - Math.random())

    //create my board
    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('#result')
    var triesDisplay = document.querySelector('#tries')
    var counts = 0;
    var cardsChosen = []
    var cardsChosenId = []
    var cardsWon = []

    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            //creating an image element
            const card = document.createElement('img')
            //I added this to distinguish the border
            card.style.border = "thick solid"
            //document.getElementById('img').style.border = "thick solid #0000FF";
            //setting attribute linking the relative
            card.setAttribute('src', 'images/blank.png')
            //give them id
            card.setAttribute('data-id', i)
            //check if it is click on, and add a function if it is clicked
            card.addEventListener('click', flipCard)
            //putting the card into the grid class we have created in the html file
            grid.appendChild(card)
        }
    }

    //check for matches
    function checkForMatch() {
        var cards = document.querySelectorAll('img')
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]

        //this check if an image is clicked twice
        if(optionOneId == optionTwoId) {
            cards[optionOneId].setAttribute('src', 'images/blank.png')
            cards[optionTwoId].setAttribute('src', 'images/blank.png')
            alert('You have clicked the same image!')
        }

        else if (cardsChosen[0] === cardsChosen[1]) {
            alert('You found a match')
            cards[optionOneId].setAttribute('src', 'images/white.png')
            cards[optionTwoId].setAttribute('src', 'images/white.png')
            //I fixed this!!! this makes them unclickable after finding a pair
            cards[optionOneId].style.pointerEvents = "none";
            cards[optionTwoId].style.pointerEvents = "none";
            cardsWon.push(cardsChosen)
        }
        else {
            cards[optionOneId].setAttribute('src', 'images/blank.png')
            cards[optionTwoId].setAttribute('src', 'images/blank.png')
            alert('Sorry, try again!')
        }
        cardsChosen = []
        cardsChosenId = []
        resultDisplay.textContent = cardsWon.length
        if(cardsWon.length === cardArray.length/2) {
            resultDisplay.textContent = 'Congratulations! You found them all!'
        }
        counts++;
        triesDisplay.textContent = counts;
    }


    //Flip my cards
    function flipCard() {
        let cardId = this.getAttribute('data-id')
        //got the name of the card into the cards chosen array
        cardsChosen.push(cardArray[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute('src', cardArray[cardId].img)
        //**the length should be equal to two only, if so invoke the function check for match */
        if (cardsChosen.length === 2) {
            //settimeout gives some time 500 milliseconds to check
            setTimeout(checkForMatch, 300)
        }
    }

    createBoard()

})