(function () {

    const FPS = 200;
    const SCORE_PER_SEC = 6;
    const PROB_NUVEM = 1;
    const CACTUS_SPAWN_TIME = 800000;
    const PTERO_SPAWN_TIME = 900000;
    const PTERO_PROB = 0.6;
    const jumpVel = 2;
    const gravity = 2;
    var score = 0;
    var __gameOver = false;
    var auxVelocity = false;
    var paused = false;
    var started = false;
    var groundThingsVelocity = 1;
    var movedNuvem = false;
    var movedDino = false;
    var gameLoop;
    var deserto;
    var dino;
    var nuvens = [];
    var cactos = [];
    var pteros = [];
    var cactoSmallSprites = [-228, -245, -262, -279, -296, -313];
    var cactoBigSprites = [-332, -357, -382, -407];
    var fontSprites = [-484];
    var intervals = []
    var scoreElements = [];

    for (let i = 1; i < 10; i++) {
        fontSprites.push(fontSprites[i - 1] - 10);
    }

    function drawScore(first = false) {
        if (first) {
            for (let i = 0; i < 5; i++) {
                let curFont = document.createElement("div");
                curFont.className = "font";
                curFont.dataset.value = 0;
                deserto.element.appendChild(curFont);
                scoreElements.push(curFont);
            }
        } else {
            $(".font").each(function () {
                $(this).remove();
            });
            for (let font of scoreElements) {
                deserto.element.appendChild(font);
            }
        }

    }

    function updateScore() {
        score++;
        scoreElements = [];
        charsList = score.toString().split("").reverse();
        for (let i = 0; i < charsList.length && i < 5; i++) {
            let curFont = document.createElement("div");
            curFont.className = "font";
            curFont.dataset.value = parseInt(charsList[i]);
            curFont.style.backgroundPositionX = `${fontSprites[parseInt(charsList[i])]}px`;
            scoreElements.push(curFont);
        }

        for (let i = 0; i < (5 - charsList.length); i++) {
            let curFont = document.createElement("div");
            curFont.className = "font";
            curFont.dataset.value = 0;
            scoreElements.push(curFont);
        }
        // console.log(scoreElements);
        drawScore();
    }

    function stopAll() {
        for (let loop of intervals) {
            clearInterval(loop);
        }
    }

    function gameOver() {
        dino.morto();
        stopAll();
        __gameOver = true;
        nuvens = [];
        cactos = [];
        $.ajax({
            url: '/pontuacao',
            type: 'POST',
            data: {
                'pontuacao': score,
            },
            error: function (xhr, status, error) {
            },
            success: function (data) {
            }
        });
        $(".deserto").append(
            `<div class="game_over">
                <div class="over_text"></div>
                <div class="bt_restart"></div>
            </div>`
        );
    }

    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1 - 10;
        var r1 = x1 + w1 - 10;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2 - 10;
        var r2 = x2 + w2 - 10;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }

    function checkCollision() {
        let dinoDiv = $(dino.element);
        let obstacles = [];
        obstacles = obstacles.concat(cactos.slice(0, Math.min(4, cactos.length)));
        obstacles = obstacles.concat(pteros);
        obstacles = obstacles.filter((value) => {
            if (Math.abs($(value.element).position().left - ($(dinoDiv).position().left + $(dinoDiv).width())) <= 100) {
                // console.log("[POS]", $(value.element).position(), $(dinoDiv).position());
                return true;
            }
            return false;
        });

        if (obstacles.length > 0) {
            console.log("[OBS]", obstacles);
            for (let i = 0; i < obstacles.length; i++) {
                let curObst = $(obstacles[i].element);
                if (collision($(dinoDiv), $(curObst))) {
                    return true;
                }
            }
        }
        return false;
    }

    function preInit(first = false) {

        if (first) {
            deserto = new Deserto();
            $(".deserto").click(function (event) {
                console.log("CLICK", event);
                if (__gameOver) {
                    $(".deserto").empty();
                    __gameOver = false;
                    preInit();
                    init();
                }
            });
        }
        deserto.createGround();
        dino = new Dino();
        score = 0;
        drawScore(true);
    }

    function init() {
        $('#iniciar').css('display', 'none');
        gameLoop = setInterval(updateCenario, 1000 / FPS);
        dinoLoop = setInterval(run, 2000 / FPS);
        spawnCactusLoop = setInterval(spawnCactus, CACTUS_SPAWN_TIME / FPS);
        spawnPteroLoop = setInterval(spawnPtero, PTERO_SPAWN_TIME / FPS);
        flyingLoop = setInterval(moveFying, 800 / FPS);
        wingsLoop = setInterval(moveWing, 200);
        scoreLoop = setInterval(updateScore, 1000 / 6.6);
        intervals = [gameLoop, dinoLoop, spawnCactusLoop, spawnPteroLoop, flyingLoop, wingsLoop, scoreLoop];
    }

    class CactoSmall {
        constructor() {
            this.element = document.createElement("div");
            this.element.className = "cacto_small";
            this.element.style.backgroundPositionX =
                `${cactoSmallSprites[Math.floor(Math.random() * cactoSmallSprites.length)]}px`;
            this.element.style.width = "17px";
            this.element.style.right = "0px";
            this.element.style.bottom = "0px";

        }

        mover(moveFactor = 1) {
            this.element.style.right = (parseInt(this.element.style.right) + moveFactor) + "px";
        }

        append() {
            deserto.element.appendChild(this.element);
        }
    }

    class CactoBig {
        constructor() {
            this.element = document.createElement("div");
            this.element.className = "cacto_big";
            this.element.style.backgroundPositionX =
                `${cactoBigSprites[Math.floor(Math.random() * cactoBigSprites.length)]}px`;
            this.element.style.width = "25px";
            this.element.style.right = "0px";
            this.element.style.bottom = "0px";
        }

        mover(moveFactor = 1) {
            this.element.style.right = (parseInt(this.element.style.right) + moveFactor) + "px";
        }

        append() {
            deserto.element.appendChild(this.element);
        }
    }

    function Deserto() {
        this.element = document.createElement("div");
        this.element.className = "deserto";
        var jogo = document.getElementById("jogo");
        jogo.appendChild(this.element);
    }

    Deserto.prototype.createGround = function () {
        this.chao = document.createElement("div");
        this.chao.className = "chao";
        this.chao.style.backgroundPositionX = "0px";
        this.element.appendChild(this.chao);
    }

    Deserto.prototype.mover = function (moveFactor = 1) {
        this.chao.style.backgroundPositionX = (parseInt(this.chao.style.backgroundPositionX) - moveFactor) + "px";
    }

    function Dino() {
        this.sprites = {
            'correr1': '-766px',
            'correr2': '-810px',
            'pulando': '-678px',
            'morto': '-853px',
            'agachado1': '-941px -19px',
            'agachado2': '-1000px -19px'
        };
        this.status = 0; // 0:correndo; 1:subindo; 2: descendo; 3: agachado
        this.alturaMaxima = 100;
        this.element = document.createElement("div");
        this.element.className = "dino";
        this.element.style.backgroundPositionX = this.sprites.correr1;
        this.element.style.bottom = "0px";
        deserto.element.appendChild(this.element);
    }

    Dino.prototype.correr = function () {
        // console.log("[STATUS]", dino.status, dino.element.style.bottom);
        if (this.status == 0) {
            this.element.style.backgroundPositionX =
                (this.element.style.backgroundPositionX == this.sprites.correr1) ? this.sprites.correr2 : this.sprites.correr1;
        } else if (this.status == 3) { // agachando
            this.agachar();
            if (parseInt(this.element.style.bottom) > 0) {
                this.element.style.bottom = Math.max(0, (parseInt(this.element.style.bottom) - 1 * (gravity + 1))) + "px";
            }
        } else if (this.status == 1) {
            this.element.style.backgroundPositionX = this.sprites.pulando;
            this.element.style.bottom = (parseInt(this.element.style.bottom) + 1 * jumpVel) + "px";
            if (parseInt(this.element.style.bottom) >= this.alturaMaxima) this.status = 2;
        }
        else if (this.status == 2) {
            this.element.style.bottom = (parseInt(this.element.style.bottom) - 1 * gravity) + "px";
            if (parseInt(this.element.style.bottom) <= 0) {
                this.status = 0;
                this.element.style.bottom = "0px";
            }
        }
    }

    Dino.prototype.morto = function () {
        this.element.style.width = '45px';
        this.element.style.height = '45px';
        this.element.style.backgroundPositionX = this.sprites.morto;
    }

    Dino.prototype.agachar = function () {
        this.element.style.backgroundPosition =
            (this.element.style.backgroundPosition == this.sprites.agachado1) ? this.sprites.agachado2 : this.sprites.agachado1;
        this.element.style.width = '59px';
        this.element.style.height = '30px';

    }

    function Nuvem() {
        this.element = document.createElement("div");
        this.element.className = "nuvem";
        this.element.style.right = "0px";
        this.element.style.top = Math.floor(Math.random() * 120) + "px";
        deserto.element.appendChild(this.element);
    }

    Nuvem.prototype.mover = function () {
        this.element.style.right = (parseInt(this.element.style.right) + 1) + "px";
    }

    function run() {
        dino.correr();
        if (checkCollision()) {
            //Em caso de game over
            gameOver();

        }
        // console.log(cactos, nuvens);s

    }

    function updateCenario() {

        if (dino.status == 1 && !auxVelocity) {
            groundThingsVelocity += 1;
            auxVelocity = true;
        } else if (auxVelocity) {
            groundThingsVelocity -= 1;
            auxVelocity = false;
        }

        // console.log("[GROUND]", groundThingsVelocity);
        deserto.mover(groundThingsVelocity);
        if (Math.floor(Math.random() * 1000) <= PROB_NUVEM) {
            nuvens.push(new Nuvem());
        }

        if (!movedNuvem) {
            nuvens.forEach(function (n) {
                n.mover();
            });
            movedNuvem = true;
        } else {
            movedNuvem = false;
        }

        cactos.forEach(function (c) {
            c.mover(groundThingsVelocity);
        });

        removeInvisible();


    }

    class Ptero {
        constructor() {
            this.sprites = {
                'voar1': '-134px -8px',
                'voar2': '-180px -2px'
            }
            this.element = document.createElement("div");
            this.element.className = "ptero";
            this.element.style.right = "0px";
        }
        mover(moveFactor = 1) {
            this.element.style.right = (parseInt(this.element.style.right) + moveFactor) + "px";
        }

        voar() {
            this.element.style.backgroundPosition = (this.element.style.backgroundPosition == this.sprites.voar1) ? this.sprites.voar2 : this.sprites.voar1;
        }

        append() {
            deserto.element.appendChild(this.element);
        }
    }

    function spawnPtero() {
        let possibleHeights = ["-4px", "15px", "30px"];
        if (score > 100 && (Math.random() < PTERO_PROB)) {
            let newPtero = new Ptero();
            newPtero.element.style.bottom = possibleHeights[Math.ceil(Math.random() * 3)];
            newPtero.append();
            pteros.push(newPtero);
        }
    }

    function moveFying() {
        pteros.forEach(p => p.mover());
    }

    function moveWing() {
        pteros.forEach(p => p.voar());
    }

    function spawnCactus() {
        let probs = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4]
        let cactosNum = probs[Math.floor(Math.random() * probs.length)]; // escolhendo numero de cactos
        let currrentCactusSet = [];
        for (let i = 0; i < cactosNum; i++) {
            let moveFactor = 0;
            for (let cactus of currrentCactusSet) {
                moveFactor += parseInt(cactus.element.style.width.replace("px", ""));
            }
            let currentCactus;

            if (Math.random() > 0.5) {
                currentCactus = new CactoSmall();
            } else {
                currentCactus = new CactoBig();
            }

            currentCactus.mover(moveFactor);
            currrentCactusSet.push(currentCactus);
        }

        // console.log("[cactus]", cactosNum, currrentCactusSet);
        currrentCactusSet.forEach((cactus) => {
            cactus.append();
            cactos.push(cactus);
        });
    }

    function removeInvisible() {
        nuvens = nuvens.filter((value, idx) => {
            let elem = $(value.element);
            let position = $(elem).position();
            if (position.left < (parseInt($(elem).width()) * -1)) {
                $(elem).remove();
                return false;
            }
            return true;
        });

        cactos = cactos.filter((value, idx) => {
            let elem = $(value.element);
            let position = $(elem).position();
            if (position.left < (parseInt($(elem).width()) * -1)) {
                $(elem).remove();
                return false;
            }
            return true;
        });

        pteros = pteros.filter((value, idx) => {
            let elem = $(value.element);
            let position = $(elem).position();
            if (position.left < (parseInt($(elem).width()) * -1)) {
                $(elem).remove();
                return false;
            }
            return true;
        });
    }

    window.addEventListener("keydown", function (e) {
        if (e.key == "ArrowUp") {

            if (paused) {
                paused = false;
                init();
                return;
            }
            if (!started) {
                started = true;
                init();
            }
            if (dino.status == 0) {
                dino.status = 1;
            }
            return;
        }

        if (e.key == "ArrowDown") {
            dino.status = 3;
        }

        if (e.keyCode == 80) {
            if (!paused) {
                paused = true;
                stopAll();
            } else {
                paused = false;
                init();
            }
        }
    });

    window.addEventListener("keyup", function (e) {
        // console.log(e);
        if (e.key == "ArrowUp" && dino.status == 1 && parseInt(dino.element.style.bottom) > 35) {
            dino.status = 2;
        } else if (e.key == "ArrowDown" && dino.status == 3) {
            dino.status = 0;
            dino.element.style.backgroundPosition = dino.sprites.correr1 + " -3px"
            dino.element.style.width = '45px';
            dino.element.style.height = '45px';
        }
    });




    preInit(true);
})();

