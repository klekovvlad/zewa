import '../scss/style.scss';
import { ListImages } from "./modules/images.js";
import { KEYS } from "./modules/keys.js";
import { Pages } from "./modules/pages.js";
import { Prizes } from "./modules/prizes.js";
import { question } from "./modules/questions.js"
import { ResultSend } from "./modules/sendResult.js";
import { shuffle } from "./modules/shuffle.js";

const Quiz = {
    app: document.querySelector('.app'),
    body: document.createElement('div'),
    live: 3,
    page: 0,
    questions: shuffle(question),
    message: '',
    category_id: '3074457345616848733',

    init() {
        this.getPage();
        this.body.classList.add('app-body');
        for(let key in this.getPagesText()[this.page]) {
            this.body.append(
                this.renderTextElement(key, this.getPagesText()[this.page][key])
            )
        }
        this.app.append(
            this.renderTextElement('app-logo', ''),
            this.body,
            this.renderButton('Начать'),
        )
            
        this.buttonListener(document.querySelector('.button'));
    },

    buttonListener(button) {
        if(button) {
            button.onclick = () => {
                this.body.className = 'app-body';
                if(this.page > 0) {
                    button.textContent = 'Далее'
                }
                if(this.live > 0 && this.page < this.questions.length + 1) {
                    this.renderQuizPage();
                }else{
                    button.textContent = 'К покупкам'
                    if(this.live === 0) {
                        this.renderResultPage('looser')
                        this.message = `LOOSER ZEWA: ${(this.page - 1) + (this.live - 3)} из ${this.questions.length}`
                    }else{
                        this.renderResultPage('winner')
                        this.message = `WINNER ZEWA: ${this.questions.length + (this.live - 3)} из ${this.questions.length}`
                    }
                    ResultSend(this.message, KEYS.TOKEN, KEYS.CHAT_ID)
                    button.onclick = () => {
                        window.location.href = `okeymobile://category?id=${this.category_id}`
                    }
                }
            }
        }
    },

    getPrizes() {
        return Prizes
    },

    getPagesText() {
        return Pages
    },

    mistake() {
        this.live--;
    },

    getPage() {
        this.page++;
        this.app.dataset.page = this.page;
    },

    renderTextElement(style, text) {
        if(typeof text !== 'object') {
            const el = style === 'button' ? document.createElement('button') : document.createElement('div');
            el.className = style;
            el.innerHTML = text;
            return el;
        }
    },

    renderButton(text) {
        const button = document.createElement('button');
        button.classList.add('button');
        button.textContent = text;
        return button;
    },

    renderAnswers(array) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('answers');
        array.forEach((el, index) => {
            const answer = document.createElement('button');
            answer.classList.add('answer');
            answer.textContent = el.text;
            answer.dataset.id = index;
            wrapper.append(answer)
        });
        wrapper.onclick = (e) => {
            this.checkAnswer(e.target)
        }
        return wrapper;
    },

    checkAnswer(target) {
        if(target.dataset.id) {
            this.afterCheckAnswer(target, Boolean(this.questions[this.page - 2].answers[target.dataset.id].true))
            if(!this.questions[this.page - 2].answers[target.dataset.id].true) {
                this.mistake()
            }
        }
    },

    afterCheckAnswer(target, answer) {
        target.classList.add(answer)
        this.body.classList.add('hidden');
    },

    renderQuizPage() {
        this.getPage();
        this.body.innerHTML = '';
        this.body.append(
            this.renderTextElement(
                'question', this.questions[this.page - 2].question
            ),
            this.renderAnswers(shuffle(this.questions[this.page - 2].answers)),
            this.renderTextElement('message', this.questions[this.page - 2].message)
        )
        document.querySelector('.question').insertAdjacentHTML('afterbegin', this.renderProgress())
    },

    renderResultPage(resut) {
        this.app.dataset.page = 8;
        this.body.innerHTML = '';
        for(let key in this.getPrizes()[resut]) {
            this.body.append(
                this.renderTextElement(key, this.getPrizes()[resut][key])
            )
        }
    },

    renderProgress() {
        return `
            <div class="app-progress">
                <span class="value">${this.page - 1}</span>/${this.questions.length}
            </div>
        `
    }
}

Quiz.init();